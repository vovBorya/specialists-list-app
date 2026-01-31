import FiltersSvg from '@/theme/icons/filters.svg?react';
import UpDownArrowsSvg from '@/theme/icons/up-down-arrows.svg?react';
import HeartOutlineSvg from '@/theme/icons/heart-outline.svg?react';
import ShieldAndCheckSvg from '@/theme/icons/shieldAndCheck.svg?react';
import PortfolioSvg from '@/theme/icons/portfolio.svg?react';
import PersonSvg from '@/theme/icons/person.svg?react';

// Icon registry - add new icons here
export const icons = {
  filters: FiltersSvg,
  upDownArrows: UpDownArrowsSvg,
  heartOutline: HeartOutlineSvg,
  shieldAndCheck: ShieldAndCheckSvg,
  portfolio: PortfolioSvg,
  person: PersonSvg,
} as const;

export type IconName = keyof typeof icons;
