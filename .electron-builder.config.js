require('dotenv').config();

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: process.env.VITE_APP_ID,
  productName: 'Pomello',
  directories: {
    output: 'dist',
    buildResources: 'build',
  },
  files: ['processes/**/dist/**', 'build/icons/**'],
  linux: {
    category: 'Utility',
    synopsis: 'The Pomodoro App for Doers',
    icon: 'icons',
  },
  mac: {
    hardenedRuntime: true,
    entitlements: './build/entitlements.mac.plist',
  },
  afterSign: 'electron-builder-notarize',
  generateUpdatesFilesForAllChannels: true,
  publish: {
    provider: 's3',
    bucket: process.env.S3_RELEASE_BUCKET,
    acl: 'private',
  },
};

module.exports = config;
