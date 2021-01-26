import React from 'react'
import { useLinkTitle } from './useLink';
import './styles/h5.less';

export default ({
    children
}) => useLinkTitle(
    <h5 id={children} className='md-h5'>
        {children}
    </h5>
)
