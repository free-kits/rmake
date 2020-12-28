import Config, { Use } from 'webpack-chain';
import { readdirSync } from 'fs-extra';
import { getConfig } from './setting';

const presetBabel = (use: Use, targets: string) => {
    use.loader('babel-loader')
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
        })
        .end();
};

// 查找对应的md的文件, 然后根据文件来生成对应的目录结构信息
export const findFile = () => {
    const dir = readdirSync(process.cwd());
    const mdFiles = dir.filter((file) => file.match(/\.md(x?)$/));
    return mdFiles;
};

export default (config: Config) => {
    const docConfig = getConfig();
    const targets = docConfig.targets || 'defaults';

    presetBabel(config.module
        .rule('babel-mdx')
        .test(/\.md(x?)$/)
        .use('babel-mdx/loader')
        .loader('@mdx-js/loader')
        .end()
        .use('babel-mdx/loader'), targets);

    presetBabel(config.module
        .rule('babel-react')
        .test(/\.ts(x?)$/)
        .use('babel-react/loader')
        .loader('babel-loader'), targets);

    config.module
        .rule('css')
        .test(/\.css$/)
        .use('style-loader')
        .loader('style-loader')
        .end()
        .use('css/loader')
        .loader('css-loader')
        .end();

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
        })
        .end();
};
