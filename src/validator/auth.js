import {z} from 'zod';

export const loginValidator = z.object({
  email: z.string().email('Email không hợp lệ').min(1, {
    message: 'Email không được để trống',
  }),
  password: z
    .string()
    .min(1, 'Mật khẩu không được để trống')
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
});

export const signupValidator = loginValidator
  .merge(
    z.object({
      name: z.string().min(1, {message: 'Tên không được để trống'}),
      confirmPassword: z.string().min(8, {
        message: 'Mật khẩu xác nhận không được để trống',
      }),
      role: z.string().optional().nullable(),
      phone: z.string().min(1, 'Số điện thoại không được để trống'),
    }),
  )
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });
