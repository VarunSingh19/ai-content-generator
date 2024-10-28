'use client';
import React from 'react';
import { TEMPLATES } from '../../_components/TemplatelistSection';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useFormInput } from '@/hooks/useFormInput';

// Assume useFormInput is a custom hook

interface PROPS {
  selectedTemplate?: TEMPLATES;
  onFormSubmit: (data: Record<string, any>) => void;
  loading: boolean;
}

function FormSection({ selectedTemplate, onFormSubmit, loading }: PROPS) {
  // Use the hook at the top level of the component
  const { formData, handleInputChange, resetForm } = useFormInput();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData); // Use formData from the hook
    resetForm(); // Reset the form if needed
  };

  return (
    <div className="p-6 shadow-lg border rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Template icon, name, and description */}
      {selectedTemplate?.icon && (
        <Image src={selectedTemplate.icon} alt="icon" width={70} height={70} />
      )}
      <h2 className="font-bold text-2xl mb-2 text-indigo-400">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-400 text-sm">{selectedTemplate?.desc}</p>

      {/* Form */}
      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold text-indigo-300">{item.label}</label>

            {item.field === 'input' ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : item.field === 'textarea' ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : null}
          </div>
        ))}

        {/* Submit Button */}
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
