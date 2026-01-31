/**
 * Utility function to conditionally join class names together.
 * Filters out falsy values (false, null, undefined, '').
 *
 * @example
 * cn('base', isActive && 'active', className)
 * // => 'base active className' (if isActive is true)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
