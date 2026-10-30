import { forwardRef } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

/* ---------- Shared wrapper ---------- */

interface FieldWrapperProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
}

function FieldWrapper({ label, htmlFor, error, helperText, children, className = '' }: FieldWrapperProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-[#101B2D]"
        >
          {label}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

/* ---------- Base classes ---------- */

const baseInputClasses =
  'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#101B2D] placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#16C7B0]/40 focus:border-[#16C7B0] disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed';

const borderClasses = (error?: string) =>
  error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300';

/* ---------- Input ---------- */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, wrapperClassName, className = '', id, ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <FieldWrapper
        label={label}
        htmlFor={inputId}
        error={error}
        helperText={helperText}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          id={inputId}
          className={`${baseInputClasses} ${borderClasses(error)} ${className}`}
          aria-invalid={!!error}
          {...rest}
        />
      </FieldWrapper>
    );
  },
);
Input.displayName = 'Input';

/* ---------- Textarea ---------- */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, wrapperClassName, className = '', id, ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <FieldWrapper
        label={label}
        htmlFor={inputId}
        error={error}
        helperText={helperText}
        className={wrapperClassName}
      >
        <textarea
          ref={ref}
          id={inputId}
          className={`${baseInputClasses} ${borderClasses(error)} min-h-[100px] resize-y ${className}`}
          aria-invalid={!!error}
          {...rest}
        />
      </FieldWrapper>
    );
  },
);
Textarea.displayName = 'Textarea';

/* ---------- Select ---------- */

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, wrapperClassName, className = '', id, ...rest }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <FieldWrapper
        label={label}
        htmlFor={inputId}
        error={error}
        helperText={helperText}
        className={wrapperClassName}
      >
        <select
          ref={ref}
          id={inputId}
          className={`${baseInputClasses} ${borderClasses(error)} appearance-none bg-[right_0.75rem_center] bg-no-repeat bg-[length:1rem] ${className}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          }}
          aria-invalid={!!error}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  },
);
Select.displayName = 'Select';

export default Input;
