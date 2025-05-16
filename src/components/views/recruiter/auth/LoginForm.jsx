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
import authApi from '@/redux/features/auth/authQuery';
import {authActions} from '@/redux/features/auth/authSlice';
import {useAppDispatch} from '@/redux/hooks';
import {loginValidator} from '@/validator/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [signInMutation, {isLoading}] = authApi.useSignInMutation();

  const onSubmit = async data => {
    signInMutation(data)
      .unwrap()
      .then(res => {
        dispatch(
          authActions.setTokens({
            accessToken: res.accessToken,
            refreshToken: res.refreshToken,
          }),
        );
        location.href = searchParams.get('fallbackUrl') || '/nha-tuyen-dung';
      })
      .catch(err => {
        console.log(err);
        toast.error('Đã xảy ra lỗi trong quá trình đăng nhập');
      });
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-primary">
          Chào mừng bạn đã quay trở lại
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
                  <Input placeholder="Nhập email" type="email" {...field} />
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

          <Link
            href="/nha-tuyen-dung/quen-mat-khau"
            className="text-sm font-medium text-primary hover:underline">
            Quên mật khẩu?
          </Link>

          <Button className="w-full" disabled={isLoading}>
            Đăng nhập
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm">
        Bạn chưa có tài khoản?{' '}
        <Link
          href="/nha-tuyen-dung/dang-ky"
          className="font-medium text-primary hover:underline">
          Đăng ký ngay
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
