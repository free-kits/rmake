import React from 'react';
import './styles/tr.less';

export default ({
    children
}) => {
    return (
        <tr className='md-tr'>
            {children}
        </tr>
    );
}
