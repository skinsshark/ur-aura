import React from 'react';
import { motion } from 'framer-motion';

const Fade = ({
  isVisible,
  delay = 0,
  className = '',
  children,
}: {
  isVisible: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
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
