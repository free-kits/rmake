import Config from 'webpack-chain';
import { join } from 'path';
import * as WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import presetEntry from './entry';
import presetMDX from './mdx';

// 启动开发服务器
export const devServer = () => {
    const config = new Config();
    presetEntry(config);
    presetMDX(config);
    const compiler = Webpack(config.toConfig());
    const webpackDevServer = new WebpackDevServer(compiler, {
        stats: 'errors-only',
    });
    webpackDevServer.listen(3000, () => {
    });
};

// 编译Webpack文件
export const compiler = async () => new Promise<void>((resolve, reject) => {
    try {
        const config = new Config();
        presetEntry(config);
        presetMDX(config);
        config.mode('production');
        config.output.filename('[name].bundle.js');
        config.output.path(join(process.cwd(), 'dist'));
        const compilerWebpck = Webpack(config.toConfig());
        compilerWebpck.run(() => {
            resolve();
        });
    } catch (error) {
        reject(error);
    }
});
