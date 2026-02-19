import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, AlertTriangle } from 'lucide-react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-[24px] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden"
                    >
                        {/* Header Image/Icon */}
                        <div className="bg-red-50 p-6 flex justify-center border-b border-red-50">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 relative">
                                <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping opacity-20" />
                                <ShieldCheck size={32} />
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 text-center space-y-2">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {title || 'Delete Profile'}
                            </h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">
                                {message || 'Are you sure you want to delete this user? This action cannot be undone.'}
                            </p>
                        </div>

                        {/* Actions Footer */}
                        <div className="p-6 pt-2 flex items-center gap-3">
                            <button
                                onClick={onClose}
                                disabled={isDeleting}
                                className="flex-1 h-12 rounded-xl bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="flex-1 h-12 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    'Confirm Delete'
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default DeleteModal;
