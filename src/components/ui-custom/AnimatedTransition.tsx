
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'blur';
}

const AnimatedTransition = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  type = 'fade',
}: AnimatedTransitionProps) => {
  // Define animation variants based on type
  const getVariants = () => {
    switch (type) {
      case 'slide-up':
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'slide-down':
        return {
          hidden: { y: -20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'scale':
        return {
          hidden: { scale: 0.9, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      case 'blur':
        return {
          hidden: { filter: 'blur(8px)', opacity: 0 },
          visible: { filter: 'blur(0px)', opacity: 1 },
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth cubic-bezier easing
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTransition;
