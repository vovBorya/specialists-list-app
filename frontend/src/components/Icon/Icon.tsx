import { icons, IconName } from './icons';

import Text from '../Text';

import styles from './Icon.module.css';

type IconProps = {
  name: IconName;
  size?: number | string;
  color?: string;
  badge?: string | number;
}

const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  badge,
}: IconProps) => {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div className={styles.iconContainer}>
      <SvgIcon
        width={size}
        height={size}
        style={{ color }}
      />

      {!!badge && (
        <Text 
          as="span" 
          size={8} 
          weight={600} 
          color="var(--color-text-inverse)" 
          className={styles.badge}
        >
          {badge}
        </Text>
      )}
    </div>
  );
};

export default Icon;
