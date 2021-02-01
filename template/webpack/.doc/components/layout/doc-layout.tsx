import React from 'react';
import {
    BrowserRouter as Router,
    useHistory,
} from 'react-router-dom';

import { prefixCls } from '../_util/common';
import { Nav } from './nav';
import { getTitle } from '../_util/config';
import { useBodyLayout } from './body';

import './style/doc-layout.less';

export interface Menu {
    // 菜单信息
    title: string;
    // 路由信息
    route: string;
}

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

const DocLayout = () => {
    return (
        <div className={`${prefixCls}-layout`}>
            <header className={`${prefixCls}-header`}>
                <Title />
                <Nav />
            </header>
            <div className={`${prefixCls}-body`}>{useBodyLayout()}</div>
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
