$(function () {
    AOS.init();
});

var newsController = (function() {
    var initSwiper = function (_id) {
        var swiper = new Swiper( '.swiper-container', {
            autoplay: { // 자동 재생 여부
                delay: 5000 // 5초마다 슬라이드 바뀜
            },
            loop: true, // 반복 재생 여부
            slidesPerView: 1, // 한 번에 보여줄 슬라이드 개수
            navigation: { // 슬라이드 이전/다음 버튼 사용 여부
                prevEl: '.swiper-prev', // 이전 버튼 선택자
                nextEl: ' .swiper-next' // 다음 버튼 선택자
            }
        })
    }

    var initScrollEvent = function(_class, _index) {
        const blankElems = $(_class + ' .blank' + _index);
        const graphicElems = $(_class + ' .graphic-item' + _index);
        let currentItem;

        for (let i = 0; i < blankElems.length; i++) {
            blankElems[i].dataset.index = i;
            graphicElems[i].dataset.index = i;
        }

        $(window).on("scroll", () => {
            const scrollBottom = $(window).scrollTop() + $(window).height(); // 스크롤 바텀 값

            let blank;
            let boundingRect;

            for (let i = 0; i < blankElems.length; i++) {
                blank = blankElems[i];
                boundingRect = blank.getBoundingClientRect();
                if (!blank) continue;
                if (boundingRect.top > window.innerHeight * 0.2 && boundingRect.top < window.innerHeight * 1) {
                    if (currentItem) {
                        currentItem.classList.remove('visible');
                    }
                    currentItem = graphicElems[blank.dataset.index];
                    currentItem.classList.add('visible');
                }
            }
        });
    };

    var initFadeInView = function (_class, _viewPageClass, _scrollElClass, _activeClass) {
        $(window).on("scroll", () => {
            const scrollBottom = $(window).scrollTop() + $(window).height(); // 스크롤 바텀 값
            const page04 = $(_class + ' ' + _viewPageClass)
            let ofset01
            if (page04.length) {
                ofset01 = page04.offset().top;
            }
            if (scrollBottom > ofset01) {
                $(_scrollElClass).addClass(_activeClass)
            } else {
                $(_scrollElClass).removeClass(_activeClass)
            }
        });
    };

    var initMapModal = function(_mapClass, _modalClass) {

        console.log(_mapClass)

        $(_mapClass).on('click', function () {
            $(_modalClass).fadeIn('300')

            $('.modalClose').off().on('click', function () {
                $(_modalClass).fadeOut('300')
            })
        })

        /*$('.page03-map .map-senter01').on('click', function () {
            $('.modal01').fadeIn('300')
        })
        $('.modalClose').on('click', function () {
            $('.modal01').fadeOut('300')
        })

        // 화천매립장
        $('.page03-map .map-senter02').on('click', function () {
            $('.modal02').fadeIn('300')
        })
        $('.modalClose').on('click', function () {
            $('.modal02').fadeOut('300')
        })
        // 색달매립장
        $('.page03-map .map-senter03').on('click', function () {
            $('.modal04').fadeIn('300')
        })
        $('.modalClose').on('click', function () {
            $('.modal04').fadeOut('300')
        })
        // 남원매립장
        $('.page03-map .map-senter04').on('click', function () {
            $('.modal03').fadeIn('300')
        })
        $('.modalClose').on('click', function () {
            $('.modal03').fadeOut('300')
        })*/
    }

    return {
        initSwiper,
        initScrollEvent,
        initFadeInView,
        initMapModal,
    }
})();