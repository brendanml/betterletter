"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {createUser} from "../services/userService"
import { newUserSchema } from "../schemas/userSchema";
import axios from "axios"
import { useTimedNotification } from "@/hooks/useTimedNotification"
import { useAuthForm } from "@/contexts/AuthFormContext"



// shadcn components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"


function RegisterForm() {
  const { setTimedNotification } = useTimedNotification()
  const { setFormType } = useAuthForm() // Access the context to change form type

  const form = useForm<z.infer<typeof newUserSchema>>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      consent: false, // Default value for consent checkbox
    },
  })

  const onSubmit = async (values: z.infer<typeof newUserSchema>) =>{
    console.log(values)
    try {
      const response = await createUser(values)
      console.log('User created successfully:', response)
      // Optionally, you can reset the form or redirect the user
      setFormType('login'); // Switch to login form after successful registration
    } catch (err: unknown) {
    // 👇 ONE-LINER that works for plain string or { error: "…" } payloads
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.error ?? err.response?.data ?? err.message
        : 'Unexpected error';
      setTimedNotification(msg, 'error');
      console.error(err);
    }
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username." {...field} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email." {...field} />
              </FormControl>

              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password." type="password"{...field} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex space-x-2">
              <FormControl>
                <Checkbox
                  id="consent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel htmlFor="consent" className="cursor-pointer text-xs text-[var(--muted)] text-left">
                By registering, I consent to the processing of my personal information in accordance with the Privacy Policy.
              </FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" className="btn-signin">Sign up</Button>
      </form>
    </Form>
  )

}

export default RegisterForm
