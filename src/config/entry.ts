import { join } from 'path';
import Config from 'webpack-chain';

export default (config: Config) => {
    config.resolve.extensions
        .add('.tsx')
        .add('.ts')
        .add('.js')
        .end();

    config.entry('entry').add(join('.doc', 'entry.tsx'));
    config.devServer.stats('errors-only');
};
