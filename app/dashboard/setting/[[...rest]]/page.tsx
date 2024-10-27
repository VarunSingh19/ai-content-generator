"use client";
import { UserProfile } from '@clerk/nextjs';
import React from 'react';
import { motion } from 'framer-motion';

const Setting = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            {/* Background Pattern */}
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

            {/* UserProfile Container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex items-center justify-center min-h-screen p-4"
            >
                <div className="w-full max-w-[1000px] bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: "bg-transparent p-4",
                                card: "bg-transparent border-0 shadow-none",
                                navbar: "bg-transparent",
                                navbarButton: "text-gray-300 hover:text-white hover:bg-white/10",
                                headerTitle: "text-white",
                                headerSubtitle: "text-gray-300",
                                formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                                formButtonReset: "bg-gray-700 hover:bg-gray-600",
                                formFieldInput: "bg-gray-900/50 border-gray-700 text-white",
                                formFieldLabel: "text-gray-300",
                                dividerLine: "bg-gray-700",
                                dividerText: "text-gray-400",
                                formFieldSuccess: "text-green-400",
                                formFieldError: "text-red-400",
                                avatarBox: "border-gray-700",
                                profileSection: "border-gray-700",
                                accordionTriggerButton: "text-gray-300 hover:text-white",
                                profileSectionTitle: "text-white",
                                profileSectionSubtitle: "text-gray-400",
                                profileSectionPrimaryButton: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                                profileSectionSecondaryButton: "bg-gray-700 hover:bg-gray-600",
                                alertText: "text-gray-300",
                                alertTextDanger: "text-red-400",
                                identityPreviewText: "text-gray-300",
                                pageScrollBox: "scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
                            },
                            variables: {
                                colorPrimary: '#8B5CF6',
                                colorBackground: 'transparent',
                                colorText: '#FFFFFF',
                                colorTextSecondary: '#94A3B8',
                                colorInputBackground: 'rgba(17, 24, 39, 0.5)',
                                colorInputText: '#FFFFFF',
                                colorInputBorder: '#374151',
                                borderRadius: '0.5rem',
                            }
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Setting;