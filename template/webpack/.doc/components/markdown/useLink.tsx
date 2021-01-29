import React, { ReactElement } from 'react';
import { BsLink45Deg } from 'react-icons/bs';

import './styles/use-link.less';

// 获取带link的title
export const useLinkTitle = (children: ReactElement) => {
    return React.cloneElement(children, {
        children: (
            <>
                <a href={`#${encodeURIComponent(children.props.id)}`}>
                    <BsLink45Deg className='md-left-link'/>
                </a>
                {children.props.children}
            </>
        )
    })
}
