"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutTransition({
  transitionKey,
  children,
  className,
}: {
  transitionKey: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        animate={{ opacity: 1, y: 0 }}
        className={className}
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
