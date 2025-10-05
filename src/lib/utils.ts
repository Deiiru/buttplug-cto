import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Global click counter functions
const GLOBAL_CLICKS_KEY = 'buttplug-cto-global-clicks';

export function getGlobalClicks(): number {
  if (typeof window === 'undefined') return 42069;
  try {
    const saved = localStorage.getItem(GLOBAL_CLICKS_KEY);
    return saved ? parseInt(saved, 10) : 42069;
  } catch {
    return 42069;
  }
}

export function incrementGlobalClicks(): number {
  if (typeof window === 'undefined') return 42069;
  try {
    const current = getGlobalClicks();
    const newCount = current + 1;
    localStorage.setItem(GLOBAL_CLICKS_KEY, newCount.toString());
    return newCount;
  } catch {
    return 42069;
  }
}

// Utility functions for components
export function getRandomPosition(maxX: number, maxY: number) {
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return Promise.resolve(true);
    } catch (err) {
      textArea.remove();
      return Promise.resolve(false);
    }
  }
}

// Throttle hook
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      return callback(...args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        callback(...args);
      }, delay - (now - lastCall));
    }
  }) as T;
}

// Text validation and sanitization
export function validateGMInput(text: string): boolean {
  return text.length > 0 && text.length <= 100 && /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(text);
}

export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 100); // Limit length
}
