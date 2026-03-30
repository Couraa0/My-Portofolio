import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  triggerOnce?: boolean;
}

const AnimatedSection = ({ children, delay = 0, className = "", triggerOnce = true }: AnimatedSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: triggerOnce, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
