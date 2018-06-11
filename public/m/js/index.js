/**
 * Created by 罗羽锋 on 2018/6/7.
 */


$(function () {
    //用函数封装     用对象的方式进行封装
    var letao = new Letao();
    //调用轮播图插件
    letao.initslider();
    //初始化窗口滚动
    letao.initscroll();
})
var Letao = function () {

}
Letao.prototype = {
    initslider: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
        });

    },
    //窗口下拉
    initscroll: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        //窗口滚动初始化
        options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        }
        mui('.mui-scroll-wrapper').scroll(options);
    }
}
