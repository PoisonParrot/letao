$(function () {
    var letao = new Letao();
    letao.initfresh();
    letao.productSearch();
    searchvalue = getQueryString('search');
    $('.input-search').val(searchvalue);
    getpreduct();
})
var page = 1;

function Letao() {

}

Letao.prototype = {
    //初始化刷新数据  上拉下拉数据
    initfresh: function () {
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {
                    height: 50,//可选.默认50.触发上拉加载拖动距离
                    auto: false,//可选,默认false.自动上拉加载一次
                    contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function () {
                        setTimeout(function () {
                            //停止刷新数据
                            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            //上拉获取更多内容
                            //console.log(searchvalue);
                            $.ajax({
                                url: '/product/queryProduct',
                                data: {
                                    page: ++page,
                                    pageSize: 2,
                                    //proName:searchvalue
                                    proName: searchvalue
                                },
                                success: function (backData) {
                                    if (backData.data.length == 0) {
                                        //$(".content .mui-row").html("<h6>没有更多内容了</h6>");
                                    }
                                    var html = template('productSearchTmp', backData);
                                    $(".content .mui-row").append(html);
                                }
                            })


                        }, 1500);
                        //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                },
                down: {
                    height: 50,//可选,默认50.触发下拉刷新拖动距离,
                    auto: false,//可选,默认false.首次加载自动下拉刷新一次
                    contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function () {
                        setTimeout(function () {
                            //设置定时关闭刷新
                            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                            //下拉时,在回调函数中刷新数据,并且渲染页面
                            searchvalue = $('.input-search').val();
                            //mui('#mui-scroll-wrapper').pullRefresh().refresh(true);
                            getpreduct();


                        }, 1500);//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    }
                }
            }
        });

    },

    //产品搜索
    productSearch: function () {
        //点击搜索后将搜索框 利用ajax技术将搜索框中的内容和数据进
        // 行比较并根据数据对页面进行渲染
        $(".btn-search").on('tap', function () {
            searchvalue = $('.input-search').val();
            getpreduct();
        })


    }
}

//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}
//封装获取数据的函数
function getpreduct() {
    $.ajax({
        url: '/product/queryProduct',
        data: {
            page: 1,
            pageSize: 2,
            //proName:searchvalue
            proName: searchvalue
        },
        success: function (backData) {
            //根据返回的数据  利用模板引擎对页面进行渲染
            //如果没有搜索的内容 弹出你搜索的内容不存在,请重新输入
            if (backData.data.length == 0) {
                console.log("没有了");
                //$(".content .mui-row").html("<h6>没有更多内容了</h6>");
            }
            var html = template('productSearchTmp', backData);
            $(".content .mui-row").html(html);
        }
    })
}