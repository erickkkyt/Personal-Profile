'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    note?: string;
}

export default function ContactModal({
    isOpen,
    onClose,
    title = "添加微信咨询",
    subtitle = "长按/扫码二维码，直接添加微信",
    note = "若二维码失效，请通过微信「15355407564」添加" // Default note based on Footer content
}: ContactModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="relative w-full max-w-sm rounded-2xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden"
                        initial={{ scale: 0.9, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 12 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                            aria-label="关闭二维码弹窗"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="p-6 space-y-4 text-center">
                            <h3 className="text-lg font-semibold text-white">{title}</h3>
                            <p className="text-sm text-gray-300">{subtitle}</p>
                            <div className="mx-auto w-56 h-56 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-inner">
                                {/* Ensure this path is correct or generic */}
                                <img
                                    src="/qr/wechat-hero.png"
                                    alt="微信二维码"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-xs text-gray-400">{note}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
