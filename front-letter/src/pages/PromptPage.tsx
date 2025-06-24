import { Textarea } from "@/components/ui/textarea";
import {useState} from "react";
import {generateCoverLetter} from "@/services/coverLetterService";
import PDFUploader from "@/components/PDFUploader";
import { useForm } from "react-hook-form";
import type { CLGenerationForm } from "@/schemas/coverLetterSchema";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"



const PromptPage = () => {

  const form = useForm<CLGenerationForm>({
    defaultValues: {
      jobPosting: "",
      resume: undefined,
      userRequests: ""
    },
  });

  const [output, setOutput] = useState("");

  const onSubmit = async (values: CLGenerationForm) => {
    try {
      const res = await generateCoverLetter(values);
      console.log("Generated cover letter:", res);
      setOutput(res.content);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      setOutput("Error generating cover letter. Please try again.");
      return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Prompt Page</h1>
          <p>This is the prompt page content.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume</FormLabel>
                    <FormControl>
                      <PDFUploader
                        onFileChange={(file) => field.onChange(file)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage className="text-left"/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobPosting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job posting</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste job ad…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Extra requests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. emphasise teamwork" className="h-80"{...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="secondary">Submit</Button>
            </form>
          </Form>
        </div>
      </div>


      <div>
        <h1>Output</h1>
        <Textarea
          placeholder="Output will be displayed here..."
          className="mt-4 w-full h-120 overflow-y-auto"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          readOnly
        />
      </div>

    </div>
  );
}

export default PromptPage;