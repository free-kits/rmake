import Config from 'webpack-chain';
import { getConfig } from './setting';

export default (config: Config) => {
    const docConfig = getConfig();
    const targets = docConfig.targets || 'defaults';
    config
        .module
        .rule('babel-mdx')
        .test(/\.md(x?)$/)
        .use('babel-mdx/loader')
        .loader('@mdx-js/loader')
        .end()
        .use('babel-mdx/loader')
        .loader('babel-loader')
        .options({
            presets: [
                ['@babel/preset-env', {
                    targets,
                }],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
        })
        .end()
        .rule('babel-react')
        .test(/\.ts(x?)$/)
        .use('babel-react/loader')
        .loader('babel-loader')
        .options({
            presets: [
                ['@babel/preset-env', {
                    targets,
                }],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
        });
};
