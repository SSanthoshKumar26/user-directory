import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;
