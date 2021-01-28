import React from 'react';
import './styles/td.less';

export default ({
    children
}) => {
    return (
        <td className='md-td'>
            {children}
        </td>
    );
}
