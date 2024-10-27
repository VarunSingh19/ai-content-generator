import { Templates } from "@/app/(data)/Templates"; // Ensure the correct path to your data file
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import { motion } from 'framer-motion'

export interface TEMPLATES {
  name: string;
  desc: string;
  category: string;
  slug: string;
  aiPrompt: string;
  icon: string;
  form?: FORM[];
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplatelistSection({ userSearchInput }: any) {
  const [templateList, setTemplateList] = useState(Templates)

  useEffect(() => {
    if (userSearchInput) {
      console.log(userSearchInput)
      const filterData = Templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      )
      setTemplateList(filterData)
    } else {
      setTemplateList(Templates)
    }
  }, [userSearchInput])

  return (
    <motion.div
      className="p-8 bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {templateList.map((item: TEMPLATES, index: number) => (
          <motion.div
            key={item.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <TemplateCard key={index} {...item} />
          </motion.div>
        ))}
      </motion.div>
      {templateList.length === 0 && (
        <motion.p
          className="text-center text-gray-400 mt-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          No templates found. Try adjusting your search.
        </motion.p>
      )}
    </motion.div>
  )
}

export default TemplatelistSection;
