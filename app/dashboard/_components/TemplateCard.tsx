import Image from "next/image";
import React from "react";
import { TEMPLATES } from "./TemplatelistSection";
import Link from "next/link";
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function TemplateCard(item: TEMPLATES) {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 overflow-hidden group">
          <CardHeader className="relative pb-0">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex justify-center">
              <motion.div
                className="w-16 h-16 relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Image
                  src={item?.icon || '/default-icon.png'}
                  alt={item?.name || 'Default Name'}
                  layout="fill"
                  objectFit="contain"
                  className="p-3"
                />
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="text-center mt-4">
            <CardTitle className="text-lg font-medium text-white mb-2">{item?.name || 'Default Name'}</CardTitle>
            <p className="text-gray-400 text-sm line-clamp-3">{item?.desc || 'Default Name'}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

export default TemplateCard;
