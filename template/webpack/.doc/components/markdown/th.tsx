import React from 'react';
import './styles/th.less';

export default ({
    children
}) => {
    return (
        <th className='md-th'>
            {children}
        </th>
    );
}
