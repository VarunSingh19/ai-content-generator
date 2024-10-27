'use client'

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Clock, Copy, FileText, Search } from "lucide-react";
import InteractiveImage from "../_components/InteractiveImage";
import CopyButton from "../_components/CopyButton";


interface HISTORY {
    id: string | number;
    formData: string;
    aiResponse: string;
    templateSlug: string;
    createdBy: string;
    createdAt: Date | null;
    templateName: string; // New field for the template name
    templateIcon: string; // New field for the template icon
}

interface HistoryContentProps {
    historyList?: HISTORY[];
    error?: Error | unknown;
}

const HistoryContent: React.FC<HistoryContentProps> = ({ historyList, error }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHistory = historyList?.filter(item =>
        item.aiResponse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.templateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-red-400 mb-4">Error</h2>
                    <p className="text-gray-300">Failed to load history. Please try again later.</p>
                    <pre className="mt-4 p-4 bg-gray-900/50 rounded-lg overflow-auto text-gray-400 text-sm">
                        {error instanceof Error ? error.stack : 'Unknown error'}
                    </pre>
                </motion.div>
            </div>
        );
    }

    if (!historyList?.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-7xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <Brain className="w-10 h-10 text-blue-500" />
                        </motion.div>
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            AI Generation History
                        </h2>
                    </div>
                    <p className="text-gray-400">Start your AI journey by generating some amazing content!</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">

            {/* AI Background Pattern */}
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
            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-7xl mx-auto"
            >
                {/* History Items */}
                {filteredHistory?.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="grid grid-cols-7 mb-4 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300"
                    >
                        <h2 className="col-span-2 flex gap-3 items-center">
                            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                                <InteractiveImage
                                    src={item.templateIcon}
                                    width={20}
                                    height={20}
                                    alt="Template Icon"
                                />
                            </div>
                            <span className="text-gray-200">
                                {item.templateName}
                            </span>
                        </h2>
                        <h2 className="col-span-2 line-clamp-3 text-gray-300">
                            {item.aiResponse}
                        </h2>
                        <h2 className="text-gray-300">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                        </h2>
                        <h2 className="text-gray-300">
                            {item.aiResponse.split(/\s+/).length}
                        </h2>
                        <h2>
                            <CopyButton textToCopy={item.aiResponse} />
                        </h2>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default HistoryContent;
