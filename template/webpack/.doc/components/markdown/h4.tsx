import React from 'react'
import { useLinkTitle } from './useLink';
import './styles/h4.less';

export default ({
    children
}) => useLinkTitle(
    <h4 id={children} className='md-h4'>
        {children}
    </h4>
)
