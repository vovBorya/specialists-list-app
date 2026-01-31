import { ReactNode, memo } from 'react';

import { cn } from '@/shared/lib';
import styles from './Text.module.css';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextColor = 'primary' | 'secondary' | 'muted' | 'inverse' | 'success' | 'danger';

interface TextProps {
  children: ReactNode;
  as?: TextTag;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  className?: string;
}

const Text = memo(function Text({
  children,
  as: Component = 'p',
  size = 'md',
  weight = 'normal',
  color = 'primary',
  className,
}: TextProps) {
  return (
    <Component
      className={cn(
        styles.text,
        styles[`size-${size}`],
        styles[`weight-${weight}`],
        styles[`color-${color}`],
        className
      )}
    >
      {children}
    </Component>
  );
});

export default Text;
export type { TextProps, TextTag, TextSize, TextWeight, TextColor };
