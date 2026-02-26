$(function () {

    const headerHeight = $('#header').outerHeight();
    const sections = ['.sec-2', '.sec-7', '#footer'];

    let current = 'top';

    $('.nav a').on('click', function (e) {
        e.preventDefault();

        const target = $(this).data('target');
        current = target;

        let scrollPos = 0;
        if (target !== 'top') {
            scrollPos = $(target).offset().top - headerHeight;
        }

        $('html, body').animate({ scrollTop: scrollPos }, 600);
        updateNav();
    });

    $(window).on('scroll', function () {

        const scrollCenter = $(window).scrollTop() + ($(window).height() / 2);

        sections.forEach(sec => {
            const $el = $(sec);
            const top = $el.offset().top;
            const bottom = top + $el.outerHeight();

            if (scrollCenter >= top && scrollCenter < bottom) {
                current = sec;
            }
        });

        if (scrollCenter < $('.sec-2').offset().top) {
            current = 'top';
        }

        updateNav();
    });

    function updateNav() {
        $('.nav a').removeClass('on');
        $('.nav a[data-target="' + current + '"]').addClass('on');
    }

});
$(function () {
    const maxMove = 20;
    $('.sec-1 .label > i').on('mousemove', function (e) {

        const $this = $(this);
        const offset = $this.offset();
        const width = $this.outerWidth();
        const height = $this.outerHeight();

        const centerX = offset.left + width / 2;
        const centerY = offset.top + height / 2;

        const deltaX = e.pageX - centerX;
        const deltaY = e.pageY - centerY;

        let moveX = -deltaX * 0.2;
        let moveY = -deltaY * 0.2;

        // 최대 이동 제한
        moveX = Math.max(Math.min(moveX, maxMove), -maxMove);
        moveY = Math.max(Math.min(moveY, maxMove), -maxMove);

        $this.css('transform', `translate(${moveX}px, ${moveY}px)`);
    });

    $('.sec-1 .label > i').on('mouseleave', function () {
        $(this).css('transform', 'translate(0,0)');
    });
});
$(function(){
    const card = document.querySelector('.sec-2 .namecard .card');
    let animationId = null;
    let hovering = false;
    let time = 0;
    const amplitude = 10;
    const speed = 0.01;
    function animate(){

        time += speed;
        const angle = Math.sin(time) * amplitude;

        card.style.transform = `rotate(${angle}deg)`;

        if(hovering){
            animationId = requestAnimationFrame(animate);
        } else {

            if(Math.abs(angle) > 1){
                animationId = requestAnimationFrame(animate);
            } else {
                card.style.transform = 'rotate(0deg)';
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
    }
    $('.sec-2 .namecard').on('mouseenter', function(){
        hovering = true;
        if(!animationId){
            animate();
        }
    });
    $('.sec-2 .namecard').on('mouseleave', function(){
        hovering = false;
    });
});
$(function(){
    const namecard = document.querySelector('.sec-2 .namecard');
    const inner = document.querySelector('.sec-2 .namecard .card-inner');
    namecard.addEventListener('click', function(){
        inner.classList.toggle('flipped');
    });
});
$(function () {
    const $marquee = $('.sec-4 .marquee');
    $marquee.append($marquee.html());
    let x = 0;
    const speed = 0.5;
    const width = $marquee[0].scrollWidth / 2;

    function animate() {
        x -= speed;
        if (Math.abs(x) >= width) {
            x = 0;
        }
        $marquee.css('transform', `translateX(${x}px)`);
        requestAnimationFrame(animate);
    }
    animate();
});
$(window).bind('ready load scroll',function(){
    var wt = $(this).scrollTop();
    $('.init').each(function () {
        var st = $(this).offset().top - window.innerHeight + (window.innerHeight / 4);
        if (wt > st) {
            $(this).addClass('animate');
        } else{
            $(this).removeClass('animate');
        }
    });
});
$(function () {

    const listSwiper = new Swiper('.sec-7 .list', {
        slidesPerView: 1,
        speed: 800,
        spaceBetween: 60,
        allowTouchMove: true,
    });

    const $tabBtn = $('.sec-7 .tab button');

    $tabBtn.on('click', function () {

        const index = $(this).index();

        listSwiper.slideTo(index);

        $tabBtn.removeClass('on');
        $(this).addClass('on');
    });

    listSwiper.on('slideChange', function () {

        const activeIndex = listSwiper.activeIndex;

        $tabBtn.removeClass('on');
        $tabBtn.eq(activeIndex).addClass('on');
    });

});
gsap.registerPlugin(ScrollTrigger);

const list = document.querySelector(".sec-8 .list");
const track = document.querySelector(".sec-8 .track");

function getScrollAmount() {
    return track.scrollWidth - list.clientWidth;
}

function initHorizontalScroll() {
    ScrollTrigger.getAll().forEach(st => st.kill());

    if (window.innerWidth > 1024) {
        gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: list,
                start: "center center",
                end: () => "+=" + getScrollAmount(),
                scrub: 1,
                pin: list,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                // markers: true
            }
        });
    } else {
        gsap.set(track, { x: 0 });
    }
}

window.addEventListener("load", initHorizontalScroll);
window.addEventListener("resize", initHorizontalScroll);