'use client';
import { sidebarLinks } from '@/constants/index.js';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';
import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser(userId || '');
      setUserInfo(user);
      const userActivity = await getActivity(user?._id);
      setActivity(userActivity);
    };
    fetchData();
  }, [userId]);
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          if (link.route === '/profile') link.route = '/profile/' + userId;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`${isActive && 'bg-primary-500'} leftsidebar_link`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1">{link.label}</p>
              {(link.label === 'Activity' && activity?.length > 0) && (
                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                  {activity.length}
                </p>
              )}
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden6">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSideBar;
