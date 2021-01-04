import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { generate } from 'shortid';

import { prefixCls } from '../_util/common';
import getRouteConfig from '../../config';
import './style/doc-layout.less';

export interface Menu {
    // 菜单信息
    title: string;
    // 路由信息
    route: string;
}

export interface DocLayoutProps {
    menus: Menu[];
}

const LoadingFallback = () => <div>Loading...</div>;

export const DocLayout = ({ menus }: DocLayoutProps) => {
    /***
     * 将配置信息转换成为路由信息
     */
    const transformToRouter = () => {
        const configs = getRouteConfig();
        const routers = [];
        configs.forEach((ele) => {
            const groups = ele.group || [];
            groups.forEach((group) => {
                group.pages.forEach((page) => {
                    const RouteComponent = page.component;
                    routers.push(
                        <Route
                            path={page.path}
                            key={generate()}
                            render={(props) => <RouteComponent {...props}/> }
                        />,
                    );
                });
            });
        });
        return routers;
    };
    return (
        <Router>
            <div className={`${prefixCls}-layout`}>
                <header className={`${prefixCls}-header`}></header>
                <div className={`${prefixCls}-body`}>
                    <div className={`${prefixCls}-body-sider`}>
                        <ul>
                            {menus?.map((menu) => (
                                <li onClick={() => {}}>{menu.title}</li>
                            ))}
                        </ul>
                    </div>
                    <React.Suspense fallback={<LoadingFallback />}>
                        <div className={`${prefixCls}-body-content`}>
                            <Switch>
                                {transformToRouter()}
                                <Route path="*">{/** 404 页面 */}</Route>
                            </Switch>
                        </div>
                    </React.Suspense>
                </div>
            </div>
        </Router>
    );
};
