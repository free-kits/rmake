import Config from 'webpack-chain';
import { join } from 'path';
import { copySync } from 'fs-extra';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';

import presetEntry from './entry';
import presetMDX from './mdx';
import presetPlugin from './plugin';
import { createRouteConfig } from './router';

export const copyFileDoc = () => {
    const toPathDir = join(process.cwd(), '.doc');
    // if (existsSync(toPathDir)) {
    //     removeSync(toPathDir);
    // }
    copySync(
        join(__dirname, '..', '..', 'template', 'webpack', '.doc'),
        toPathDir,
    );
    createRouteConfig();
};

// 启动开发服务器
export const devServer = async () => {
    copyFileDoc();
    const config = new Config();
    presetEntry(config);
    presetMDX(config);
    await presetPlugin(config);
    config.mode('development');
    config.devtool('cheap-module-source-map');
    config.output.publicPath('/');
    const compiler = Webpack(config.toConfig());

    const packages = await import(join(process.cwd(), 'package.json'));
    const devServerConfig = packages['@free-kits/config'].devServer || {};

    const webpackDevServer = new WebpackDevServer(compiler, {
        stats: 'errors-only',
        https: devServerConfig?.https,
        proxy: devServerConfig?.proxy,
        historyApiFallback: true,
    });
    webpackDevServer.listen(devServerConfig?.port || 3000, () => {});
};

// 编译Webpack文件
export const compiler = async () => {
    copyFileDoc();
    const config = new Config();
    presetEntry(config);
    presetMDX(config);
    await presetPlugin(config);
    config.mode('production');
    config.output.filename('[name].bundle.js');
    config.output.path(join(process.cwd(), 'dist'));
    config.optimization.splitChunks({
        chunks: 'all',
    });
    const compilerWebpck = Webpack(config.toConfig());
    compilerWebpck.run(() => {
    });
};
