import {z} from 'zod';

export const createJobValidator = z.object({
  title: z.string().min(1, {message: 'Tiêu đề công việc không được để trống'}),
  description: z
    .string()
    .min(1, {message: 'Mô tả công việc không được để trống'}),
  benefit: z.string().min(1, {message: 'Quyền lợi không được để trống'}),
  disabilityRequirement: z
    .array(
      z.string().min(1, {message: 'Yêu cầu khuyết tật không được để trống'}),
    )
    .min(1, {message: 'Vui lòng chọn ít nhất một yêu cầu khuyết tật'}),
  professionalLevel: z
    .string()
    .min(1, {message: 'Trình độ chuyên môn không được để trống'}),
  workingTime: z
    .string()
    .min(1, {message: 'Thời gian làm việc không được để trống'}),
  minSalary: z.coerce
    .number()
    .min(10000, {message: 'Mức lương tối thiểu phải lớn hơn 10.000'}),
  maxSalary: z.coerce
    .number()
    .min(10000, {message: 'Mức lương tối đa phải lớn hơn 10.000'}),
  healthConditionRequirement: z
    .string()
    .min(1, {message: 'Yêu cầu sức khỏe không được để trống'}),
  type: z.string().min(1, {message: 'Loại công việc không được để trống'}),
  locations: z
    .array(z.coerce.number())
    .min(1, {message: 'Vui lòng chọn ít nhất một vị trí làm việc'}),
  occupations: z
    .array(z.coerce.number())
    .min(1, {message: 'Vui lòng chọn ít nhất một ngành nghề'}),
  qualificationRequirement: z
    .string()
    .min(1, {message: 'Yêu cầu trình độ chuyên môn không được để trống'}),
});
