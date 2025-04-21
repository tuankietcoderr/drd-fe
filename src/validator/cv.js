import {z} from 'zod';

export const createCVValidator = z.object({
  name: z.string().min(1, {message: 'Tên không được để trống'}),
  phone: z.string().min(1, {message: 'Số điện thoại không được để trống'}),
  email: z
    .string()
    .email('Email không hợp lệ')
    .min(1, {message: 'Email không được để trống'}),
  address: z.string().optional().nullable(),
  birthday: z.string().optional().nullable(),
  health_status: z.string().optional().nullable(),
});
