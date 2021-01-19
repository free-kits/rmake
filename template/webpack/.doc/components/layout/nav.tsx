import React from 'react';
import {
    useHistory,
} from 'react-router-dom';
import { generate } from 'shortid';

import getRouteConfig from '../../config';

const NavLi: React.FC<{nav: any}> = ({ nav }) => {
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
export const Nav = () => {
    const navs = [];
    getRouteConfig().forEach((nav) => {
        navs.push(<NavLi nav={nav} key={generate()} />);
    });

    return <ul>{navs}</ul>;
};
