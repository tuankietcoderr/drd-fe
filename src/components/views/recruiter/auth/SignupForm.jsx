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
import {signupValidator} from '@/validator/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useSearchParams} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';

const SignupForm = () => {
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
  const searchParams = useSearchParams();
  const fallbackUrl = searchParams.get('fallbackUrl');

  const onSubmit = async data => {
    delete data.confirmPassword;
    const payload = {
      ...data,
      roles: [],
    };
    delete payload.role;
    signUpMutation(payload)
      .unwrap()
      .then(() => {
        toast.success(
          'Tạo tài khoản thành công. Đang chuyển hướng đến trang đăng nhập',
        );
        setTimeout(() => {
          location.href =
            '/nha-tuyen-dung/dang-nhap' +
            (fallbackUrl ? `?fallbackUrl=${fallbackUrl}` : '');
        }, 2000);
      })
      .catch(err => {
        toast.error('Đã xảy ra lỗi trong quá trình đăng ký tài khoản');
      });
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-primary">
          Chào mừng bạn đến với DrD
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

          {/* <FormField
            control={form.control}
            name="health_status"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Tình trạng sức khoẻ</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="flex gap-4">
                    {HEALTH_STATUS_ARRAY.map(status => (
                      <FormItem
                        key={status.value}
                        className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={status.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {status.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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
          href={`/nha-tuyen-dung/dang-nhap${fallbackUrl ? `?fallbackUrl=${fallbackUrl}` : ''}`}
          className="font-medium text-primary hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
