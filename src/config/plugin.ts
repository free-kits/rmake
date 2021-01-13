import Config from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CopyPlugin from 'copy-webpack-plugin';
import { join } from 'path';

export default (config: Config) => {
    config.plugin('html-webpack-plugin').use(
        new HtmlWebpackPlugin({
            template: join(process.cwd(), '.doc', 'pages', 'document.ejs'),
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
