const DotEnv = require('dotenv-webpack');
const HtmlWebpack = require('html-webpack-plugin');
const Webpack = require('webpack');
const MiniCssExtractor = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env,argv) => {
    const isDev = argv.mode === 'development';
    return {
        entry : ['babel-polyfill', './src/index.jsx'],
        module : {
            rules: [
                {
                    test : /\.(js|jsx)$/,
                    exclude : /node_modules/,
                    use : {
                        loader : 'babel-loader',
                        options : {
                            presets : ['@babel/preset-env','@babel/preset-react']
                        }
                    }
                },
                {
                    test : /\.css$/,
                    use : [
                        'style-loader',
                        {
                            loader : 'css-loader',
                            options : {
                                sourceMap : isDev ? true : false
                            }
                        }
                    ]
                },
                {
                    test : /\.(jpg|png|svg|gif)$/,
                    use : [
                        {
                            loader : 'file-loader',
                            options : {
                                name : isDev ? '[path][name].[ext]' : 'static/media/[name].[contenthash:4].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve : {
            extensions : ['.js','.jsx'],
            alias : {
                '@' : path.join(__dirname,'src')
            }
        },
        output : {
            filename : 'static/js/bundle.[contenthash:4].js',
            publicPath : '/',
            path : path.join(__dirname,'build'),
            environment : {
                arrowFunction : false,
                module : false,
                const : false,
                forOf : false,
                destructuring : false,
                dynamicImport : false
            }
        },
        // devtool: isDev ? 'cheap-module-source-map' : false, 
        devServer : {
            contentBase : 'public',
            watchContentBase : true,
            hot : true,
            port : 3000,
            historyApiFallback : true,
            writeToDisk: true,
        },
        plugins : [
            new DotEnv(),
            new HtmlWebpack({
                template : path.join(__dirname,'public/index.html')
            }),
            new MiniCssExtractor({
                filename : isDev ? '[name].css' : 'static/css/[contenthash:4].[name].css'
            }),
            new Webpack.ProgressPlugin()
        ]
    }
}