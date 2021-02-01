import React from 'react';
import ReactDOM from 'react-dom';
import { createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

import { getAllPath } from './components/_util/config';

const DocRouter = React.lazy(() => import('./components/index').then(module => ({ default: module.DocRouter })));

const Root = () => <DocRouter />;

ReactDOM.render((
<React.Suspense fallback={<div />}>
    <Root />
</React.Suspense>
), document.getElementById('root'));

// 添加离线缓存
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            getAllPath().forEach((path) => {
                try {
                    const handler = createHandlerBoundToURL(path);
                    const navigationRoute = new NavigationRoute(handler);
                    registerRoute(navigationRoute);
                } catch (error) {
                }
            })
        });
    });
}
