'use client';
import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {loginValidator} from '@/validator/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useForm} from 'react-hook-form';

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    console.log(data);
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-primary text-xl font-semibold">
          Chào mừng bạn đã quay trở lại
        </h3>
        <p className="text-sm opacity-50">
          Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
          tưởng
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col items-end gap-4"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Link
            href="/quen-mat-khau"
            className="text-primary text-sm font-medium hover:underline">
            Quên mật khẩu?
          </Link>

          <Button className="w-full">Đăng nhập</Button>
        </form>
      </Form>
      <p className="text-center text-sm">
        Bạn chưa có tài khoản?{' '}
        <Link
          href="/dang-ky"
          className="text-primary font-medium hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
