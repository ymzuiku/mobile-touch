# 让移动端更接近 native

引入 mobile-touch, 若设备为移动设备, 可以让整个页面的滚动更接近 native：

1. 双击屏幕不会缩放
2. 双手指捏合不会缩放屏幕
3. 拦截所有滚动，滚动不会显示浏览器背景，若有需要滚动的区域，单独添加 `mobile-scroll` 属性
4. 滚动区域接收滚动手势时，快速响应

如：

```js
import 'mobile-touch'

export default ()=>{
  return <div mobile-scroll="true" className="page">
    <SomeComponents>
  </div>
}

```