import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    const Component = hover ? motion.div : 'div';

    return (
      <Component
        ref={ref}
        {...(hover && {
          whileHover: { y: -4, scale: 1.01 },
          transition: { duration: 0.2 }
        })}
        className={cn(
          'bg-white rounded-2xl shadow-sm border border-gray-100',
          hover && 'cursor-pointer hover:shadow-lg transition-shadow duration-200',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';
