import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {useState} from "react";
import {generateCoverLetter} from "@/services/coverLetterService";

const PromptPage = () => {

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted prompt:", prompt);
    try {
      const res = await generateCoverLetter(prompt);
      console.log("Generated cover letter:", res);
      setOutput(res.coverLetter);
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
          <form onSubmit={handleSubmit}>

          <Textarea
            placeholder="Type your prompt here..."
            className="mt-4 w-full h-50
            "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            />
            <Button className="mt-4" type="submit">submit</Button>  
            </form>
        </div>
      </div>


      <div>
        <h1>Output</h1>
        <Textarea
          placeholder="Output will be displayed here..."
          className="mt-4 w-full h-80 overflow-y-auto"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          readOnly
        />
      </div>
    </div>
  );
}

export default PromptPage;