import React from 'react';
import { motion } from 'framer-motion';

const Fade = ({
  isVisible,
  delay = 0,
  className = '',
  skipExit = false,
  children,
}: {
  isVisible: boolean;
  delay?: number;
  className?: string;
  skipExit?: boolean;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    exit={{ opacity: skipExit ? 1 : 0 }}
    // 3 is specific to countdown numbers
    transition={{ duration: skipExit ? 3 : 1, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Fade;
