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
    expect(data.nav.title).toBe('组件');
    expect(data.nav.path).toBe('/components');
    expect(data.group.path).toBe('/components/base');
    expect(data.group.title).toBe('基础组件');
    expect(data.title).toBe('Button 按钮');
});
