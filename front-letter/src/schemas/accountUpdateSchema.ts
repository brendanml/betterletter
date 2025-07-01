import { z } from 'zod';

export const accountUpdateSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  phoneNumber: z.string().optional(),
  desiredJob: z.string().optional(),
  jobs: z.array(
    z.object({
      title: z.string().min(1, { message: 'Title is required' }),
      company: z.string().min(1, { message: 'Company is required' }),
      description: z.string().optional(),
    })
  ).optional(),
  projects: z.array(
    z.object({
      name: z.string().min(1, { message: 'Project name is required' }),
      technologies: z.array(z.string()).min(1, { message: 'At least one technology is required' }),
      classification: z.string().optional(),
    })
  ).optional(),
  education: z.array(
    z.object({
      institution: z.string().min(1, { message: 'Institution is required' }),
      degree: z.string().min(1, { message: 'Degree is required' }),
      courseWork: z.string().optional(),
      graduationYear: z.string().optional(),
      graduated: z.boolean(),
    })
  ).optional(),
  skills: z.array(
    z.object({
      name: z.string().min(1, { message: 'Skill name is required' }),
      yearsOfExperience: z.string().optional(),
      classification: z.string().optional(),
    })
  ).optional(),
});

export type AccountUpdateType = z.infer<typeof accountUpdateSchema>;