import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/* ---------- Types ---------- */

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    to?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
    to: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ---------- Styles ---------- */

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[#16C7B0] text-white hover:bg-[#13b09c] focus-visible:ring-[#16C7B0]/40',
  secondary:
    'bg-[#101B2D] text-white hover:bg-[#1a2940] focus-visible:ring-[#101B2D]/40',
  outline:
    'border-2 border-[#101B2D] text-[#101B2D] hover:bg-[#101B2D] hover:text-white focus-visible:ring-[#101B2D]/40',
  ghost:
    'text-[#101B2D] hover:bg-gray-100 focus-visible:ring-gray-300',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-2.5',
};

/* ---------- Component ---------- */

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      children,
      className = '',
      ...rest
    } = props;

    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const classes = [
      baseClasses,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </>
    );

    if ('to' in rest && rest.to !== undefined) {
      const { to, ...linkRest } = rest as ButtonAsLink;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={classes}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    const buttonRest = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={loading || (buttonRest as ComponentPropsWithoutRef<'button'>).disabled}
        {...buttonRest}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
