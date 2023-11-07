"use server";
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
