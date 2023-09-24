import { Suspense } from 'react';

// fallback component
export const SuspenseWrapper = ({ children, fallback = <></> }) => {
  
  return <Suspense fallback={fallback}>
    {children}
  </Suspense>;
};
