import Config from 'webpack-chain';
import presetEntry from '../entry';

test('test preset entry', () => {
    const config = new Config();
    presetEntry(config);
    expect(config).toMatchSnapshot();
});
