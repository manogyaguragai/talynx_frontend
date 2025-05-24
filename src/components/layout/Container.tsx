import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('w-[100%] fixed-width mx-auto px-4 md:px-6', className)} style={{ minWidth: '100%', maxWidth: '100%' }}>
      {children}
    </div>
  );
}