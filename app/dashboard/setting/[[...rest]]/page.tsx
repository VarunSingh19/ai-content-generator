"use client";

import { UserProfile } from "@clerk/nextjs";
import React from "react";
import { motion } from "framer-motion";
import { CircuitBoard } from "lucide-react";

const Setting = () => {
    const particles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 5,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
            {/* Circuit Board Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <pattern
                        id="circuit-pattern"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 0 10 L 10 10 M 10 10 L 10 0"
                            stroke="currentColor"
                            className="stroke-blue-400"
                            strokeWidth="0.5"
                            fill="none"
                        />
                        <circle cx="10" cy="10" r="1" className="fill-blue-400" />
                    </pattern>
                    <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#circuit-pattern)"
                    />
                </svg>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                        style={{
                            top: `${particle.initialY}%`,
                            left: `${particle.initialX}%`,
                        }}
                        animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8"
            >
                {/* AI Icon Header */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-6"
                >
                    <CircuitBoard className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
                </motion.div>

                {/* Table Layout for UserProfile */}
                <table className="w-full table-auto border-separate border-spacing-4">
                    <tbody>
                        <tr>

                            <td className="w-full">
                                <UserProfile
                                    appearance={{
                                        elements: {
                                            rootBox: "bg-transparent p-4 md:p-6",
                                            card: "bg-transparent border-0 shadow-none",
                                            navbar: "bg-transparent",
                                            navbarButton:
                                                "text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200 text-sm md:text-base",
                                            headerTitle:
                                                "text-white text-xl md:text-2xl font-bold",
                                            formButtonPrimary:
                                                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-lg text-sm md:text-base",
                                            formFieldInput:
                                                "bg-gray-900/60 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200",
                                            avatarBox:
                                                "border-gray-700 hover:border-blue-500 transition-all duration-300",
                                        },
                                        variables: {
                                            colorPrimary: "#3B82F6",
                                            colorBackground: "transparent",
                                            colorText: "#FFFFFF",
                                        },
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default Setting;
