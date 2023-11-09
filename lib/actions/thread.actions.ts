'use server';
import { revalidatePath } from 'next/cache';
import ThreadModel from '../models/thread.model';
import UserModel from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  text: string;
  author: string;
  path: string;
}
export async function createThread({
  text,
  author,
  path,
}: Params) {
  try {
    connectToDB();
    const createdThread = await ThreadModel.create({
      text,
      author,
    });
    // Update user model
    await UserModel.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Error creating thread: ${err.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();
  // Caclulate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;
  // Fetch the posts that have no parents (top-level threads...)
  const postsQuery = ThreadModel.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: 'author', model: UserModel })
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: UserModel,
        select: '_id name parentId image',
      },
    });
  const totalPostsCount = await ThreadModel.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;
  return { posts, isNext };
}

export async function fetchThreadById(id: string) {
  try {
    connectToDB();
    const thread = await ThreadModel.findById(id)
      .populate({
        path: 'author',
        model: UserModel,
        select: '_id id name image',
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: UserModel,
            select: '_id id name parentId image',
          },
          {
            path: 'children',
            model: ThreadModel,
            populate: {
              path: 'author',
              model: UserModel,
              select: '_id id name parentId image',
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (err: any) {
    throw new Error(`Failed to fetch thread with id: ${err.message}`);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();
    // to add a comment => find the original thread by id
    const originalThread = await ThreadModel.findById(threadId);
    if (!originalThread) {
      throw new Error(`Thread not found`);
    }
    // Create a new thread with the comment text
    const commentThread = new ThreadModel({
      text: commentText,
      author: userId,
      parentId: threadId
    });
    // save the new thread
    const savedCommentThread = await commentThread.save();
    // update the original thread to include the new comment
    originalThread.children.push(savedCommentThread._id);
    // save the origianl thread
    await originalThread.save();
    revalidatePath(path);
  } catch (err: any) {
    throw new Error(`Error adding comment to thread: ${err.message}`);
  }
}



export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    connectToDB();

    // Find the thread to be deleted (the main thread)
    const mainThread = await ThreadModel.findById(id).populate("author");

    if (!mainThread) {
      throw new Error("Thread not found");
    }

    // Fetch all child threads and their descendants recursively
    const descendantThreads = await fetchAllChildThreads(id);

    // Get all descendant thread IDs including the main thread ID and child thread IDs
    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread) => thread._id),
    ];

    // Extract the authorIds to update User model respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );


    // Recursively delete child threads and their descendants
    await ThreadModel.deleteMany({ _id: { $in: descendantThreadIds } });

    // Update User model
    await UserModel.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await ThreadModel.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }
  return descendantThreads;
}
