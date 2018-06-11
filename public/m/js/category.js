$(function () {
    var letao = new Letao();

    letao.initScroll();
    letao.getCategoryLeft();
    letao.getCategoryRight();
})
function Letao() {
}
Letao.prototype = {
    initScroll: function () {
        options = {
            scrollY: true,
            scrollX: false,
            startX: 0,
            startY: 0,
            indicators: false,
            deceleration: 0.0006,
            bounce: true
        }
        mui('.mui-scroll-wrapper').scroll(options);
    },
    getCategoryLeft: function () {
        $.ajax({
            url: '/category/queryTopCategory',
            success: function (backData) {
                var html = template('categoryLeftTmp', backData);
                $('.category-left ul').html(html);
            }
        })
    },
    getCategoryRight:function () {

        $(".category-left ul").on('click','li', function (e) {
          var id=$(this).attr('dataId');
            getRightData(id);
            function getRightData(id){
                $.ajax({
                    url:'/category/querySecondCategory',
                    data:{id:id},
                    success:function (data) {

                        var html = template('categoryRightTmp',data);
                        if(html){

                            $('.category-right .mui-row').html(html);
                        }else{

                            $('.category-right .mui-row').html('<h6>获取更多</h6>');
                        }
                    }
                });
            }
        })



    }

}