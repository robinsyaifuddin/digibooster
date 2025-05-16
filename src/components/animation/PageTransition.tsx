import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
interface PageTransitionProps {
  children: ReactNode;
}
export const PageTransition = ({
  children
}: PageTransitionProps) => {
  const location = useLocation();
  return <motion.div key={location.pathname} initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} exit={{
    opacity: 0,
    y: -20
  }} transition={{
    duration: 0.4,
    ease: "easeInOut"
  }} className="bg-slate-950">
      {children}
    </motion.div>;
};