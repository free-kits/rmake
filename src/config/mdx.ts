import Config from 'webpack-chain';

export default (config: Config) => {
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
                    targets: 'defaults and not ie 11 and last 2 versions',
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
                    targets: 'defaults and not ie 11 and last 2 versions',
                }],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
        });
};
