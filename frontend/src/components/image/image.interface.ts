


export interface IIMage {
  src: string;
  width: string;
  height: string;
  alt?: string;
  fallbackImageUrl?: string;
  lazyLoading?: boolean;
  variant?: 'circular' | 'rectangular';
  reserverSpace?: boolean;
  // onError: ReactEventHandler<HTMLImageElement>; 
}