'use server';
import { revalidatePath } from 'next/cache';
import UserModel from '../models/user.model';
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
  username,
  name,
  bio,
  image,
  path,
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
  } catch (err: any) {
    throw new Error(`Failed to create/update user: ${err.message}`);
  }
}

export async function fetchUser(userId: string)
{
  try{
    connectToDB();
    return await UserModel
      .findOne({id: userId})
      // .populate({
      //   path: 'communities',
      //   model:"Community"
      // });
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`)
  }
}