module.exports = (api) => {

  const isTargetWeb = api.caller((caller) => caller && caller.target === 'web');
  const targets = isTargetWeb ? {
    esmodules: true
  } : {
    node: 'current'
  };

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: false,
          targets,
        },
      ],
      "@babel/preset-react",
      '@babel/typescript',
    ]
  };
};
