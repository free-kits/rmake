#!/usr/bin/env node

import chokidar from 'chokidar';
import { join } from 'path';
import { compiler, devServer, copyFileDoc } from './config/server';

// 校验当前的参数是否正确
if (
    process.argv.length !== 3
    && (process.argv[2] === 'dev' || process.argv[2] === 'build')
) {
    throw new Error(
        `Incorrect parameter format. ${JSON.stringify(process.argv)}`,
    );
}

const param = process.argv[2];

(async () => {
// 启动项目开发
    if (param === 'dev') {
        chokidar.watch(join(__dirname, '..', 'template', 'webpack', '.doc')).on('all', (eventName) => {
            if (eventName === 'change') {
                copyFileDoc();
            }
        });
        await devServer();
    } else if (param === 'build') {
        await compiler();
    }
})();
