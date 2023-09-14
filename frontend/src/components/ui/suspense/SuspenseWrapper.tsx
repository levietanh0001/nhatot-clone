import { Suspense } from "react";

// fallback component
export const SuspenseWrapper = ({ children, fallback = <h1>Loading...</h1> }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};