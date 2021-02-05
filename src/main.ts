#!/usr/bin/env node

import chokidar from 'chokidar';
import { join } from 'path';
import inquirer from 'inquirer';
import handlebars from 'handlebars';
import {
    copySync,
    readFileSync,
    writeFileSync,
    existsSync,
} from 'fs-extra';

import validateNpmName from 'validate-npm-package-name';
import { compiler, devServer, copyFileDoc } from './config/server';

// 创建项目
if (process.argv.length === 2) {
    (async () => {
        // 获得用户输入的信息
        const info = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Package Name',
            validate: (name) => name && validateNpmName(name).validForNewPackages,
        }, {
            type: 'input',
            name: 'title',
            message: 'Project title',
        }, {
            type: 'input',
            name: 'description',
            message: 'Package Description',
        }, {
            type: 'input',
            name: 'license',
            message: 'License',
            default: 'MIT',
        }]);

        // 复制文件到指定目录
        copySync(
            join(__dirname, '..', 'template', 'cli'),
            process.cwd(),
        );
        const targetPackage = join(process.cwd(), 'package.json');
        const template = handlebars.compile(readFileSync(targetPackage, 'utf8'));
        const content = template({
            ...info,
        });
        writeFileSync(targetPackage, content, 'utf8');
    })();
}

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
    const liveScope = join(process.cwd(), 'src', 'live-scope.ts');
    if (!existsSync(liveScope)) {
        writeFileSync(liveScope, 'export default {};\n');
    }

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
