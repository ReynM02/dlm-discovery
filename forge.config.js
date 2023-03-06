module.exports = {
  packagerConfig: {
    icon: './src/images/SVLICON'
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'ReynM02',
          name: 'dlm-discovery'
        },
        prerelease: true,
        authToken: "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"
      }
    }
  ],
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
