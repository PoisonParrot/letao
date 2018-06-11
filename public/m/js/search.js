$(function () {
    var letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistory();
})


//创建构造函数
function Letao() {

}
//构造函数原型
Letao.prototype = {
    //初始化搜索
    addHistory: function () {
        var that = this;
        //点击搜索按钮后将输入框中的数据储存到到本地
        $(".btn-search").click(function () {
            //判断是否输入文字
            var id = 0;
            var search = $(".input-search").val();
            if (!search.trim()) {
                alert('请输入内容');
                return;
            }
            //首先查询本地是否有数据,将输入的内容存到本地
            var arr = window.localStorage.getItem('searchData');
            if (arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
                id = arr[arr.length - 1].id + 1;
            } else {
                var arr = [];
                id = 0;
            }
            arr.push({
                "search": search,
                "id": id
            });
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            that.queryHistory();
            window.location.href = 'productlist.html?search='+search+'';
        })
    },


    //查询数据渲染页面
    queryHistory: function () {
        //获取页面数据  利用模板引擎创建元素
        var arr = window.localStorage.getItem('searchData');
        if (arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        } else {
            var arr = [];
        }
        var html = template('searchTmp', arr);
        $(".history ul").html(html);
    },


    //删除数据
    deleteHistory: function () {
        var that = this;
        $(".history ul").on('click', 'span', function () {
            //console.log(1);
            //this.parent().remove();
            var id = $(this).parents().attr('id');
            var arr = window.localStorage.getItem('searchData');
            arr = JSON.parse(arr);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == id) {
                    arr.splice(i, 1);
                }
            }
            window.localStorage.setItem('searchData', JSON.stringify(arr));
            that.queryHistory();
        })
    },

    //清除数据

    //bug
    clearHistory: function () {
        var that = this;
        $(".clear").click(function () {
            window.localStorage.setItem('searchData', "");
            that.queryHistory();
        })
    }

}