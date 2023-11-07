'use server';
import { revalidatePath } from 'next/cache';
import ThreadModel from '../models/thread.model';
import UserModel from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();
    const createdThread = await ThreadModel.create({
      text,
      author,
      community: null,
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
