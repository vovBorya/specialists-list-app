/**
 * Application-wide constants
 */

export const FILTER_DEFAULTS = {
  AGE_MIN: 22,
  AGE_MAX: 55,
  PRICE_MIN: 800,
  PRICE_MAX: 2800,
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  INFINITE_SCROLL_THRESHOLD: '100px',
} as const;

export const DEBOUNCE_DELAY = {
  FILTERS: 500,
} as const;

export const TOAST_DURATION = {
  DEFAULT: 3000,
  LONG: 5000,
} as const;
