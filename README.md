# react 项目相关的一些功能实现方案 demo

- 基于 create-react-app 快速搭建 react 开发项目
- 重点关注 react 一些功能模块的实现方案

## react-hook-demo

用于实现一些 hook 功能

封装 table 组件，内部自定义了三个 hook，useFetch（loading，params，data）, usePagination(pagination),useRowSelection(selectedList，selectedRowKeys)

## react-i18n-demo

用于实现项目的国际化

封装国际化组件 I18nProvider，useI18n 通过 useContext 获取国际化的内容

## react-antd-rematch

使用 rematch 代替 redux
