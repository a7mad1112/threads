"use client";
import Image from 'next/image';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  isSmall?: boolean;
};
export default function UserCard({ id, name, username, imgUrl, personType, isSmall = false }: Props) {
  const router = useRouter();
  const fontSize: any = isSmall ? { 'font-size': '12px !important' } : { 'font-size': '16px' };
  const usernameFontSize: any = isSmall ? { 'font-size': '10px !important' } : { 'font-size': '14px' };
  return (
    <article className="user-card my-4">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          width={48}
          height={48}
          alt='logo'
          className={`rounded-full w-[48px] h-[48px] ${isSmall && "w-[30px] h-[30px]"}`}
        />
        <div className="flex-1 text-ellipsis">
          <h4 className='text-base-semibold text-light-1'
            style={fontSize}
          >{name}</h4>
          <p className="text-base-semibold text-gray-1" style={usernameFontSize}>@{username}</p>
        </div>
      </div>
      <Button className={`${isSmall ? 'small-user-card_btn' : 'user-card_btn'}`} onClick={() => router.push(`profile/${id}`)}>
        View
      </Button>
    </article>
  );
}
