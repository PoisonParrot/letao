/**
 * Created by ����� on 2018/6/7.
 */


$(function () {
    //�ú�����װ     �ö���ķ�ʽ���з�װ
    var letao = new Letao();
    //�����ֲ�ͼ���
    letao.initslider();
    //��ʼ�����ڹ���
    letao.initscroll();
})
var Letao = function () {

}
Letao.prototype = {
    initslider: function () {
        //���slider�������
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000//�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��
        });

    },
    //��������
    initscroll: function () {
        //���slider�������
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 3000//�Զ��ֲ����ڣ���Ϊ0���Զ����ţ�Ĭ��Ϊ0��
        });
        //���ڹ�����ʼ��
        options = {
            scrollY: true, //�Ƿ��������
            scrollX: false, //�Ƿ�������
            startX: 0, //��ʼ��ʱ������x
            startY: 0, //��ʼ��ʱ������y
            indicators: true, //�Ƿ���ʾ������
            deceleration: 0.0006, //����ϵ��,ϵ��ԽС����Խ����
            bounce: true //�Ƿ����ûص�
        }
        mui('.mui-scroll-wrapper').scroll(options);
    }
}
