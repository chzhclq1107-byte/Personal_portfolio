
//a클릭시 위로 튕김현상제거
$( document).on('click','a[href="#"]', function(e) {
    e.preventDefault();
})


//
$(window).on('scroll resize', function(){
    var scrollPos = 0;
    scrollPos = $(document).scrollTop();
    //console.log( scrollPos);
    //alert( scrollPos);
    fixHeader();
    fix();
    fixList();


    function fixHeader() {
        if(scrollPos > 80){
            $('header').addClass('on');
        }else{
            $('header').removeClass('on')
        }
    }

    function fix(){
        if(scrollPos > 1250){ $(' .fix .text').addClass('on')}
        else { $(' .fix .text').removeClass('on')}
        if(scrollPos > 2700){ $(' .fix .text').removeClass('on')}
    }

    function fixList() {
       if(scrollPos > 1250) {
        $('.approach .inner .list li a').removeClass('on');
        $('.approach .inner .list li:eq(0) a').addClass('on');
       }
       if(scrollPos > 1650) {
        $('.approach .inner .list li a').removeClass('on');
        $('.approach .inner .list li:eq(1) a').addClass('on');
       }
       if(scrollPos > 2050) {
        $('.approach .inner .list li a').removeClass('on');
        $('.approach .inner .list li:eq(2) a').addClass('on');
       }
       if(scrollPos > 2550) {
        $('.approach .inner .list li a').removeClass('on');
        $('.approach .inner .list li:eq(3) a').addClass('on');
       }
    }
})
  //eq() :  인덱스 값을 사용해 원하는 위치의 요소를 선택해 가져올 수 있는 선택자 메소드


$(function(){
    $('.gnbBtn').on('click', function(){
        $('nav.gnb ').toggleClass('on');
    })
});
    