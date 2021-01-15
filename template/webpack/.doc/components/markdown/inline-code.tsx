import React from 'react';
import './styles/inline-code.less'

export default ({
    children
}) => {
    return (
        <code className={'md-inline-code'}>
            {children}
        </code>
    )
}
