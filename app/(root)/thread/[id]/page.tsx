import ThreadCard from '@/components/cards/ThreadCard';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import Comment from '@/components/forms/Comment';
const Page = async ({ params: { id } }: { params: { id: string } }) => {
  if (!id) return null;
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await fetchThreadById(id);
  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id || ''}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {thread.children.map((childrenItem: any) => (
          <ThreadCard
            key={childrenItem._id}
            id={childrenItem._id}
            currentUserId={user?.id || ''}
            parentId={childrenItem.parentId}
            content={childrenItem.text}
            author={childrenItem.author}
            createdAt={childrenItem.createdAt}
            comments={childrenItem.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
};
export default Page;
