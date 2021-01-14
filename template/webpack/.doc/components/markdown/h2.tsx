import React from 'react'

export default ({
    children, className
}) => {
    return (
        <h2 name={`#${encodeURIComponent(children)}`} className={className}>
            {children}
        </h2>
    )
}
