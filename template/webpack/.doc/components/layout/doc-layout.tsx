import React from 'react';
import { prefixCls } from '../_util/common';
import './style/doc-layout.less';

export const DocLayout = () => {
    return (
        <>
            <header className={`${prefixCls}-header`}></header>
            <div className={`${prefixCls}-body`}>
                <div className={`${prefixCls}-body-sider`}>
                    <ul>
                        <li>咖啡</li>
                        <li>茶</li>
                        <li>牛奶</li>
                    </ul>
                </div>
                <div className={`${prefixCls}-body-content`}></div>
            </div>
        </>
    );
};
