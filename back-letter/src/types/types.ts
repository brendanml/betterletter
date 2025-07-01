import type { InferSchemaType, HydratedDocument } from "mongoose";
import { applicantProfileSchema } from "../models/applicantProfileModel";

// produce the interface from the schema
export type ApplicantProfileType = InferSchemaType<typeof applicantProfileSchema>;

// hydrated document = mongoose document + typed fields
export type ApplicantProfileDoc = HydratedDocument<ApplicantProfileType>;

