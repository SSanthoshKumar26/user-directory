import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, shadow: '0 20px 40px -20px rgba(0,0,0,0.1)' }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={`glass-panel p-8 ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
