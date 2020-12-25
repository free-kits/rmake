#!/usr/bin/env node
import { compiler, devServer } from './config/server';

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

// 启动项目开发
if (param === 'dev') {
    devServer();
} else if (param === 'build') {
    compiler();
}
