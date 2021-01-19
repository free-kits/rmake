import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation,
    useHistory,
} from 'react-router-dom';
import { generate } from 'shortid';
import { MDXProvider } from '@mdx-js/react';

import { getTitle, getDescription } from '../_util/config';
import { components } from '../markdown';
import { prefixCls } from '../_util/common';
import getRouteConfig from '../../config';

const Sider = React.lazy(() => import('./sider'));

const LoadingFallback = () => {
    const location = useLocation();
    useEffect(() => {
        return () => {
            const name = location.hash;
            const element = self.document.querySelector(`[name='${name}']`);
            if (element) {
                element.scrollIntoView(true);
            }
        }
    }, []);

    return <div />
};

/***
 * 将配置信息转换成为路由信息
 */
const useTransformToRouter = () => {
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

export const useBodyLayout = () => {
    const location = useLocation();
    const history = useHistory();
    const home = (
        <>
            <div className={`${prefixCls}-body-home`}>
                <div>
                    <h1>{getTitle()}</h1>
                    <p>{getDescription()}</p>
                    <button
                        onClick={() => {
                            const configs = getRouteConfig();
                            configs?.[0].menus?.some((menu) => {
                                if (menu.pages) {
                                    history.push(menu.pages[0].path);
                                    return true;
                                } else {
                                    history.push(menu.path);
                                    return true;
                                }
                            });
                        }}
                    >
                        快速上手
                    </button>
                </div>
            </div>
        </>
    );

    const routes = (
        <React.Suspense fallback={<LoadingFallback />}>
            <div className={`${prefixCls}-body-content`}>
                <MDXProvider components={components}>
                    <Switch>
                        {useTransformToRouter()}
                        <Route path="/">
                            {location.pathname === '/' ? home : null}
                        </Route>
                        <Route path="*">{/** 404 页面 */}</Route>
                    </Switch>
                </MDXProvider>
            </div>
        </React.Suspense>
    );

    if (location.pathname !== '/') {
        return (
            <React.Suspense fallback={<LoadingFallback />}>
                <div className={`${prefixCls}-body-sider`}>
                    <Sider />
                </div>
                {routes}
            </React.Suspense>
        );
    }
    return routes;
};
