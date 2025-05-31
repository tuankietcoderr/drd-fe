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

export const updateCandidateInfoValidator = z.object({
  name: z.string().min(1, {message: 'Họ và tên không được để trống'}),
  email: z.string().email({message: 'Email không hợp lệ'}),
  phone: z.string().min(1, {message: 'Số điện thoại không được để trống'}),
  avatar: z.string().optional(),
  currentJobStatus: z.string().optional(),
  currentAddress: z.string().optional(),
  qualificationLevel: z.string().optional(),
  professionalLevel: z.string().optional(),
  disabilityStatus: z.array(z.string()).optional(),
  disabilityCause: z.string().optional(),
  healthStatus: z.string().optional(),
  expectedSalary: z.coerce.number().optional(),
  economicStatus: z.string().optional(),
  major: z.string().optional(),
  hobbies: z.string().optional(),
});
