import {z} from 'zod';

export const addStudyValidator = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  institutionName: z
    .string()
    .min(1, {message: 'Tên cơ sở đào tạo không được để trống'}),
  major: z.string().min(1, {message: 'Chuyên ngành không được để trống'}),
  degreeClassification: z
    .string()
    .min(1, {message: 'Xếp loại tốt nghiệp không được để trống'}),
});

export const addExperienceValidator = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  companyName: z.string().min(1, {message: 'Tên công ty không được để trống'}),
  responsibilities: z.string().min(1, {message: 'Chức vụ không được để trống'}),
});
