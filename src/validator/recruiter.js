import {z} from 'zod';

export const updateProfileValidator = z.object({
  businessType: z
    .string()
    .min(1, {message: 'Loại hình doanh nghiệp không được để trống'}),
  companyName: z.string().min(1, {message: 'Tên công ty không được để trống'}),
  description: z
    .string()
    .min(1, {message: 'Mô tả công ty không được để trống'}),
  phone: z
    .string()
    .min(1, {message: 'Số điện thoại không được để trống'})
    .regex(/^\d+$/, {message: 'Số điện thoại chỉ chứa chữ số'}),
  email: z
    .string()
    .email('Email không hợp lệ')
    .min(1, {message: 'Email không được để trống'}),
  address: z.string().min(1, {message: 'Địa chỉ không được để trống'}),
  avatar: z.string().url('URL ảnh đại diện không hợp lệ').optional().nullable(),
});
