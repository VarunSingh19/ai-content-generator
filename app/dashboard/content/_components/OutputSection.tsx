import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { Button } from "../../../../components/ui/button";
import { Copy } from "lucide-react";

interface props {
  aiOutput: string;
}
function OutputSection({ aiOutput }: props) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  const handleCopy = () => {
    const markdown = editorRef.current.getInstance().getMarkdown();
    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  return (
    <div className="shadow-lg border rounded-lg text-white">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2 text-white" onClick={handleCopy}>
          <Copy className="w-4 mr-2" />
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        previewStyle="wysiwyg"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
        customStyle={{ color: "from-indigo-500", backgroundColor: "rgba(31, 41, 55, 0.85)" }} // Enforcing white text
      />
    </div>
  );
}

export default OutputSection;
