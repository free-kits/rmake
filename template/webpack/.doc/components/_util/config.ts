
import packages from '../../../package.json';
import getRouteConfig from '../../config';

const getConfig = () => packages['@free-kits/config'];

/**
 * 获取项目的title信息
 */
export const getTitle = () => {
    const config = getConfig();
    if (config.title) return config.title;
    return packages.name;
}

// 获取资源信息
export const getRepository = () => packages.repository

/**
 * 获取项目的描述信息
 */
export const getDescription = () => {
    const config = getConfig();
    if (config.description) return config.description;
    return packages.description;
}

/**
 * 获得当前所有的路径信息
 */
export const getAllPath = () => {
    const configs = getRouteConfig();
    const paths = [];
    configs.forEach((ele) => {
        const menus = ele.menus || [];
        menus.forEach((menu) => {
            if (menu.pages) {
                menu.pages.forEach((page) => {
                    paths.push(page.path);

                });
            } else {
                paths.push(menu.path);
            }
        });
    });
    return paths;
}
