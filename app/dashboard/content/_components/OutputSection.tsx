import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Copy } from "lucide-react";
import clsx from "clsx"; // Use clsx instead of radix-ui

interface props {
  aiOutput: string;
}

function OutputSection({ aiOutput }: props) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);

    const editorContent = editorRef.current
      .getRootElement()
      .querySelector(".toastui-editor-contents");

    if (editorContent) {
      editorContent.classList.add("gradient-text");
    }
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

  interface ThemedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
  }

  const ThemedButton: React.FC<ThemedButtonProps> = ({ children, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={clsx(
          "relative flex items-center justify-center px-5 py-2 font-semibold text-white transition-all duration-300 ease-out rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/30 hover:shadow-purple-500/40 transform hover:scale-105"
        )}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse"></span>
        <span className="relative z-10">{children}</span>
      </button>
    );
  };

  return (
    <div className="shadow-lg border rounded-lg text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-cover bg-center"></div>
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <ThemedButton onClick={handleCopy}>
          <Copy className="w-4 mr-2" />
          Copy
        </ThemedButton>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        previewStyle="wysiwyg"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
}

export default OutputSection;
