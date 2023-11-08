import { currentUser } from '@clerk/nextjs';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import UserCard from '@/components/cards/UserCard'
const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
  // TODO: fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: "a",
    pageNumber: 1,
    pageSize: 25
  });
  console.log(result)
  return (
    <section>
      <h1 className="head-text mb-10">
        Search
      </h1>
      {/* todo: Search bar */}
      <div className="mt-14 flex flex-col gap-9">
        {result?.users?.length === 0 ? (
          <p className="no-result">No users</p>
        ): (
          <>
            {result?.users?.map((person) => (
              <UserCard />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Page;