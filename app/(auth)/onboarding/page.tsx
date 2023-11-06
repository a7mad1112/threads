import AccountProfle from '@/components/forms/AccountProfle';
import { currentUser } from '@clerk/nextjs';
export default async function Page() {
  const user = await currentUser();
  const userInfo = {};
  const userData = {
    id: user?.id,
    objectId: user?._id,
    userName: user?.userName || user?.userName,
    name: user?.name || user?.firstName || "",
    bio: user?.bio || "",
    image: user?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads!
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfle user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
