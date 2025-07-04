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



const GeneratorPage = () => {

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
    <article className="flex flex-col w-[90%] m-auto">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="p-4 rounded-lg shadow-md bg-white flex flex-col items-start w-full">

              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                </div>
              <div className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-start">

              <FormField
                control={form.control}
                name="jobPosting"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Job posting</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste job ad…" {...field} className="h-50"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
                <div className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-start">

              <FormField
                control={form.control}
                name="userRequests"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Extra requests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. emphasise teamwork" className="h-30"{...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                </div>
              <Button type="submit" className="btn-homepage w-full">Generate</Button>
            </form>
          </Form>
        </div>
      </div>
      <div>
      <div className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-start">

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

    </article>
  );
}

export default GeneratorPage;