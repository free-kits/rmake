import React from 'react';
import './styles/blockquote.less'

export default ({
    children
}) => {
    return (
        <blockquote className='md-blockquote'>
            {children}
        </blockquote>
    )
}
