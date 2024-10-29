"use client";
import React, { useContext, useState } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { Templates } from "@/app/(data)/Templates";
import { TEMPLATES } from "../../_components/TemplatelistSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { useUser } from "@clerk/clerk-react"; // Clerk for authentication
import { db } from "@/utils/db"; // Database logic
import { aiOutput } from "@/utils/schema"; // Schema
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PROPS {
  params: {
    "template-slug": string;
  };
}
interface ThemedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center px-5 py-2 font-semibold text-white transition-all duration-300 ease-out rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-600 shadow-lg shadow-indigo-500/30 hover:shadow-purple-500/40 transform hover:scale-105"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 rounded-full blur-xl opacity-30 animate-pulse"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};


function CreateContent({ params }: PROPS) {
  const selectedTemplate: TEMPLATES | undefined = Templates?.find(
    (item) => item.slug === params["template-slug"]
  );
  const [aiOutputText, setAiOutput] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { totalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const { setUpdateCreditUsage } = useContext<any>(UpdateCreditUsageContext);



  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      console.log("Please Upgrade");
      router.push("/dashboard/billing");
      return;
    }
    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAiPrompt = JSON.stringify(formData) + "," + SelectedPrompt;
    const result = await chatSession.sendMessage(FinalAiPrompt);

    setAiOutput(result?.response.text());
    console.log(result?.response.text());
    await SaveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug ?? "", // Default to empty string if undefined
      result?.response.text() ?? "" // Default to empty string if undefined
    );

    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
    try {
      const createdBy =
        user?.fullName ||
        `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
        "Unnamed User"; // Fallback if name isn't available

      const result = await db.insert(aiOutput).values({
        id: crypto.randomUUID(),
        formData: JSON.stringify(formData),
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy, // Store the user's name
        createdAt: new Date(),
      });

      console.log("Saved to DB:", result);
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="relative p-8 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Background Effects */}
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

      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <Link href="/dashboard">
        <ThemedButton >
          <ArrowLeft className="mr-2" />
          Back
        </ThemedButton>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 py-5">
        <div className="lg:col-span-1 md:col-span-1 col-span-1 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <FormSection
            selectedTemplate={selectedTemplate}
            onFormSubmit={GenerateAIContent} // Renamed the prop
            loading={loading}
          />

        </div>
        <div className="lg:col-span-2 md:col-span-1 col-span-1  backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-white">
          <OutputSection aiOutput={aiOutputText || ""} />
        </div>s
      </div>
    </div>
  );
}

export default CreateContent;
