// // 'use client'

// import { Templates } from "@/app/(data)/Templates";
// import { db } from '@/utils/db';
// import { aiOutput } from '@/utils/schema';
// import { desc, eq } from 'drizzle-orm';
// import React from "react";
// import { TEMPLATES } from '../_components/TemplatelistSection';
// import { currentUser } from "@clerk/nextjs/server";
// import InteractiveImage from "../_components/InteractiveImage";
// import CopyButton from "../_components/CopyButton";

// export interface HISTORY {
//     id: string | Number;
//     formData: string;
//     aiResponse: string;
//     templateSlug: string;
//     createdBy: string;
//     createdAt: Date | null; // Ensure this is correctly defined in the database
// }

// async function HistoryPage() {
//     try {
//         const user = await currentUser();
//         console.log("Current user:", user?.firstName, user?.lastName);

//         const fullName = `${user?.firstName} ${user?.lastName}`;
//         console.log("Searching for user:", fullName);

//         const HistoryList: HISTORY[] = await db.select()
//             .from(aiOutput)
//             .where(eq(aiOutput.createdBy, fullName))
//             .orderBy(desc(aiOutput.id));

//         console.log("Found records:", HistoryList.length);
//         console.log("History List:", HistoryList); // Log to inspect data structure

//         const GetTemplateName = (slug: string) => {
//             const template: TEMPLATES | any = Templates?.find((item) => item.slug === slug);
//             return template;
//         }

//         if (HistoryList.length === 0) {
//             return (
//                 <div className="m-5 p-5 border rounded-lg bg-white">
//                     <h2 className="font-bold text-3xl">History</h2>
//                     <p className="text-gray-500">No history found. Start generating content to see it here.</p>
//                 </div>
//             );
//         }

//         return (
//             <div className="m-5 p-5 border rounded-lg bg-white">
//                 <h2 className="font-bold text-3xl">History</h2>
//                 <p className="text-gray-500">Search Your Previously generated Content</p>
//                 <div className="grid grid-cols-7 font-bold bg-secondary mt-5 p-3">
//                     <h2 className="col-span-2">TEMPLATE</h2>
//                     <h2 className="col-span-2">AI Response</h2>
//                     <h2>DATE</h2>
//                     <h2>WORDS</h2>
//                     <h2>COPY</h2>
//                 </div>

//                 {HistoryList.map((item: HISTORY) => (
//                     <div key={item.id} className="grid grid-cols-7 my-5 py-3 px-3 hover:bg-gray-50">
//                         <h2 className="col-span-2 flex gap-2 items-center">
//                             <InteractiveImage
//                                 src={GetTemplateName(item.templateSlug)?.icon}
//                                 width={25}
//                                 height={25}
//                                 alt="Template Icon"
//                             />
//                             {GetTemplateName(item.templateSlug)?.name}
//                         </h2>
//                         <h2 className="col-span-2 line-clamp-3">
//                             {item.aiResponse}
//                         </h2>
//                         <h2>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</h2>
//                         <h2>{item.aiResponse.split(/\s+/).length}</h2>
//                         <h2>
//                             <CopyButton textToCopy={item.aiResponse} />
//                         </h2>
//                     </div>
//                 ))}
//             </div>
//         );
//     } catch (error) {
//         console.error("Error in HistoryPage:", error);
//         return (
//             <div className="m-5 p-5 border rounded-lg bg-white">
//                 <h2 className="font-bold text-3xl">Error</h2>
//                 <p className="text-red-500">Failed to load history. Please try again later.</p>
//                 <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
//                     {error instanceof Error ? error.stack : 'Unknown error'}
//                 </pre>
//             </div>
//         );
//     }
// }


// export default HistoryPage;
// 'use client'

// import { Templates } from "@/app/(data)/Templates";
// import { db } from '@/utils/db';
// import { aiOutput } from '@/utils/schema';
// import { desc, eq } from 'drizzle-orm';
// import React from "react";
// import { TEMPLATES } from '../_components/TemplatelistSection';
// import { currentUser } from "@clerk/nextjs/server";
// import InteractiveImage from "../_components/InteractiveImage";
// import CopyButton from "../_components/CopyButton";
// import { motion } from "framer-motion";
// import { Brain, Clock, Copy, FileText, Search } from "lucide-react";

// export interface HISTORY {
//     id: string | Number;
//     formData: string;
//     aiResponse: string;
//     templateSlug: string;
//     createdBy: string;
//     createdAt: Date | null;
// }

// async function HistoryPage() {
//     try {
//         const user = await currentUser();
//         const fullName = `${user?.firstName} ${user?.lastName}`;

//         const HistoryList: HISTORY[] = await db.select()
//             .from(aiOutput)
//             .where(eq(aiOutput.createdBy, fullName))
//             .orderBy(desc(aiOutput.id));

//         const GetTemplateName = (slug: string) => {
//             const template: TEMPLATES | any = Templates?.find((item) => item.slug === slug);
//             return template;
//         }

//         if (HistoryList.length === 0) {
//             return (
//                 <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
//                     >
//                         <div className="flex items-center gap-4 mb-6">
//                             <motion.div
//                                 animate={{
//                                     scale: [1, 1.2, 1],
//                                     rotate: [0, 360],
//                                 }}
//                                 transition={{
//                                     duration: 3,
//                                     repeat: Infinity,
//                                     repeatType: "reverse"
//                                 }}
//                             >
//                                 <Brain className="w-10 h-10 text-blue-500" />
//                             </motion.div>
//                             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//                                 AI Generation History
//                             </h2>
//                         </div>
//                         <p className="text-gray-400">Start your AI journey by generating some amazing content!</p>
//                     </motion.div>
//                 </div>
//             );
//         }

