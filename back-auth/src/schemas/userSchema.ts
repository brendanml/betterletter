import { z } from 'zod';

export const newUserSchema = z.object({
  username: z.string().min(2, { message: 'Username is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  rememberMe: z.boolean().optional().default(false),
})

export type UserData = z.infer<typeof newUserSchema> & { id: string };
export type NewUser = z.infer<typeof newUserSchema>;
export type SafeUser = Omit<NewUser, 'password' | 'consent'>;
export type LoginUser = z.infer<typeof loginUserSchema>;