const envProduction = [
  '@babel/preset-env',
  {
    targets: {
      browsers: [
        'Chrome >= 52',
        'FireFox >= 44',
        'Safari >= 8',
        'Explorer 11',
        'last 4 Edge versions'
      ]
    },
    modules: false,
    useBuiltIns: 'usage'
  }
];

const envDevelopment = [
  '@babel/preset-env',
  {
    modules: false
  }
];

module.exports = ({ env }) => {
  const isDev = env() === 'development';

  const presets = [!isDev ? envProduction : envDevelopment, '@babel/preset-react'];

  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ];

  if (isDev) {
    plugins.push('react-hot-loader/babel');
  }

  return {
    presets,
    plugins
  };
};
