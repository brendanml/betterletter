import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { accountUpdateSchema } from "@/schemas/accountUpdateSchema";
import type { AccountUpdateType } from "@/schemas/accountUpdateSchema";
import { useApplicantProfile } from "@/hooks/useApplicantProfile";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import removeSvg from "../../assets/remove.svg"; // Assuming you have an SVG for the remove button

const AccountUpdateForm = () => {
  /* ───────────────────────── 1. RHF setup ────────────────────────── */
  const form = useForm<AccountUpdateType>({
    resolver: zodResolver(accountUpdateSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      desiredJob: "",
      jobs: [{ title: "", company: "", description: "" }],
      skills: [{ name: "", yearsOfExperience: "0", classification: "" }],
    },
  });

  const {
    fields: jobFields,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray({ control: form.control, name: "jobs" });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" });

  /* ───────────────────────── 2. Load profile ───────────────────────── */
  const { data: profile, isLoading, isError } = useApplicantProfile();

  useEffect(() => {
    if (profile) form.reset(profile); // preload values
  }, [profile, form]);

  /* ───────────────────────── 3. UI states ─────────────────────────── */
  if (isLoading) return <div>Loading…</div>;
  if (isError || !profile) return <div>Error loading profile</div>;

  /* ───────────────────────── 4. Submit handler ────────────────────── */
  const onSubmit = (data: AccountUpdateType) => {
    console.log("FormData:", data);
    // TODO: send PATCH/PUT to backend
  };

  /* ───────────────────────── 5. Render ────────────────────────────── */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">

        {/* ── Simple fields ───────────────────── */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desiredJob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired Job</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ── Jobs array ──────────────────────── */}
        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Jobs</h2>
          {jobFields.map((job, index) => (
            <div key={job.id} className="mb-4 space-y-2">
              <h3>Job Title</h3>
              <FormField
                control={form.control}
                name={`jobs.${index}.title`}
                render={({ field }) => (
                  <Input placeholder="Job Title" {...field} />
                )}
              />
              <h3>Company</h3>
              <FormField
                control={form.control}
                name={`jobs.${index}.company`}
                render={({ field }) => (
                  <Input placeholder="Company" {...field} />
                )}
              />
              <h3>Description</h3>
              <FormField
                control={form.control}
                name={`jobs.${index}.description`}
                render={({ field }) => (
                  <Textarea placeholder="Description" {...field} />
                )}
              />
              <Button type="button" variant="destructive" size="sm" onClick={() => removeJob(index)}>
                Remove Job
              </Button>
            </div>
          ))}
          <Button onClick={() => appendJob({ title: "", company: "", description: "" })}>
            Add Job
          </Button>
        </div>

        {/* ── Skills array ────────────────────── */}
          <h2 className="font-semibold mb-2">Skills</h2>
        <div className="border-t pt-4 flex flex-row flex-wrap">
          {skillFields.map((skill, index) => (
            <div key={skill.id} className="mb-4 space-y-2 flex flex-row bg-[var(--primary-foreground)] w-fit p-3 rounded-md gap-2 items-center">
              <FormField
                control={form.control}
                name={`skills.${index}.name`}
                render={({ field }) => (
                  <Input placeholder="Skill Name" className="w-40 m-0 p-0" {...field} />
                )}
              />
              <FormField
                control={form.control}
                name={`skills.${index}.yearsOfExperience`}
                render={({ field }) => (
                  <Input type="number" placeholder="Years of Experience" className="w-20 m-0 p-0" {...field} />
                )}
              />
              {/* <FormField
                control={form.control}
                name={`skills.${index}.classification`}
                render={({ field }) => (
                  <Input placeholder="Classification" {...field} />
                )}
              /> */}
              <div onClick={() => removeSkill(index)} className="h-6 w-6">
                <img src={removeSvg} alt="" className="h-6 w-6" />
              </div>
            </div>
          ))}
          <Button type="button" onClick={() => appendSkill({ name: "", yearsOfExperience: "0", classification: "" })}>
            Add Skill
          </Button>
        </div>

        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  );
};

export default AccountUpdateForm;
