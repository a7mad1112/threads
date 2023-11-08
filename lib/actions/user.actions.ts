'use server';
import { revalidatePath } from 'next/cache';
import UserModel from '../models/user.model';
import ThreadModel from '../models/thread.model';
import { connectToDB } from '../mongoose';
interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await UserModel.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();
    return await UserModel.findOne({ id: userId });
    // .populate({
    //   path: 'communities',
    //   model:"Community"
    // });
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();
    // find all threads authored by user with the given userId
    // TODO: Populate community
    return await UserModel.findOne({ id: userId }).populate({
      path: 'threads',
      model: ThreadModel,
      populate: {
        path: 'author',
        model: UserModel,
        select: 'name image id',
      },
    });
  } catch (err: any) {
    throw new Error(`Failed to fetch user posts: ${err.message}`);
  }
}
