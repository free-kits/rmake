import Config from 'webpack-chain';
import logger from './logger';
import { getConfig } from './setting';

export default (config: Config) => {
    const docConfig = getConfig();
    const targets = docConfig.targets || 'defaults';

    config.module
        .rule('tsReact')
        .test(/\.ts(x?)$/)
        .use('babel-react/loader')
        .loader('babel-loader')
        .options({
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets,
                    },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
        });
    config.module
        .rule('css')
        .test(/\.css$/)
        .use('style-loader')
        .loader('style-loader')
        .end()
        .use('css/loader')
        .loader('css-loader');

    config.module
        .rule('url-loader')
        .test(/\.(png|jpg|gif|svg)$/i)
        .use('url-loader')
        .loader('url-loader');

    config.module
        .rule('less')
        .test(/\.less$/)
        .use('style-loader')
        .loader('style-loader')
        .end()
        .use('css/loader')
        .loader('css-loader')
        .end()
        .use('less/loader')
        .loader('less-loader')
        .options({
            lessOptions: {
                javascriptEnabled: true,
            },
        });

    config.module
        .rule('mdx')
        .test(/\.md(x?)$/)
        .use('babel/loader')
        .loader('babel-loader')
        .options({
            presets: ['@babel/preset-react'],
        })
        .end()
        .use('babel-mdx/loader')
        .loader('@mdx-js/loader');

    logger.debug(JSON.stringify(config.toConfig()));
};
