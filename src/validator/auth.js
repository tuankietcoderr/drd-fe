import {parsePhoneNumberFromString} from 'libphonenumber-js';
import {z} from 'zod';

export const loginValidator = z.object({
  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .refine(
      val => {
        const phone = parsePhoneNumberFromString(val);
        return phone?.isValid() ?? false;
      },
      {
        message: 'Số điện thoại không hợp lệ',
      },
    ),
  password: z
    .string()
    .min(1, 'Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const signupValidator = loginValidator
  .merge(
    z.object({
      name: z.string().min(1, {message: 'Tên không được để trống'}),
      confirmPassword: z.string().min(6, {
        message: 'Mật khẩu xác nhận không được để trống',
      }),
      role: z.string().optional().nullable(),
      email: z.string().email('Email không hợp lệ').min(1, {
        message: 'Email không được để trống',
      }),
      health_status: z.string().optional().nullable(),
    }),
  )
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });
