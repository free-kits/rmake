import Config from 'webpack-chain';
import { join } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import WebpackDevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import { getConfig } from './setting';

import presetEntry from './entry';
import presetMDX from './mdx';
import presetPlugin from './plugin';

const copyFileDoc = () => {
    const toPathDir = join(process.cwd(), '.doc');

    if (!existsSync(toPathDir)) {
        mkdirSync(toPathDir);
    }

    copyFileSync(
        join(__dirname, '..', '..', 'template', 'webpack', '.doc', 'entry.tsx'),
        join(toPathDir, 'entry.tsx'),
    );
};

// 启动开发服务器
export const devServer = () => {
    copyFileDoc();
    const docConfig = getConfig();
    const config = new Config();
    presetEntry(config);
    presetMDX(config);
    presetPlugin(config);
    const compiler = Webpack(config.toConfig());
    const { devServer: devServerConfig } = docConfig;
    const webpackDevServer = new WebpackDevServer(compiler, {
        stats: 'errors-only',
        https: devServerConfig?.https,
        proxy: devServerConfig?.proxy,
    });
    webpackDevServer.listen(devServerConfig?.port || 3000, () => {
    });
};

// 编译Webpack文件
export const compiler = async () => new Promise<void>((resolve, reject) => {
    try {
        copyFileDoc();
        const config = new Config();
        presetEntry(config);
        presetMDX(config);
        presetPlugin(config);
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
