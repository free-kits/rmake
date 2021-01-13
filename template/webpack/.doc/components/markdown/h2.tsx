import React from 'react'

export default ({
    children, className
}) => {
    return (
        <h2 name={`#${encodeURIComponent(children)}`} className={className}>
            <a href={`#${children}`}>{children}</a>
        </h2>
    )
}
