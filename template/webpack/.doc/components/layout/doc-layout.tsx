import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from 'react-router-dom';
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

const LoadingFallback = () => <div>Loading...</div>;

/***
 * 将配置信息转换成为路由信息
 */
const transformToRouter = () => {
    const configs = getRouteConfig();
    const routers = [];
    configs.forEach((ele) => {
        const menus = ele.menus || [];
        menus.forEach((menu) => {
            if (menu.pages) {
                menu.pages.forEach((page) => {
                    const RouteComponent = page.component;
                    routers.push(
                        <Route
                            path={page.path}
                            key={generate()}
                            render={(props) => <RouteComponent {...props} />}
                        />,
                    );
                });
            } else {
                const RouteComponent = menu.component;
                routers.push(
                    <Route
                        path={menu.path}
                        key={generate()}
                        render={(props) => <RouteComponent {...props} />}
                    />,
                );
            }
        });
    });
    return routers;
};

/**
 * 转换当前的导航信息
 */
const Sider = () => {
    const location = useLocation();
    let currentNav;

    getRouteConfig().forEach((nav) => {
        const pathname = location.pathname;
        nav.menus?.some((menu) => {
            if (menu.pages) {
                return menu.pages.some((page) => {
                    if (page.path === pathname) {
                        currentNav = nav;
                        return true;
                    }
                    return false;
                });
            } else {
                if (menu.path === pathname) {
                    currentNav = nav;
                    return true;
                }
            }
        });
    });

    const menuDom = [];
    currentNav?.menus?.forEach((menu) => {
        if (menu.pages) {
            menuDom.push(<div key={generate()}>{menu.title}</div>);
            menu.pages.forEach((page) => {
                menuDom.push(<li key={generate()}>{page.title}</li>);
            });
        } else {
            menuDom.push(<li key={generate()}>{menu.title}</li>);
        }
    });
    return <>{menuDom}</>;
};

export const DocLayout = () => {
    return (
        <Router>
            <div className={`${prefixCls}-layout`}>
                <header className={`${prefixCls}-header`}></header>
                <div className={`${prefixCls}-body`}>
                    <div className={`${prefixCls}-body-sider`}>
                        <ul>
                            <Sider />
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
