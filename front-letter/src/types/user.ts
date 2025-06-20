import { newUserSchema, loginUserSchema } from "@/schemas/userSchema";
import { z } from "zod";

export type NewUser = z.infer<typeof newUserSchema>;
export type SafeUser = Omit<NewUser, "password">;
export type LoginUser = z.infer<typeof loginUserSchema>;
