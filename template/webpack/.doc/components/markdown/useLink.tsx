import React, { ReactElement } from 'react';
import { TagOutlined } from '@ant-design/icons';

import './styles/use-link.less';

// 获取带link的title
export const useLinkTitle = (children: ReactElement) => {
    return React.cloneElement(children, {
        children: (
            <>
                <a href={`#${encodeURIComponent(children.props.id)}`}>
                    <TagOutlined className='md-left-link'/>
                </a>
                {children.props.children}
            </>
        )
    })
}
