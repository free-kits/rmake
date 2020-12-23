import { join } from 'path';
import Config from 'webpack-chain';

export default (config: Config) => {
    config.resolve.set('fallback', {
        fs: false,
    });

    config.resolve.extensions
        .add('.tsx')
        .add('.ts')
        .end();
    const entryPath = join(process.cwd(), '.doc', 'entry.tsx');
    config.entry('entry').add(entryPath);
};
