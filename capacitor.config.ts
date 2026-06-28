import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.slayr.fashion',
  appName: 'slayr',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
