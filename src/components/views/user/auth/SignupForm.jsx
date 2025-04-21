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
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
  HEALTH_STATUS,
  HEALTH_STATUS_ARRAY,
  ROLE,
  ROLE_ARRAY,
} from '@/constants/enum';
import {signupValidator} from '@/validator/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';
import {useForm} from 'react-hook-form';

const SignupForm = () => {
  const form = useForm({
    resolver: zodResolver(signupValidator),
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      role: ROLE.USER,
      name: '',
      email: '',
      health_status: HEALTH_STATUS.DISABLED,
    },
  });

  const onSubmit = async data => {
    console.log(data);
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
            name="role"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Bạn là</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    className="flex gap-4">
                    {ROLE_ARRAY.map(role => (
                      <FormItem
                        key={role.value}
                        className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={role.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {role.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <Button className="w-full">Đăng ký</Button>
        </form>
      </Form>
      <p className="text-center text-sm">
        Bạn đã có tài khoản?{' '}
        <Link
          href="/dang-nhap"
          className="font-medium text-primary hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
};

export default SignupForm;
