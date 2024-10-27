"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2Icon, Sparkles, Brain, Zap, History, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import axios from "axios";
import { db } from "@/utils/db";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

const Billing = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);

    // Original functions remain the same
    const CreateSubscription = () => {
        setLoading(true);
        axios.post("/api/create-subscription", {}).then(
            (resp) => {
                console.log(resp.data);
                OnPayment(resp.data.id);
            },
            (error) => {
                setLoading(false);
            }
        );
    };

    const OnPayment = (subId: string) => {
        if (typeof window !== "undefined" && window.Razorpay) {
            const options = {
                key: process.env.NEXT_PUBLIC_RAJORPAY_KEY_ID || "",
                subscription_id: subId,
                name: "NuzhatKhatoon Ai Apps",
                description: "Monthly Subscription",
                handler: async (resp: any) => {
                    console.log(resp);
                    if (resp) {
                        SaveSubscription(resp.razorpay_payment_id);
                    }
                    setLoading(false);
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            console.error("Razorpay SDK not loaded");
        }
    };

    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript()
            .then(() => {
                console.log("Razorpay SDK loaded successfully");
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const SaveSubscription = async (paymentId: string) => {
        const result = await db.insert(UserSubscription).values({
            email: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            active: true,
            paymentId: paymentId,
            joinDate: moment().format("DD/MM/yyyy"),
        });
        console.log(result);
        if (result) {
            window.location.reload();
        }
    };

    const features = {
        free: [
            { icon: Brain, text: "10,000 Words/Month" },
            { icon: Sparkles, text: "50+ Content Templates" },
            { icon: Download, text: "Unlimited Download & Copy" },
            { icon: History, text: "1 Month of History" }
        ],
        premium: [
            { icon: Brain, text: "1,00,000 Words/Month" },
            { icon: Sparkles, text: "50+ Template Access" },
            { icon: Download, text: "Unlimited Download & Copy" },
            { icon: History, text: "1 Year of History" }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 relative overflow-hidden">
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

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Upgrade Your AI Experience
                        </span>
                    </h1>
                    <p className="text-gray-300 text-xl">Choose the perfect plan to unlock the full potential of AI</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 overflow-hidden group hover:border-gray-600 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CardHeader className="p-6 text-center relative z-10">
                                <CardTitle className="text-2xl font-bold mb-4 text-white">Free</CardTitle>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-5xl font-extrabold tracking-tight text-white">0₹</span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 relative z-10">
                                <ul className="space-y-4">
                                    {features.free.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="flex items-center"
                                        >
                                            <feature.icon className="h-5 w-5 text-blue-400 mr-3" />
                                            <span className="text-gray-300">{feature.text}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <Button
                                    className="w-full mt-8 bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300"
                                    disabled
                                >
                                    Currently Active Plan
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Premium Plan */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-purple-500/50 overflow-hidden group hover:border-purple-400 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                            <CardHeader className="p-6 text-center relative z-10">
                                <CardTitle className="text-2xl font-bold mb-4 text-white">Premium</CardTitle>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                        100.0₹
                                    </span>
                                    <span className="ml-1 text-xl text-gray-400">/month</span>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 relative z-10">
                                <ul className="space-y-4">
                                    {features.premium.map((feature, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            className="flex items-center"
                                        >
                                            <feature.icon className="h-5 w-5 text-purple-400 mr-3" />
                                            <span className="text-gray-300">{feature.text}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                <Button
                                    disabled={loading}
                                    onClick={() => CreateSubscription()}
                                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 group"
                                >
                                    {loading && <Loader2Icon className="animate-spin mr-2" />}
                                    {userSubscription ? 'Active Plan' : (
                                        <span className="flex items-center justify-center gap-2">
                                            Get Started
                                            <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Billing;