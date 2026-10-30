import type { ElementType, ReactNode } from 'react';
import Button from './Button';

interface EmptyStateProps {
  icon: ElementType;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionTo?: string;
  children?: ReactNode;
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionTo,
  children,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-[#16C7B0]/10 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-[#16C7B0]" />
      </div>

      <h3 className="text-lg font-semibold text-[#101B2D] mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      )}

      {actionLabel && (onAction || actionTo) && (
        <Button
          variant="primary"
          size="sm"
          onClick={onAction}
          {...(actionTo ? { to: actionTo } : {})}
        >
          {actionLabel}
        </Button>
      )}

      {children}
    </div>
  );
}
