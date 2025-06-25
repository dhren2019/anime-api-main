import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'destructive' | 'outline' | 'new'
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
        {
          'bg-yellow-500/10 text-yellow-500': variant === 'new',
          'bg-gray-800 text-white': variant === 'default',
          'bg-green-500/10 text-green-500': variant === 'success',
          'bg-red-500/10 text-red-500': variant === 'destructive',
          'bg-gray-800/10 text-gray-800 border border-gray-800': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}
