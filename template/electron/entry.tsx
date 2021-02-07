import React from 'react';
import ReactDOM from 'react-dom';

const DocRouter = React.lazy(() => import('../../src'));

const Root = () => <DocRouter />;

ReactDOM.render((
    <Root />
), document.getElementById('root'));
