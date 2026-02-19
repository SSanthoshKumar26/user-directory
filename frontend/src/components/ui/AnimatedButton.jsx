import { motion } from 'framer-motion';

const AnimatedButton = ({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'px-6 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-lg shadow-red-500/20',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className={`${variants[variant]} ${className} disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden`}
            {...props}
        >
            <span className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}>
                {children}
            </span>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            )}
        </motion.button>
    );
};

export default AnimatedButton;
