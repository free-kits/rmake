import { join } from 'path';
import Config from 'webpack-chain';

export default (config: Config) => {
    config.resolve.set('fallback', {
        fs: 'empty',
    });

    config.resolve.extensions
        .add('.js')
        .add('.jsx')
        .add('.ts')
        .add('.tsx')
        .end();
    const entryPath = join(process.cwd(), '.doc', 'entry.tsx');
    config.entry('entry').add(entryPath);
    // see https://github.com/facebook/react/issues/2402
    // see https://github.com/facebook/react/issues/13991#issuecomment-435587809
    config.resolve.alias.set('react', join(process.cwd(), 'node_modules', 'react')).end();
    config.resolve.alias.set('react-dom', join(process.cwd(), 'node_modules', 'react-dom')).end();
};
