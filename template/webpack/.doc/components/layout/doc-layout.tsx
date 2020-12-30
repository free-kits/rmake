import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import { prefixCls } from '../_util/common';
import getRouteConfig from '../../config';
import './style/doc-layout.less';

export interface Menu {
    // 菜单信息
    title: string
    // 路由信息
    route: string
}

export interface DocLayoutProps {
    menus: Menu[]
}

export const DocLayout = ({
    menus
}: DocLayoutProps) => {
    return (
        <Router>
            <div className={`${prefixCls}-layout`}>
                <header className={`${prefixCls}-header`}></header>
                <div className={`${prefixCls}-body`}>
                    <div className={`${prefixCls}-body-sider`}>
                        <ul>
                            {menus?.map(menu => (
                                <li
                                    onClick={() => {
                                    }}
                                >
                                    {menu.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`${prefixCls}-body-content`}>
                        <Switch>
                            {getRouteConfig()}
                            <Route path="*">
                                {/** 404 页面 */}
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
};
