import ThreadCard from "@/components/cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { fetchThreadById } from '@/lib/actions/thread.actions.ts';
const Page = async ({ params: {id} }: {params: {id: string}}) => {
  if(!id) return null;
  const user = await currentUser();
  if(!user) return null;
  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(id);
  return (
    <section>
    <div>
    <ThreadCard
      key={thread._id} 
      id={thread._id} 
      currentUserId={user?.id || ""}
      parentId={thread.parentId}
      content={thread.text}
      author={thread.author}
      community={thread.community}
      createdAt={thread.createdAt}
      comments={thread.children}
    />
    </div>
  </section>
  )
}
export default Page;