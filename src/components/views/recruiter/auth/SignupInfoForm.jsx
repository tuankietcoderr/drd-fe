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
import {ROLE} from '@/constants/enum';
import authApi from '@/redux/features/auth/authQuery';
import {signupValidator} from '@/validator/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useForm} from 'react-hook-form';

const SignupInfoForm = () => {
  const form = useForm({
    resolver: zodResolver(signupValidator),
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
    },
  });
  const [signUpMutation, {isLoading}] = authApi.useSignUpMutation();

  const onSubmit = async data => {
    delete data.confirmPassword;
    const payload = {
      ...data,
      roles: [ROLE.RECRUITER],
    };
    delete payload.role;
    signUpMutation(payload)
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-primary">
          Chào mừng bạn đến với vieclamnkt.top
        </h3>
        <p className="text-sm opacity-50">
          Đăng tải công việc và tìm kiếm ứng viên lý tưởng
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col items-end gap-4"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập số điện thoại"
                    {...field}
                    type="tel"
                  />
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
                  <Input
                    placeholder="Nhập mật khẩu"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mật khẩu"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ và tên" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={isLoading}>
            {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm">
        Bạn đã có tài khoản?{' '}
        <Link
          href="/nha-tuyen-dung/dang-nhap"
          className="font-medium text-primary hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
};

export default SignupInfoForm;
