import Config from 'webpack-chain';
import { ProxyConfigArray, ProxyConfigMap } from 'webpack-dev-server';

export interface DevServer {

    // 启动的端口号 默认: 3000
    port: number

    // 是否启动https
    https: boolean

    // webpack的代理信心
    proxy: ProxyConfigMap | ProxyConfigArray | undefined
}

export class DocConfig {
    /**
     * 设置当前项目的兼容性
     */
    targets?: string

    /**
     * 配置开发服务器
     */
    devServer?: DevServer

    /**
     * 通过此方法来进行对webpack的深度定制
     */
    webpackChain?: (config: Config) => void
}

export const getConfig = (): DocConfig => new DocConfig();
