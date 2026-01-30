import type { CapacitorConfig } from '@capacitor/cli';

// Set to true to enable live reload during development
const useLiveReload = true;

const config: CapacitorConfig = {
  appId: 'com.specialists.app',
  appName: 'Specialists',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Live reload: point to your dev server (your Mac's IP)
    ...(useLiveReload && {
      url: 'http://localhost:5173',
      cleartext: true,
    }),
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false,
    },
  },
};

export default config;
