import React from 'react';
import { motion } from 'framer-motion';

const Fade = ({
  isVisible,
  children,
  delay = 0,
  className = '',
}: {
  isVisible: boolean;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Fade;
