import yaml from 'js-yaml';

test('test yaml load', () => {
    const testData = `
nav:
    title: 组件
    path: /components
group:
    path: /components/base
    title: 基础组件
title: Button 按钮`;
    const data: any = yaml.safeLoad(testData);
    expect(data).toMatchSnapshot();
});
