import React from 'react'

export default ({
    children, className
}) => {
    return (
        <h1 name={`#${children}`} className={className}>
            <a>{children}</a>
        </h1>
    )
}
