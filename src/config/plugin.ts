import Config from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (config: Config) => {
    config.plugin('html-webpack-plugin').use(new HtmlWebpackPlugin());
};
