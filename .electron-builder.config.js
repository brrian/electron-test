require('dotenv').config();

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'com.tinynudge.pomello',
  productName: 'Pomello',
  directories: {
    output: 'dist',
    buildResources: 'build',
  },
  files: ['packages/**/dist/**'],
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
