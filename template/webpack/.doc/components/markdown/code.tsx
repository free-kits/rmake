import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import './styles/code.less';

export default ({ children, className, live }) => {
    const language = className?.replace(/language-/, '') || 'shell';
    if (live) {
        return (
            <div style={{ marginTop: '40px' }}>
                <LiveProvider code={children.trim()} noInline theme={theme}>
                    <LivePreview />
                    <LiveEditor className='live-editor' />
                    <LiveError />
                </LiveProvider>
            </div>
        );
    }

    return (
        <Highlight
            {...defaultProps}
            code={children.trim()}
            theme={theme}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
