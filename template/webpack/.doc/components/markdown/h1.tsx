import React from 'react';

import './styles/h1.less';

export default ({
    children
}) => {
    return (
        <h1 id={children} className="md-h1">
            {children}
        </h1>
    )
}
