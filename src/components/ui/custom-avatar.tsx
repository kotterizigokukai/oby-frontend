import * as React from "react"
import { cn } from "@/lib/utils"

interface CustomAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'sm' | 'default' | 'lg' | 'xl'
}

const CustomAvatar = React.forwardRef<HTMLDivElement, CustomAvatarProps>(
  ({ className, src, alt = "", size = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      default: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-24 w-24'
    };

    return (
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {src ? (
          <div 
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
            aria-label={alt}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-lg font-medium text-gray-600">
              {alt ? alt.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
        )}
      </div>
    )
  }
)
CustomAvatar.displayName = "CustomAvatar"

export { CustomAvatar }
