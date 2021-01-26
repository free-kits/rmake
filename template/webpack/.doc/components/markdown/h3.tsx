import React from 'react'
import { useLinkTitle } from './useLink';
import './styles/h3.less';

export default ({
    children
}) => useLinkTitle(
    <h3 id={children} className='md-h3'>
        {children}
    </h3>
)
