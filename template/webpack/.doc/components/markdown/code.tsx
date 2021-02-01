import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsDark';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

import './styles/code.less';

const Code = ({
    code
}) => {
    return (
        <LiveProvider code={code.trim()} noInline theme={theme}>
            <div className='live-preview'>
                <LivePreview />
            </div>
            <div className='live-editor'>
                <LiveEditor />
                <LiveError />
            </div>
        </LiveProvider>
    )
}

export default ({ children, className, live }) => {
    const language = className?.replace(/language-/, '') || 'shell';
    if (live) {
        return <Code code={children}/>
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
