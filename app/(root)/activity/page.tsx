import { currentUser } from '@clerk/nextjs';
import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
const Page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
  // TODO: getActivity
  const activity = await getActivity(userInfo._id);
  console.log(activity);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity?.length > 0 ? (
          activity.map((act) => (
            <Link key={act._id} href={`/thread/${act.parentId}`}>
              <article className="activity-card">
                {act.author.image && ( // Check if act.author.image exists
                  <Image
                    src={act.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                )}
                <p className="!text-small-regular text-light-1">
                  <span className="mr-1 text-primary-500">
                    {act.author.name}
                  </span>{' '}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))
        ) : (
          <p className="!text-base-regular text-light-3">No Activity Yet</p>
        )}
      </section>
    </section>
  );
};

export default Page;
