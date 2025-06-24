import { z } from 'zod';

export const cl_generationFormSchema = z.object({
  resume: z
    .instanceof(File)
    .refine((file) => file.type === 'application/pdf', {
      message: 'File must be a PDF',
    }),
  jobPosting: z.string().min(1, {
    message: 'Job posting is required',
  }),
  userRequests: z.string().optional(),
});

export type CLGenerationForm = z.infer<typeof cl_generationFormSchema>;
export type CLGenerationRequest = {
  resume: File;
  jobPosting: string;
  userRequests?: string;
}