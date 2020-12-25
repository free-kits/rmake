import Config from 'webpack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (config: Config) => {
    config.plugin('html-webpack-plugin').use(new HtmlWebpackPlugin({
        templateContent: `<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <style>
        html,body, #root {
        margin: 0px;
        height: 100%;
        }
    </style>
    </head>
    <body>
    <div id="root"></div>
    </body>
</html>`,
    }));
};
