import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {useState} from "react";

const PromptPage = () => {

  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted prompt:", prompt);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Prompt Page</h1>
          <p>This is the prompt page content.</p>
          <form onSubmit={handleSubmit}>

          <Textarea
            placeholder="Type your prompt here..."
            className="mt-4 w-full h-32"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            />
            <Button className="mt-4" type="submit">submit</Button>  
            </form>
        </div>
      </div>
    </div>
  );
}

export default PromptPage;