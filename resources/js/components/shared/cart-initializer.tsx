import React from 'react';

export function CartInitializer({ children }: { children: React.ReactNode }) {
  // No-op initializer. Reserved for future cart rehydration if needed.
  return <>{children}</>;
}

