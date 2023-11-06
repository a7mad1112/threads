'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';
interface Props {
  user: {
    id: string;
    objectId: string;
    userName: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}
const AccountProfle = ({ user, btnTitle }: Props) => {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profilePhoto: '',
      name: '',
      userName: '',
      bio: '',
    },
  });

  function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleImage = (e: React.ChangeEvent, fieldChange: (value: string) => void) => {
    e.preventDefault();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profilePhoto"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    priority
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input type="file" accept="image/*" placeholder="Upload a photo" 
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)} />
              </FormControl>

            </FormItem>
          )}
        />
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 flex-col">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input no-focus" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
        {/* userName */}
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 flex-col">
              <FormLabel className="text-base-semibold text-light-2">
                UserName
              </FormLabel>
              <FormControl>
                <Input type="text" className="account-form_input no-focus" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full gap-3 flex-col">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea rows={10} className="account-form_input no-focus" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-primary-500'>Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfle;
