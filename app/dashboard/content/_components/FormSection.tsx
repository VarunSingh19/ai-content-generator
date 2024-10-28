'use client';
import React, { useState } from "react";
import { TEMPLATES } from "../../_components/TemplatelistSection";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATES;
  onFormSubmit: (data: Record<string, any>) => void; // Correct prop type
  loading: boolean;
}

function FormSection({ selectedTemplate, onFormSubmit, loading }: PROPS) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData); // Now correctly calling the prop function
  };

  return (
    <div className="p-6 shadow-lg border rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Form content */}
      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold text-indigo-300">{item.label}</label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : null}
          </div>
        ))}

        <Button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          disabled={loading}
        >
          {loading && <Loader2Icon className="animate-spin mr-2" />}
          Generate Content
        </Button>
      </form>
    </div>
  );
}


export default FormSection;
