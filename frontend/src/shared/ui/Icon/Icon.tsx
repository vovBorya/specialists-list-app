import { memo } from 'react';

import { icons, IconName } from './icons';
import { cn } from '@/shared/lib';
import { Text } from '../Text';
import styles from './Icon.module.css';

interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  badge?: string | number;
  className?: string;
}

const Icon = memo(function Icon({
  name,
  size = 24,
  color = 'currentColor',
  badge,
  className,
}: IconProps) {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    if (import.meta.env.DEV) {
      console.warn(`Icon "${name}" not found`);
    }
    return null;
  }

  return (
    <div className={cn(styles.iconContainer, className)}>
      <SvgIcon width={size} height={size} style={{ color }} />

      {badge !== undefined && badge !== null && (
        <Text as="span" size="xs" weight="semibold" color="inverse" className={styles.badge}>
          {badge}
        </Text>
      )}
    </div>
  );
});

export default Icon;
export type { IconProps, IconName };
