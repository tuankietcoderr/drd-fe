import {z} from 'zod';

export const createLocationValidator = z.object({
  name: z.string().min(1, {message: 'Tên vị trí không được để trống'}),
});
