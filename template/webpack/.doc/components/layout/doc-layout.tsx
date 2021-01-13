import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    useHistory,
} from 'react-router-dom';
import { generate } from 'shortid';
import { prefixCls } from '../_util/common';
import { getTitle } from '../_util/config';
import getRouteConfig from '../../config';
import './style/doc-layout.less';

export interface Menu {
    // 菜单信息
    title: string;
    // 路由信息
    route: string;
}

const LoadingFallback = () => <div></div>;

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

const SiderLi: React.FC = ({ title, path }) => {
    const history = useHistory();
    const location = useLocation();
    return (
        <li
            className={
                location.pathname === path ? `${prefixCls}-body-select` : ''
            }
            onClick={() => {
                history.push(path);
            }}
        >
            <a>{title}</a>
        </li>
    );
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
                menuDom.push(
                    <SiderLi
                        title={page.title}
                        path={page.path}
                        key={generate()}
                    />,
                );
            });
        } else {
            menuDom.push(
                <SiderLi
                    title={menu.title}
                    path={menu.path}
                    key={generate()}
                />,
            );
        }
    });
    return <ul>{menuDom}</ul>;
};

const NavLi: React.FC = ({ nav }) => {
    const history = useHistory();
    return (
        <li
            onClick={() => {
                nav.menus?.some((menu) => {
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
            <div>
                <a>{nav.title}</a>
            </div>
        </li>
    );
};

/**
 * 获取菜单的头部信息
 */
const Nav = () => {
    const navs = [];
    getRouteConfig().forEach((nav) => {
        navs.push(<NavLi nav={nav} key={generate()} />);
    });

    return <ul>{navs}</ul>;
};

const Title = () => {
    const history = useHistory();
    return (
        <div>
            <h1>
                <a
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    {getTitle()}
                </a>
            </h1>
        </div>
    );
};

const useBodySider = () => {
    const location = useLocation();
    const home = (
        <>
            <div className={`${prefixCls}-body-home`}>

            </div>
        </>
    )

    const routes = (
        <React.Suspense fallback={<LoadingFallback />}>
            <div className={`${prefixCls}-body-content`}>
                <Switch>
                    {transformToRouter()}
                    <Route path="/">
                        {location.pathname === '/' ? home: null}
                    </Route>
                    <Route path="*">{/** 404 页面 */}</Route>
                </Switch>
            </div>
        </React.Suspense>
    );

    if (location.pathname !== '/') {
        return (
            <>
                <div className={`${prefixCls}-body-sider`}>
                    <Sider />
                </div>
                {routes}
            </>
        );
    }
    return routes;
};

const DocLayout = () => {
    return (
        <div className={`${prefixCls}-layout`}>
            <header className={`${prefixCls}-header`}>
                <Title />
                <Nav />
            </header>
            <div className={`${prefixCls}-body`}>{useBodySider()}</div>
        </div>
    );
};

export const DocRouter = () => {
    return (
        <Router>
            <DocLayout />
        </Router>
    );
};
