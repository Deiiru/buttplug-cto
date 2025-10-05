import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type NotificationProps = {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'success' | 'info' | 'warning';
};

export default function Notification({ 
  message, 
  isVisible, 
  onClose, 
  duration = 3000,
  type = 'success'
}: NotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const bgColor = {
    success: 'bg-green-600 dark:bg-green-700',
    info: 'bg-blue-600 dark:bg-blue-700', 
    warning: 'bg-yellow-600 dark:bg-yellow-700'
  }[type];

  const borderColor = {
    success: 'border-green-500',
    info: 'border-blue-500',
    warning: 'border-yellow-500'
  }[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, y: -50, x: 50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -50, x: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div 
            className={`
              ${bgColor} ${borderColor}
              text-white px-6 py-4 rounded-lg shadow-lg border-2
              max-w-sm terminal-text text-sm font-medium
            `}
          >
            <div className="flex items-center gap-3">
              {type === 'success' && <span className="text-lg">✅</span>}
              {type === 'info' && <span className="text-lg">ℹ️</span>}
              {type === 'warning' && <span className="text-lg">⚠️</span>}
              
              <div className="flex-1">
                <p className="break-all leading-relaxed">
                  {message}
                </p>
              </div>
              
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors ml-2 text-lg"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