//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
//                 {/* AI Background Pattern */}
//                 <div className="absolute inset-0 overflow-hidden">
//                     <div className="absolute inset-0 opacity-10 bg-cover bg-center">
//                         <svg className="w-full h-full">
//                             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
//                             </pattern>
//                             <rect width="100%" height="100%" fill="url(#grid)" />
//                         </svg>
//                     </div>
//                 </div>

//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="relative z-10 max-w-7xl mx-auto"
//                 >
//                     {/* Header Section */}
//                     <div className="flex items-center justify-between mb-8">
//                         <div className="flex items-center gap-4">
//                             <motion.div
//                                 animate={{
//                                     scale: [1, 1.2, 1],
//                                     rotate: [0, 360],
//                                 }}
//                                 transition={{
//                                     duration: 3,
//                                     repeat: Infinity,
//                                     repeatType: "reverse"
//                                 }}
//                             >
//                                 <Brain className="w-10 h-10 text-blue-500" />
//                             </motion.div>
//                             <div>
//                                 <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
//                                     AI Generation History
//                                 </h2>
//                                 <p className="text-gray-400">View and manage your AI-generated content</p>
//                             </div>
//                         </div>
//                         <div className="relative">
//                             <input
//                                 type="search"
//                                 placeholder="Search history..."
//                                 className="bg-gray-800/50 backdrop-blur-sm rounded-full py-2 px-6 pl-12 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 w-64"
//                             />
//                             <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
//                         </div>
//                     </div>

//                     {/* Header Grid */}
//                     <motion.div
//                         className="grid grid-cols-7 backdrop-blur-sm bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2 }}
//                     >
//                         <h2 className="col-span-2 text-gray-300 font-medium flex items-center gap-2">
//                             <FileText className="w-4 h-4" /> TEMPLATE
//                         </h2>
//                         <h2 className="col-span-2 text-gray-300 font-medium flex items-center gap-2">
//                             <Brain className="w-4 h-4" /> AI RESPONSE
//                         </h2>
//                         <h2 className="text-gray-300 font-medium flex items-center gap-2">
//                             <Clock className="w-4 h-4" /> DATE
//                         </h2>
//                         <h2 className="text-gray-300 font-medium">WORDS</h2>
//                         <h2 className="text-gray-300 font-medium flex items-center gap-2">
//                             <Copy className="w-4 h-4" /> COPY
//                         </h2>
//                     </motion.div>

//                     {/* History Items */}
//                     {HistoryList.map((item: HISTORY, index: number) => (
//                         <motion.div
//                             key={item.id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.1 * index }}
//                             className="grid grid-cols-7 mb-4 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300"
//                         >
//                             <h2 className="col-span-2 flex gap-3 items-center">
//                                 <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
//                                     <InteractiveImage
//                                         src={GetTemplateName(item.templateSlug)?.icon}
//                                         width={20}
//                                         height={20}
//                                         alt="Template Icon"
//                                     />
//                                 </div>
//                                 <span className="text-gray-200">
//                                     {GetTemplateName(item.templateSlug)?.name}
//                                 </span>
//                             </h2>
//                             <h2 className="col-span-2 line-clamp-3 text-gray-300">
//                                 {item.aiResponse}
//                             </h2>
//                             <h2 className="text-gray-300">
//                                 {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
//                             </h2>
//                             <h2 className="text-gray-300">
//                                 {item.aiResponse.split(/\s+/).length}
//                             </h2>
//                             <h2>
//                                 <CopyButton textToCopy={item.aiResponse} />
//                             </h2>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         );
//     } catch (error) {
//         console.error("Error in HistoryPage:", error);
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
//                 >
//                     <h2 className="text-3xl font-bold text-red-400 mb-4">Error</h2>
//                     <p className="text-gray-300">Failed to load history. Please try again later.</p>
//                     <pre className="mt-4 p-4 bg-gray-900/50 rounded-lg overflow-auto text-gray-400 text-sm">
//                         {error instanceof Error ? error.stack : 'Unknown error'}
//                     </pre>
//                 </motion.div>
//             </div>
//         );
//     }
// }

// export default HistoryPage;

import { Templates } from "@/app/(data)/Templates";
import { db } from '@/utils/db';
import { aiOutput } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { currentUser } from "@clerk/nextjs/server";
import HistoryContent from './HistoryContent';

export interface HISTORY {
    id: string | Number;
    formData: string;
    aiResponse: string;
    templateSlug: string;
    createdBy: string;
    createdAt: Date | null;
}

async function HistoryPage() {
    try {
        const user = await currentUser();
        const fullName = `${user?.firstName} ${user?.lastName}`;

        const historyList = await db.select()
            .from(aiOutput)
            .where(eq(aiOutput.createdBy, fullName))
            .orderBy(desc(aiOutput.id));

        const historyListWithTemplates = historyList.map((item) => {
            const template = Templates.find((t) => t.slug === item.templateSlug);
            return {
                ...item,
                templateName: template?.name || 'Unknown Template',
                templateIcon: template?.icon || '', // assuming icon is a string URL
            };
        });

        return <HistoryContent historyList={historyListWithTemplates} />;
    } catch (error) {
        console.error("Error in HistoryPage:", error);
        return <HistoryContent error={error} />;
    }
}

export default HistoryPage;
