import type { ReactNode, HTMLAttributes } from 'react';

/* ---------- Card ---------- */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const paddingMap: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  hover = false,
  padding = 'none',
  className = '',
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-xl shadow-sm border border-gray-100',
        paddingMap[padding],
        hover ? 'transition-shadow hover:shadow-md' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ---------- CardHeader ---------- */

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className = '', children, ...rest }: CardSectionProps) {
  return (
    <div
      className={`px-6 py-4 border-b border-gray-100 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ---------- CardContent ---------- */

export function CardContent({ className = '', children, ...rest }: CardSectionProps) {
  return (
    <div className={`px-6 py-5 ${className}`} {...rest}>
      {children}
    </div>
  );
}

/* ---------- CardFooter ---------- */

export function CardFooter({ className = '', children, ...rest }: CardSectionProps) {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-100 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
