
import packages from '../../../package.json';

const getConfig = () => packages['@freekits/dt-doc'];

/**
 * 获取项目的title信息
 */
export const getTitle = () => {
    const config = getConfig();
    if (config.title) return config.title;
    return packages.name;
}
