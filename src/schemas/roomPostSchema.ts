import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const createRoomPostSchema = z.object({
  image: z
    .instanceof(File, { message: '画像ファイルを選択してください' })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: '画像ファイルは5MB以下である必要があります',
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: '画像ファイルはJPEGまたはPNG形式である必要があります',
    }),
  title: z
    .string()
    .min(1, { message: 'タイトルを入力してください' })
    .max(100, { message: 'タイトルは100文字以内で入力してください' }),
  description: z
    .string()
    .max(1000, { message: '説明文は1000文字以内で入力してください' })
    .optional()
    .or(z.literal('')),
});

export type CreateRoomPostFormData = z.infer<typeof createRoomPostSchema>;
