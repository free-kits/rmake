import React from 'react'

import './styles/h2.less';

export default ({
    children
}) => {
    return (
        <h2 id={children} className='md-h2'>
            {children}
        </h2>
    )
}
