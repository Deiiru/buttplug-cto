import { motion } from "framer-motion";
import { MousePointer } from "lucide-react";
import { memo } from "react";

interface GMCounterProps {
  count: number;
}

function GMCounter({ count }: GMCounterProps) {
  return (
    <motion.div
      className="bg-card/85 backdrop-blur-sm border border-border rounded-md px-2 py-1.5 shadow z-30"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center gap-1.5">
        <MousePointer className="w-3 h-3 text-muted-foreground" />
        <div>
          <p className="text-[10px] leading-none text-muted-foreground">Your GM clicks</p>
          <motion.p 
            className="text-lg font-extrabold text-foreground"
            animate={{ scale: count > 0 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.2 }}
            key={count}
          >
            {count.toLocaleString()}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(GMCounter);
