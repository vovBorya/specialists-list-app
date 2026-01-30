import { ReactNode, CSSProperties, FC } from 'react';
import styles from './Text.module.css';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
type TextWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TextSize = 14 | 16 | 20 | 24 | 28 | 32 | 40;

type TextProps = {
  children: ReactNode;
  size?: TextSize | number;
  color?: string;
  weight?: TextWeight;
  as?: TextTag;
  className?: string;
  style?: CSSProperties;
};

// Size mapping for each tag (in pixels)
const TAG_SIZES: Record<TextTag, number> = {
  h1: 40,
  h2: 32,
  h3: 28,
  h4: 24,
  h5: 20,
  h6: 16,
  p: 16,
  span: 14,
};

// Predefined sizes that have CSS classes
const PREDEFINED_SIZES: TextSize[] = [14, 16, 20, 24, 28, 32, 40];

// Find the nearest tag based on provided size
const findNearestTag = (size: number): TextTag => {
  const tags: TextTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];
  
  let nearestTag: TextTag = 'p';
  let minDiff = Infinity;

  for (const tag of tags) {
    const diff = Math.abs(TAG_SIZES[tag] - size);
    if (diff < minDiff) {
      minDiff = diff;
      nearestTag = tag;
    }
  }

  return nearestTag;
};

const Text: FC<TextProps> = ({
  children,
  size,
  color,
  weight,
  as,
  className = '',
  style,
}) => {
  // Determine the tag to use
  let Tag: TextTag;
  
  if (as) {
    Tag = as;
  } else if (size !== undefined) {
    Tag = findNearestTag(size);
  } else {
    Tag = 'p';
  }

  // Build class names
  const classNamesList: string[] = [styles.text, styles[`text${Tag.charAt(0).toUpperCase()}${Tag.slice(1)}`]];

  // Add size class if it's a predefined size
  if (size !== undefined && PREDEFINED_SIZES.includes(size as TextSize)) {
    classNamesList.push(styles[`textSize${size}`]);
  }

  // Add weight class
  if (weight !== undefined) {
    classNamesList.push(styles[`textWeight${weight}`]);
  }

  if (className) {
    classNamesList.push(className);
  }

  // Build inline styles only for dynamic values
  const inlineStyles: CSSProperties = { ...style };

  // Use inline style only for custom (non-predefined) sizes
  if (size !== undefined && !PREDEFINED_SIZES.includes(size as TextSize)) {
    inlineStyles.fontSize = `${size}px`;
  }

  // Color needs to be inline since it can be any value
  if (color) {
    inlineStyles.color = color;
  }

  const hasInlineStyles = Object.keys(inlineStyles).length > 0;

  return (
    <Tag
      className={classNamesList.join(' ')}
      style={hasInlineStyles ? inlineStyles : undefined}
    >
      {children}
    </Tag>
  );
};

export default Text;
export type { TextTag, TextWeight, TextSize, TextProps };
