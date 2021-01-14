import React from 'react'

export default ({
    children, className
}) => {
    return (
        <h1 name={`#${children}`} className={className}>
            {children}
        </h1>
    )
}
