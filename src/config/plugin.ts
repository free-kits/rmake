import Config from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CopyPlugin from 'copy-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import webpack from 'webpack';
import { join } from 'path';

export default async (config: Config) => {
    config.plugin('html-webpack-plugin').use(
        new HtmlWebpackPlugin({
            template: join(process.cwd(), '.doc', 'pages', 'document.ejs'),
        }),
    );

    const packages = await import(join(process.cwd(), 'package.json'));
    const title = packages['@freekits/dt-doc'].title || packages.name;
    config.plugin('define-plugin').use(
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    );
    config.plugin('copy-webpack-plugin').use(
        new webpack.DefinePlugin({
            title: JSON.stringify(title),
        }),
    );

    // config.plugin('copy-webpack-plugin').use(
    //     new CopyPlugin({
    //         patterns: [
    //             {
    //                 from: 'assets',
    //                 to: 'assets',
    //             },
    //         ],
    //     }),
    // );
};
