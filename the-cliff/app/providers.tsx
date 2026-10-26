"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user": visitors with reduced motion get opacity fades only.
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
