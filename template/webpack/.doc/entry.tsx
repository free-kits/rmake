import React from 'react';
import ReactDOM from 'react-dom';
import { DocRouter } from './components/index';

const Root = () => <DocRouter />;

ReactDOM.render(<Root />, document.getElementById('root'));

// 添加离线缓存
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
