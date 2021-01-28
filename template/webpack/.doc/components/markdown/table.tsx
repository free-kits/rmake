import React from 'react';
import './styles/table.less';

export default ({
    children
}) => {
    return (
        <table className='md-table'>
            {children}
        </table>
    );
}
