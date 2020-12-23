import Config from 'webpack-chain';
import presetMDX from '../mdx';

test('test preset entry', () => {
    const config = new Config();
    presetMDX(config);
    expect(config).toMatchSnapshot();
});
