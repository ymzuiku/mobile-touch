# 让移动端更接近 native

引入 mobile-touch，若设备为移动设备，可以让整个页面的滚动更接近 native，支持 Typescript

零配置，轻量：< 1kb (Gzip)

## Feature

触屏:

1. 双击屏幕不会缩放
2. 双手指捏合不会缩放屏幕

滚动:

1. 滚动区域接收滚动手势时，可以快速响应，解决切换 overflow 时，滚动无响应问题
2. 拦截所有滚动，滚动不会显示浏览器背景，若有需要滚动的区域，单独添加 `mobile-touch` 属性

键盘:

1. iOS 键盘出现时，点击空白区域自动收起键盘
2. iOS 键盘出现时，自动调整滚动区域

## API

没有必要的 API，只需要引入库，若有需要滚动的列表，单独添加 mobile-touch 属性即可

```js
import 'mobile-touch'

export default ()=>{
  return <div mobile-touch="true" className="page">
    <SomeComponents>
  </div>
}

```
