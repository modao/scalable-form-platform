import webpack from 'webpack';
import path from 'path';

const developmentEnvironment = 'development';
const productionEnvironment = 'production';

const getPlugins = function (env) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === developmentEnvironment
  };

  const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS) //Tells React to build in prod mode.
  ];

  switch (env) {
    case productionEnvironment:
      break;

    case developmentEnvironment:
      plugins.push(new webpack.HotModuleReplacementPlugin());
      break;
  }

  return plugins;
};

const getLoaders = function (env) {
  const loaders = [{
    test: /\.jsx?$/,
    include: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'demo')
    ],
    use: ['babel-loader', 'eslint-loader']
  }, {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'less-loader'
    ]
  }, {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  }];

  return loaders;
};

function getConfig(env) {
  return {
    mode: env === productionEnvironment ? 'production' : 'development',
    devtool: env === productionEnvironment ? 'source-map' : 'inline-source-map', // more
    entry: {
      'index': [
        path.resolve(__dirname, './src/index.js')
      ],
    },
    target: 'web',
    output: {
      publicPath: '/',
      devtoolModuleFilenameTemplate: "ScalableFormEditor:///[resourcePath]?[hash]",
      devtoolFallbackModuleFilenameTemplate: "ScalableFormEditor:///[resourcePath]?[hash]",
      library: ["ScalableFormEditor"],
      libraryTarget: "umd",
      path: path.join(__dirname, 'build'), // __dirname + '/build',
      filename: '[name].js'
    },
    plugins: getPlugins(env),
    module: {
      rules: getLoaders(env)
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    externals: {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'react-dom/server': {
        root: 'ReactDOMServer',
        commonjs2: 'react-dom/server',
        commonjs: 'react-dom/server',
        amd: 'react-dom/server'
      },
      "antd": {
        root: 'antd',
        commonjs2: 'antd',
        commonjs: 'antd',
        amd: 'antd'
      },
      "moment": {
        root: 'moment',
        commonjs2: 'moment',
        commonjs: 'moment',
        amd: 'moment'
      },
      "scalable-form-core": {
        root: 'ScalableFormCore',
        commonjs2: 'ScalableFormCore',
        commonjs: 'ScalableFormCore',
        amd: 'ScalableFormCore'
      },
      "scalable-form-antd": {
        "root": "ScalableForm",
        "commonjs2": "ScalableForm",
        "commonjs": "ScalableForm",
        "amd": "ScalableForm"
      },
    }
  };
}

const config = getConfig(process.env.NODE_ENV);

module.exports = config;
