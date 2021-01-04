import {
    readdirSync, readFileSync, writeFileSync, statSync, Stats,
} from 'fs-extra';
import yaml from 'js-yaml';
import { join } from 'path';

import logger from './logger';

interface Page {
    // 标题信息
    title: string
    // 路径信息
    path: string
}

interface Group {
    // 标题
    title: string
    // 当前的页面信息
    pages: Page[]
}

interface Nav {
    // 标题
    title: string
    // 分组信息
    group: Group[]
}

// 递归获取文件目录
export const findRecursionFiles = (path: string, callback: (file: string, stats:Stats) => void) => {
    const dir = readdirSync(path);
    dir.forEach((file) => {
        if (['node_modules'].includes(file)) {
            return;
        }
        const realFile = join(path, file);
        logger.debug(realFile);
        const stat = statSync(realFile);
        if (stat.isDirectory()) {
            findRecursionFiles(realFile, callback);
        } else {
            callback(realFile, stat);
        }
    });
};

// 查找对应的md的文件, 然后根据文件来生成对应的目录结构信息, 应该采用递归的方式进行获取
export const findFile = () => {
    const mdFiles: string[] = [];
    findRecursionFiles(process.cwd(), (path) => {
        if (path.match(/\.md(x?)$/)) {
            mdFiles.push(path);
        }
    });
    return mdFiles;
};

// 找到当前的路由信息，并生成navs信息
export const findFileToNavs = () => {
    const files = findFile();
    logger.debug('find md files.', files);
    const navs: Nav[] = [];
    files.forEach((file) => {
        const mdInfo = /^<!--+[\W\w]+?--+>/i.exec(readFileSync(file, 'utf8'));
        logger.debug('get markdown params', mdInfo);
        if (mdInfo?.length && mdInfo?.length > 0) {
            /**
             * 数据格式如下
             * nav:
             *  title: 组件
             * group:
             *  title: 基础组件
             * title: Button 按钮`;
             */
            const yml: any = yaml.safeLoad(mdInfo[0].replace(/<!--+/g, '').replace(/--+>/g, ''));
            const filterNav = navs.filter((ele) => ele.title === yml.nav.title);
            // 不存在对应的nav信息，则添加
            const groupInfo = {
                title: yml.group.title as string,
                path: yml.group.path as string,
                pages: [{
                    title: yml.title as string,
                    component: `/*@freekits/doc import*/..${file.replace(process.cwd(), '')}/*@freekits/doc import-end*/`,
                    path: `/${/[0-9a-zA-Z/_]+/g.exec(file.replace(join(process.cwd(), 'src'), ''))![0]}`,
                }],
            };
            if (navs.filter((ele) => ele.title === yml.nav.title).length === 0) {
                navs.push({
                    title: yml.nav.title as string,
                    group: [groupInfo],
                });
            } else {
                const groupFilter = filterNav[0].group.filter((group) => group.title === yml.group.title);
                if (groupFilter.length === 0) {
                    groupFilter.push(groupInfo);
                } else {
                    groupFilter[0].pages.push(groupInfo.pages[0]);
                }
            }
        }
    });
    return navs;
};

// 生成对应的文件信息
export const createRouteConfig = () => {
    const navs = findFileToNavs();
    logger.debug('create route config ->', JSON.stringify(navs));
    const code = JSON.stringify(navs).replace(/"/g, '\'')
        .replace(/'\/\*@freekits\/doc\s+import\*\//g, 'React.lazy(() => import(\'')
        .replace(/\/\*@freekits\/doc\s+import-end\*\/'/g, '\'))')
        .replace(/\s*\\\\/g, '/');
    writeFileSync(join(process.cwd(), '.doc', 'config.ts'), `import React from 'react';\nexport default () => ${code}`);
};
