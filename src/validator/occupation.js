import {z} from 'zod';

export const createOccupationValidator = z.object({
  name: z.string().min(1, {message: 'Tên ngành nghề không được để trống'}),
});
