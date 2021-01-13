import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';

export default ({ children, className }) => {
    const language = className.replace(/language-/, '');
    return (
        <Highlight
            {...defaultProps}
            code={children.trim()}
            theme={theme}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{ ...style, padding: '.8rem' }}
                >
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
