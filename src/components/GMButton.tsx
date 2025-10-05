import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useThrottle } from "@/lib/utils";

type GMButtonProps = {
  onClick?: () => void;
  size?: "default" | "sm" | "lg" | "xl";
  children?: React.ReactNode;
};

export default function GMButton({ 
  onClick, 
  size = "xl",
  children = "GM"
}: GMButtonProps) {
  const throttledClick = useThrottle(() => onClick?.(), 200);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <Button
        variant="gm"
        size={size}
        onClick={throttledClick}
        className="shadow-lg hover:shadow-xl transition-all duration-200 no-select"
        aria-label="Click to say GM and create effects"
      >
        {children}
      </Button>
    </motion.div>
  );
}
