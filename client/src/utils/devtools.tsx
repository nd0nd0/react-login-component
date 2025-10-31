import { useEffect } from 'react';

/**
 * Development helper hook for React DevTools debugging
 * Only active in development mode
 */
export const useDevToolsDebug = (componentName: string, data: any) => {
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.group(`🔍 ${componentName} Debug Info`);
      console.log('Current data:', data);
      console.log('Timestamp:', new Date().toISOString());
      console.groupEnd();
    }
  });
};

/**
 * Component wrapper for easier DevTools identification
 */
export const DevToolsWrapper: React.FC<{
  name: string;
  children: React.ReactNode;
}> = ({ name, children }) => {
  // This wrapper helps identify components in React DevTools
  return <div data-testid={`devtools-${name.toLowerCase()}`}>{children}</div>;
};

/**
 * Performance monitor for React DevTools Profiler
 */
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    if (import.meta.env.DEV && 'performance' in window) {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`⚡ ${componentName} render time: ${endTime - startTime}ms`);
      };
    }
  });
};

export default {
  useDevToolsDebug,
  DevToolsWrapper,
  usePerformanceMonitor,
};