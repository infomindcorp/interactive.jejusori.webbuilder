var pageBuilderDataService = (function () {

    var generateRandomString = function (num) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    var createBlockComponent = function(blockManager) {

        blockManager.add("Container-fluid", {
            label: "Container-fluid",
            category: 'Layout',
            attributes: {
                class: "fs-5 mb-5 far fa-window-maximize"
            },
            content: '<div class="container-fluid"></div>',
            script: function() {}
        })

        // 기사1
        blockManager.add("jejusound-news01", {
            label: "jejusound-news01",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function() {
                var initScript = function() {
                    var _this = this;
                    console.log(_this)
                    newsController.initSwiper(_this.id);
                    newsController.initScrollEvent('.news01', '');
                    newsController.initMapModal('.page03-map .map-senter01', '.modal01');
                    newsController.initMapModal('.page03-map .map-senter02', '.modal02');
                    newsController.initMapModal('.page03-map .map-senter03', '.modal04');
                    newsController.initMapModal('.page03-map .map-senter04', '.modal03');

                    $(window).on("scroll", () => {
                        const scrollBottom = $(window).scrollTop() + $(window).height();
                        const line = $('.line-wrapper')
                        let ofset
                        if (line.length) {
                            ofset = line.offset().top;
                        }
                        if (scrollBottom > ofset) {
                            $('.line-bar').addClass('on')
                        } else {
                            $('.line-bar').removeClass('on')
                        }
                    })
                };
                var html = '<div>'
                html += '<div id="content" class="news01">' +
                    '            <section class="page01">' +
                    '              <div class="page01-text">' +
                    '                <h2>쓰레기섬 제주? <small>쓰레기장은 포화상태, 1인당 생활폐기물 배출량 전국 1위</small></h2>' +
                    '                ' +
                    '              </div>' +
                    '              <a href="#page02" onclick="return true"  class="icon-scroll">' +
                    '                <i class=\'bx bx-mouse\' ></i>' +
                    '                <i class=\'bx bx-chevrons-down\' ></i>' +
                    '              </a>' +
                    '            </section>' +
                    '            <section class="page02">' +
                    '              <div class="scroll-graphic">' +
                    '                <div class="graphic-item" data-index="0">' +
                    '                  <div id="page02" class="step">' +
                    '                    <p >핵심은 감당할 수 없을 정도로 쓰레기가 쏟아지고 있다는 것.</p>' +
                    '                    <p>현재 제주시 회천동에 있는 북부소각장은 하루 평균 140톤을</p>' +
                    '                    <p>처리할 수 있는데, 하루에 반입되는 쓰레기는 201톤.</p>' +
                    '                    <p>매일 70톤의 쓰레기가 쌓여간다는 얘기입니다.</p>' +
                    '                    <p>쓰레기를 압축해 주변에 쌓아두고 있는데 이 공간마저</p>' +
                    '                    <p>부족한 상황입니다.</p>' +
                    '                    <p>현재 갈 곳을 잃고 야적된 압축 쓰레기는 무려 5만톤.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="graphic-item" data-index="1">' +
                    '                  <div class="step">' +
                    '                    <p>제주도의 쓰레기는 하루 이틀 문제가 아닙니다.</p>' +
                    '                    <p>제주의 1인당 쓰레기 베출량은 전국 최고 수준.</p>' +
                    '                    <p>급격히 불어난 1년 1500만명씩 찾아오는 관광객이 버린</p>' +
                    '                    <p>쓰레기가 주 원인입니다.</p>' +
                    '                    <p>쓰레기를 압축해 주변에 쌓아두고 있는데 이 공간마저</p>' +
                    '                    <p>제주 이주 붐으로 인구가 급증하고, 이 흐름에 맞춰 각종</p>' +
                    '                    <p>건축과 개발이 늘어난 것도 악역향을 줬습니다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank" data-index="0"></div>' +
                    '              <div class="blank" data-index="1"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page03">' +
                    '              <div class="page03-text">' +
                    '                <h2>주요 쓰레기매립장 상황</h2>' +
                    '                <p>공공데이터포털 / 2021.1.2. 기준</p>' +
                    '              </div>' +
                    '              <div class="page03-map">' +
                    '                <img src="/site/images/jejumap.png" alt="">' +
                    '                <button class="map-senter01"></button>' +
                    '                <button class="map-senter02"></button>' +
                    '                <button class="map-senter03"></button>' +
                    '                <button class="map-senter04"></button>' +
                    '              </div>' +
                    '              ' +
                    '                <div class="page03-modal modal01">' +
                    '                  <h3>제주환경자원순환센터</h3>' +
                    '                  <img src="/site/images/jejumap01.png" alt="">' +
                    '                  <strong class="active">5%</strong>' +
                    '                  <p>매립용량%: 2,417,179 m³ / 현재매립량: 118,837 m³</p>' +
                    '                  <button class="modalClose">' +
                    '                    <i class=\'bx bx-x\'></i>' +
                    '                  </button>' +
                    '                </div>' +
                    '                <div class="page03-modal modal02">' +
                    '                  <h3>화천매립장</h3>' +
                    '                  <img src="/site/images/jejumap02.png" alt="">' +
                    '                  <strong>100%</strong>' +
                    '                  <p>매립용량%: 2,319,800 m³ / 현재매립량: 2,319,800 m³</p>' +
                    '                  <button class="modalClose">' +
                    '                    <i class=\'bx bx-x\' ></i>' +
                    '                  </button>' +
                    '                </div>' +
                    '                <div class="page03-modal modal03">' +
                    '                  <h3>색달매립장</h3>' +
                    '                  <img src="/site/images/jejumap02.png" alt="">' +
                    '                  <strong>98.94%</strong>' +
                    '                  <p>매립용량%: 812,868 m³ / 현재매립량: 804,302 m³</p>' +
                    '                  <button class="modalClose">' +
                    '                    <i class=\'bx bx-x\' ></i>' +
                    '                  </button>' +
                    '                </div>' +
                    '                <div class="page03-modal modal04">' +
                    '                  <h3>남원매립장</h3>' +
                    '                  <img src="/site/images/jejumap02.png" alt="">' +
                    '                  <strong>100%</strong>' +
                    '                  <p>매립용량%: 45,974 m³ / 현재매립량: 45,974 m³</p>' +
                    '                  <button class="modalClose">' +
                    '                    <i class=\'bx bx-x\' ></i>' +
                    '                  </button>' +
                    '                </div>' +
                    '              ' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page04">' +
                    '              <div class="line-wrapper">' +
                    '                <div class="line-container">' +
                    '                  <div id="bar" class="line-bar"></div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="page04-area">' +
                    '                <h3 data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">"쓰레기장을 더 많이?"</h3>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">쓰레기가 많이 나오니 매립장과 소각장을 더 만드는 게 적절할까요?</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">계속 인프라를 늘리는 게 정답이 될 순 없습니다.</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주 전체를 쓰레기장으로 만들 수는 없는 노릇이죠.</p>' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000" src="/site/images/lineimage01.png" alt="">' +
                    '              </div>' +
                    '              <div class="page04-area">' +
                    '                <h3 data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">아직 현실화된 것은 없다</h3>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">쓰레기 대량 배출자를 대상으로 한 쓰레기 처리비용 현실화,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주를 찾는 관광객에게 환경보전기여금을 부과하는 방안,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">일회용품 사용 제한 등 다양한 아이디어가 거론된 지 꽤 됐지만</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">현실화된 것은 아직 없습니다.</p>' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000" src="/site/images/jejuimage04.png" alt="">' +
                    '              </div>' +
                    '                ' +
                    '              <div class="page04-area">' +
                    '                <h3 data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">섬을 찾는 \'1500만명\'</h3>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주도의 쓰레기는 하루 이틀 문제가 아닙니다.</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주의 1인당 쓰레기 배출량은 전국 최고 수준,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">급격히 불어난 1년 1500만명씩 찾아오는</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">관광객들이 버린 쓰레기가 주 원인입니다.</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주 이주 붐으로 인구가 급증하고,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">이 흐름에 맞춰 각종 건축과 개발이 늘어난 것도 악영향을 줬습니다.</p>' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000" src="/site/images/lineimage02.png" alt="">' +
                    '              </div>' +
                    '              ' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page05">' +
                    '              <div class="swiper-container">' +
                    '                <div class="swiper-wrapper">' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <button class="swiper-prev">' +
                    '              </button>' +
                    '              <button class="swiper-next">' +
                    '              </button>' +
                    '            </section>' +
                    '            <section class="page06">' +
                    '              <div class="page06-text">' +
                    '                <h3>더 자세한 이야기가 궁금하다면?</h3>' +
                    '                <h4>※ 주제를 클릭하면 [쓰레기의 반격, 위기의 제주] 기사 페이지로 이동합니다.</h4>' +
                    '              </div>' +
                    '              ' +
                    '              <div class="link-box">' +
                    '                <a target="_blank" href="">급증하는 가연성쓰레기</a>' +
                    '                <a target="_blank" href="">재활용 버거운 이유?</a>' +
                    '                <a target="_blank" href="">쓰레기매립장 폐쇄!?</a>' +
                    '                <a target="_blank" href="">대행폐기물도 골치라고?</a>' +
                    '                <a target="_blank" href="">해양쓰레기도 역대 최다</a>' +
                    '                <a target="_blank" href="">음식물 쓰레기로 바다로 \'위험\'</a>' +
                    '              </div>' +
                    '            </section>' +
                    '        </div>';
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });


        //기사2
        blockManager.add("jejusound-news02", {
            label: "jejusound-news02",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    var _this = this;
                    newsController.initScrollEvent('.news02', '2')
                    newsController.initScrollEvent('.news02', '3')
                    newsController.initScrollEvent('.news02', '4')
                    newsController.initScrollEvent('.news02', '5')

                    newsController.initFadeInView('.news02', '.page04', '.scroll-graphic2', 'on')
                    newsController.initFadeInView('.news02', '#page05', '.scroll-graphic3', 'on')
                    newsController.initFadeInView('.news02', '.page06', '.scroll-graphic3', 'active')
                }
                var html = '<div>';
                html += '<div id="content" class="news02">' +
                    '          ' +
                    '            <section class="page01">' +
                    '              <h2>01</h2>' +
                    '              <h2>홍가포르를 꿈꾸다</h2>' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page02" id="page02">' +
                    '              <div class="page02-area">' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine" data-aos-duration="1000"  src="/site/images/js01.png" alt="">' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine" data-aos-duration="1000" >"제주특별자치도 추진을 통해 홍콩이나 싱가포르를 능가하는 경쟁력 있는 국제자유도시로 만들어 나가자"</p>' +
                    '                <span data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine" data-aos-duration="1000" >김태환 전 제주도지사. 2005년 5월 20일 기자회견 중.</span>' +
                    '              </div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '' +
                    '            <section class="page03">' +
                    '              <div class="scroll-graphic2">' +
                    '                <div class="graphic-item2">' +
                    '                  <div>' +
                    '                    <p>1998년 출범한 김대중 정부는 제주 발전전략으로 제주를</p>' +
                    '                    <p>사람과 상품, 자본의 이동이 자유로운 국제자유도시로 조성하려 했다.</p>' +
                    '                    <p>모델은 홍콩과 싱가포르였다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="graphic-item2">' +
                    '                  <div>' +
                    '                    <p>2003년 출범한 노무현 정부는 중앙집권화된 권력을 나눠주기 위한</p>' +
                    '                    <p>지방분권을 추진했고 제주도가 실험무대가 됐다.</p>' +
                    '                    <p>지방정부가 어떤 정책을 추진하려 해도 국회나 중앙정부의 승인을 받아야 하는데</p>' +
                    '                    <p>특별자치도는 많은 권한을 옮겨받아 가능해질 수 있다는 것.</p>' +
                    '                    <p>행정의 효율화를 위해 기초자치단체(시,군)을 없앤 것도 이 때문이다.</p>' +
                    '                    <p>이 때부터 제주도민은 도지사만 뽑고 시장은 도지사가 임명한다.</p>' +
                    '                    <br>' +
                    '                    <p>그리고 이 행정실험의 목표는 \'국제자유도시\'였다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="graphic-item2">' +
                    '                  <div>' +
                    '                    <p>2001년 제주국제자유도시 기본계획이 확정됐고,</p>' +
                    '                    <p>2002년 4월 제주도는 대내외에 국제자유도시 출범을 선언한다.</p>' +
                    '                    <p>그렇게 \'국제자유도시\'는 제주의 최상위 비전이 됐다.</p>' +
                    '                    <p>\'국제자유도시종합계획\'은 제주에 적용되는 최상위 법정계획으로서</p>' +
                    '                    <p>지난 20년간 제주개발의 청사진 역할을 해왔다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank2"></div>' +
                    '              <div class="blank2"></div>' +
                    '              <div class="blank2"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page04">' +
                    '              <h3 data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="2000"' +
                    '              >20년이 지난 지금</h3>' +
                    '            </section>' +
                    '            ' +
                    '            <section class="page05">' +
                    '              <div class="scroll-graphic3">' +
                    '                <div class="graphic-item3">' +
                    '                  <img src="/site/images/js02.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item3">' +
                    '                  <p>2021년 6월</p>' +
                    '                  <br>' +
                    '                  <p>제주국제자유도시 비전 폐기를 위해 37개 시민사회단체와 정당이 연대회의 결성</p>' +
                    '                </div>' +
                    '                <div class="graphic-item3">' +
                    '                  <img src="/site/images/js03.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item3">' +
                    '                  <p>"제주국제자유도시 비전은 수명이 다했다</p>' +
                    '                  <p>이제는 도민의 삶의 질을</p>' +
                    '                  <p>어떻게 향상시킬 것인가에 초점을 맞춘 전략으로 바뀌어야 한다"</p>' +
                    '                </div>' +
                    '                <div class="graphic-item3">' +
                    '                  <p>2021년 7월</p>' +
                    '                  <p>위성곤 서귀포시 국회의원</p>' +
                    '                  <p>\'제주인들이 바라는 제주특별법 시즌2를 준비하다\' 토론회 중</p>' +
                    '                </div>' +
                    '                <div class="graphic-item3">' +
                    '                  <img src="/site/images/js04.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item3">' +
                    '                  <p>2022년 6월 당선 오영훈 제주도지사</p>' +
                    '                  <p>"제주국제자유도시 궤도 수정" 약속</p>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div id="page05" class="blank3"></div>' +
                    '              <div class="blank3"></div>' +
                    '              <div class="blank3"></div>' +
                    '              <div class="blank3"></div>' +
                    '              <div class="blank3"></div>' +
                    '              <div class="blank3"></div>' +
                    '              <div class="blank3"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '            ' +
                    '            <section class="page06">' +
                    '              <h3 data-aos="fade-up"  data-aos-easing="ease-in-sine" data-aos-duration="2000">왜?</h3>' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page07">' +
                    '              <p data-aos="fade-right"  data-aos-easing="ease-in-sine" data-aos-duration="1000">"도민의 삶을 담보로 추진한 신자유주의 실험"</p>' +
                    '              <br>' +
                    '              <p data-aos="fade-right"  data-aos-easing="ease-in-sine" data-aos-duration="1000">"개발을 위한 규제완화로 농지, 초지, 임야가 무분별한 개발과 부동산 투기 대상화"</p>' +
                    '              <br>' +
                    '              <p data-aos="fade-right"  data-aos-easing="ease-in-sine" data-aos-duration="1000">"끊임없이 부동산을 개발하는 국제자유도시는 소득 불평등 심화"</p>' +
                    '            </section>' +
                    '              ' +
                    '            <section class="page08">' +
                    '              <div class="scroll-graphic4">' +
                    '                <div class="graphic-item4" data-index="0">' +
                    '                  <p>국제자유도시를 만들기 위해</p>' +
                    '                  <p>투자자와 외부자본의 유치와 편익을 보장한다는 기조는</p>' +
                    '                  <p>개발 붐과 자연환경 파괴로 이어졌다.</p>' +
                    '                  <p>\'부동산 개발사업들에 불과했다\'는 비판이 나오는 이유다</p>' +
                    '                  <br>' +
                    '                  <p>성장 중심의 개발정책이 제주를 지배했고, 자연 뿐 아니라</p>' +
                    '                  <p>지역사회에 갈등이 늘어나 공동체 파괴라는 부작용도 생겼다.</p>' +
                    '                </div>' +
                    '                <div class="graphic-item4" data-index="1">' +
                    '                  <p>국제자유도시종합계획을 추진한 결과,</p>' +
                    '                  <p>도민의 삶의 질 하락과 자연환경의 훼손은 가속화된데 비해</p>' +
                    '                  <p>개발이익은 꾸준히 외부로 유출된다는 비판이 계속되고 있다.</p>' +
                    '                  <p>삶의 질이 오히려 떨어졌다고 냉혹한 평가가 이어진다.</p>' +
                    '                  <p>국제자유도시라는 최상위 비전을 이젠 수정해야 한다는 목소리도 높다.</p>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank4" data-index="0"></div>' +
                    '              <div class="blank4" data-index="1"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '            ' +
                    '            <section class="page09">' +
                    '            <div class="scroll-graphic5">' +
                    '                <div class="graphic-item5">' +
                    '                  <p>더 자세한 이야기가 궁금하다면</p>' +
                    '                  <h3>관련기사 보기</h3>' +
                    '                  <a class="link-box" href="">' +
                    '                    <img src="/site/images/js05.png" alt="">' +
                    '                  </a>' +
                    '                </div>' +
                    '                <div class="graphic-item5">' +
                    '                  <p>더 자세한 이야기가 궁금하다면</p>' +
                    '                  <h3>영상으로 정리한 제주국제자유도시 이야기</h3>' +
                    '                  <div class="link-box">' +
                    '                    <iframe width="838" height="605" src="https://www.youtube.com/embed/1XrH1IGCOrg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank5" data-index="0"></div>' +
                    '              <div class="blank5" data-index="1"></div>' +
                    '              ' +
                    '            </section>' +
                    '            ' +
                    '        </div>'
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });


        // 기사3
        blockManager.add("jejusound-news03", {
            label: "jejusound-news03",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    var _this = this;
                    newsController.initScrollEvent('.news03', '6')
                    newsController.initScrollEvent('.news03', '7')
                    newsController.initScrollEvent('.news03', '8')

                    newsController.initFadeInView('.news03', '.page05', '.scroll-graphic8', 'active')

                }
                var html = '<div>';
                html += '    <div class="content news03"> ' +
                '        <section class="page01"> ' +
                '            <div class="bg"> ' +
                '               <video autoPlay loop playsInline muted src="/site/images/jjs-video.mp4" ' +
                '                       type="video/quicktime" class="video"></video> ' +
                '            </div> ' +
                '            <div class="page01-text"> ' +
                '                <h2> ' +
                '                    격랑의 제주 ' +
                '                    <br/> ' +
                '                    관찰자의 기록 ' +
                '                    <small>21세기 제주 인터랙티브 아카이빙</small> ' +
                '                </h2> ' +
                '            </div> ' +
                '        </section> ' +
' ' +
                '        <section class="page02"> ' +
                '            <div class="scroll-graphic6"> ' +
                '                <div class="bg"> ' +
                '                    <img src="/site/images/jjs3-img01.png" alt=""/> ' +
                '                </div> ' +
                '                <div class="graphic-item6" data-index="0"> ' +
                '                    <div class="step"> ' +
                '                       <p><span>"Can you guess the busiest</span></p> ' +
                '                       <p><span>filght route in the world?"</span></p> ' +
                '                        <p class="font-small">세계에서 가장 붐비는 항공 노선은 어디일까요?</p> ' +
                '                        <br/> ' +
                '                        <br/> ' +
                '                        <p><span>"it was between South korea`s capital, Seoul</span></p> ' +
                '                       <p><span>and Jeju island"</span></p> ' +
                '                        <p class="font-small">한국의 수도의 서울과 제주도입니다</p> ' +
                '                    </div> ' +
                '                </div> ' +
                '                <div class="graphic-item6" data-index="1"> ' +
                '                    <div class="step"> ' +
                '                       <p>2018년 4월 영국 <strong>BBC</strong>는 "너무 많은 관광객과</p> ' +
                '                       <p>씨름하고 있는 전 세계 관광지 5곳"을 뽑았다.</p> ' +
                '                        <p>태국 마야베이, 이탈리아 첸퀘테레,</p> ' +
                '                        <p>페루 마추피추, 콜롬비아 카뇨 크리스탈레스.</p> ' +
                '                        <br/> ' +
                '                        <br/> ' +
                '                        <p><span>그리고 제주도.</span></p> ' +
                '                    </div> ' +
                '                </div> ' +
                '            </div> ' +
                '            <div class="blank6" data-index="0"></div> ' +
                '            <div class="blank6" data-index="1"></div> ' +
                '            <div class="blan"></div> ' +
                '        </section> ' +
' ' +
                '        <section class="page03"> ' +
                '            <div class="scroll-graphic7"> ' +
                '                <div class="bg"> ' +
                '                    <img src="/site/images/jjs3-img02.png" alt=""/> ' +
                '                </div> ' +
                '                <div class="graphic-item7" data-index="0"> ' +
                '                    <div id="page03" class="step"> ' +
                '                        <p><strong>BBC</strong>는 제주~서울이 전 세계에서</p> ' +
                '                        <p>이용객이 가장 많은 항공노선임을 강조했다</p> ' +
                '                        <p>제주도가 겪는 환경파괴, 쓰레기, 교통혼잡,</p> ' +
                '                        <p>관광수익의 지역환원 미비 등의 문제를 언급했다.</p> ' +
                '                    </div> ' +
                '                </div> ' +
                '                <div class="graphic-item7" data-index="1"> ' +
                '                    <div class="step"> ' +
                '                        <p>제주도에서는 입도세 도입 논의가 이어지고 있다.</p> ' +
                '                        <p>제주도를 방문하는 관광객 등에게</p> ' +
                '                        <p>완경오염에 따른 처리비용의 일정부분을 부담하도록 하는</p> ' +
                '                        <p><span>환경보전기여금</span>을 부과해야 할 상황이라는것.</p> ' +
                '                        <br/> ' +
                '                        <br/> ' +
                '                        <p><span>급증하는 관광객과 이에 따른 환경오염을</span></p> ' +
                '                        <p><span>이대로 둘 수는 없다는 위기의식이 크다.</span></p> ' +
                '                    </div> ' +
                '                </div> ' +
                '            </div> ' +
                '            <div class="blank7" data-index="0"></div> ' +
                '            <div class="blank7" data-index="1"></div> ' +
                '            <div class="blan"></div> ' +
                '        </section> ' +
' ' +
                '        <section class="page04"> ' +
                '            <div class="scroll-graphic8"> ' +
                '                <div class="bg"> ' +
                '                    <img src="/site/images/jjs3-img03.JPG" alt=""/> ' +
                '                </div> ' +
                '                <div class="graphic-item8" data-index="0"> ' +
                '                    <div id="page04" class="step"> ' +
                '                        <p>2000년대 이후 제주가 맞이한 변화는 극적이었다.</p> ' +
                '                        <p>1055만명이 넘는 관광객과 끊임없는 이주 열풍,</p> ' +
                '                        <p>이로 인해 벌어지는 현상들은 과거에는 상상하기 힘든 일이었다.</p> ' +
                '                        <p>수도권에서 가장 먼 섬에서 벌어진 놀라운 시대상이었다.</p> ' +
                '                    </div> ' +
                '                </div> ' +
                '                <div class="graphic-item8" data-index="1"> ' +
                '                    <div class="step"> ' +
                '                        <p class="font-big">지난 20년, 제주에서는 무슨 일이 있던 걸까?</p> ' +
                '                    </div> ' +
                '                </div> ' +
                '            </div> ' +
                '            <div class="blank8" data-index="0"></div> ' +
                '            <div class="blank8" data-index="1"></div> ' +
                '            <div class="blan"></div> ' +
                '        </section> ' +
' ' +
                '        <section class="page05"> ' +
                '            <h3 data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="2000">격량의 제주</h3> ' +
                '            <h3 data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="2000">관찰자의 기록</h3> ' +
                '            <p data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="2000">21세기 제주 인터랙티브 ' +
                '                아카이빙</p> ' +
' ' +
                '           <a data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="2000" ' +
                '               href="">이동하기</a> ' +
                '        </section> ' +
                '    </div> '
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });


        // 기사4
        blockManager.add("jejusound-news04", {
            label: "jejusound-news04",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    var _this = this;
                    newsController.initScrollEvent('.news04', '9')

                    var fal = true;
                    var fal2 = true;
                    var videofal = true;
                    var videofal2 = true;

                    $(window).on("scroll", () => {
                        const scrollBottom = $(window).scrollTop() + $(window).height();

                        //3자리마다 , 찍기
                        function numberWithCommas(x) {
                            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }

                        //page 02 숫자 카운트
                        const count01 =  $('.news04 .page02 .blank9')
                        let countbtm01

                        if(count01.length){
                            countbtm01 = count01.offset().top;
                        }

                        if(scrollBottom>countbtm01){
                            if(fal == true){
                                var memberCountConTxt= 577187;
                                var memberCountConTxt2= 700083;

                                $({ val : 0 }).animate({ val : memberCountConTxt }, {
                                    duration: 2000,
                                    step: function() {
                                        var num = numberWithCommas(Math.floor(this.val));
                                        $(".count01").text(num);
                                    },
                                    complete: function() {
                                        var num = numberWithCommas(Math.floor(this.val));
                                        $(".count01").text(num);
                                    }
                                });
                                $({ val : 0 }).animate({ val : memberCountConTxt2 }, {
                                    duration: 2000,
                                    step: function() {
                                        var num2 = numberWithCommas(Math.floor(this.val));
                                        $(".count02").text(num2);
                                    },
                                    complete: function() {
                                        var num2 = numberWithCommas(Math.floor(this.val));
                                        $(".count02").text(num2);
                                    }
                                });
                                fal = false;
                            }

                        }
                        //page 04 숫자 카운트
                        const count02 =  $('.news04 .page04 .count-start')
                        let countbtm02

                        if(count02.length){
                            countbtm02 = count02.offset().top;
                        }

                        if(scrollBottom>countbtm02){
                            if(fal2 == true){
                                var memberCountConTxt3= 4110934;
                                var memberCountConTxt4= 15852980;

                                $({ val : 0 }).animate({ val : memberCountConTxt3 }, {
                                    duration: 2000,
                                    step: function() {
                                        var num3 = numberWithCommas(Math.floor(this.val));
                                        $(".count03").text(num3);
                                    },
                                    complete: function() {
                                        var num3 = numberWithCommas(Math.floor(this.val));
                                        $(".count03").text(num3);
                                    }
                                });
                                $({ val : 0 }).animate({ val : memberCountConTxt4 }, {
                                    duration: 2000,
                                    step: function() {
                                        var num4 = numberWithCommas(Math.floor(this.val));
                                        $(".count04").text(num4);
                                    },
                                    complete: function() {
                                        var num4 = numberWithCommas(Math.floor(this.val));
                                        $(".count04").text(num4);
                                    }
                                });
                                fal2 = false;
                            }

                        }


                        //page 03 비디오 재생
                        const videostart =  $('.news04 .page03 .video-start')
                        let videobt
                        if(videostart.length){
                            videobt = videostart.offset().top;
                        }
                        if(scrollBottom>videobt){
                            if(videofal == true) {
                                $('.news04 .page03 .play-video').trigger('play');
                                videofal = false;
                            }
                        }

                        //page 03 비디오 재생2
                        const videostart2 =  $('.news04 .page03 .video-start2')
                        let videobt2
                        if(videostart2.length){
                            videobt2 = videostart2.offset().top;
                        }
                        if(scrollBottom>videobt2){
                            if(videofal2 == true) {
                                $('.news04 .page03 .play-video2').trigger('play');
                                videofal2 = false;
                            }
                        }

                    })


                }
                var html = '<div>';
                html +=
                '    <div class="content news04"> ' +
                '        <section class="page01"> ' +
                '            <div class="bg"> ' +
                '                <img src="/site/images/jjs4-img1.JPG" alt=""/> ' +
                '            </div> ' +
                '            <div class="page01-text"> ' +
                '                <h2> ' +
                '                    02 ' +
                '                    <br/> ' +
                '                    섬에 사람이 쏟아지다 ' +
                '                </h2> ' +
                '            </div> ' +
                '        </section> ' +
' ' +
                '        <section class="page02"> ' +
                '            <div class="scroll-graphic9"> ' +
                '                <div class="bg"> ' +
                '                    <img src="/site/images/jjs4-img2.jpg" alt=""/> ' +
                '                </div> ' +
                '                <div class="graphic-item9" data-index="0"> ' +
                '                    <div class="step"> ' +
                '                        <div class="num-main"> ' +
                '                            <div class="num-box "> ' +
                '                                <p>2010년 제주도 인구</p> ' +
                '                                <p class="font-big count01">0</p> ' +
                '                            </div> ' +
                '                            <div class="num-box"> ' +
                '                                <p>2022년 제주도 인구</p> ' +
                '                                <p class="font-big count02">700,083</p> ' +
                '                            </div> ' +
                '                        </div> ' +
' ' +
                '                        <span>10년 동안 13만명(22.6%)↑</span> ' +
                '                    </div> ' +
                '                </div> ' +
                '                <div class="graphic-item9" data-index="1"> ' +
                '                    <div class="step"> ' +
                '                        <p>지방소멸을 말하는 시대</p> ' +
                '                        <p>역설적으로 수도권에서 거리가 먼</p> ' +
                '                        <p>제주도는 인구가 급증했다. </p> ' +
                '                        <p>2010년 전만해도 인구 유출을 우려하던 제주도는 </p> ' +
                '                        <p>전혀 다른 시대에 살게 됐다. </p> ' +
                '                        <p>은퇴 후 제주를 찾은 고령자가 아니라 </p> ' +
                '                        <p>상대적으로 젊은 인구가 늘어났다는 점도 특징이다.</p> ' +
                '                    </div> ' +
                '                </div> ' +
                '            </div> ' +
                '            <div class="blank9" data-index="0"> ' +
                '            </div> ' +
                '            <div class="blank9" data-index="1"></div> ' +
                '            <div class="blan"></div> ' +
                '        </section> ' +
' ' +
                '        <section class="page03"> ' +
                '            <div class="content-box"> ' +
                '                <h2>누가 얼마나 왔을까</h2> ' +
                '                <br> ' +
                '                    <br> ' +
                '                        <img src="/site/images/jjs4-table1.png" alt=""> ' +
                '                            <br> ' +
                '                                <br> ' +
                '                                    <p>제주이주열풍이 가장 거셌던 시기는 2016년이었다.</p> ' +
                '                                    <p>한 해 늘어난 인구가 14000명이 넘었다.</p> ' +
                '                                    <br> ' +
                '                                        <br> ' +
                '                                            <img src="/site/images/jjs4-table2.png" alt=""> ' +
                '                                                <br> ' +
                '                                                    <br> ' +
                '                                                        <p>제주도는 청년인구 유출이 걱정이었던 지방이었다.</p> ' +
                '                                                        <p>그러나 2010년대 들어 많은 20~30대가 제주로 이주하면서</p> ' +
                '                                                        <p>순유입이 순유출을 앞질렀다.</p> ' +
                '                                                        <br> ' +
                '                                                            <br> ' +
                '                                                                <p><span>제주가 대안적인 삶의 공간으로 떠오르고, </span> ' +
                '                                                                </p> ' +
                '                                                                <p> ' +
                '                                                                    <span>청년들의 탈서울 정서가 맞물린 것으로 풀이된다.</span> ' +
                '                                                                </p> ' +
                '                                                                <p> ' +
                '                                                                    <span>한달살이 열풍, 제주영어교육도시 조성과 국제학교 건립, </span> ' +
                '                                                                </p> ' +
                '                                                                <p><span>인기 엔터테이너 이효리로 대표되는 유명인들의 제주살이 러시도</span> ' +
                '                                                                </p> ' +
                '                                                                <p><span>영향을 미친 것으로 추정된다.</span></p> ' +
                '                                                                <br> ' +
                '                                                                    <br> ' +
                '                                                                        <p>인구 증가는 경제성장으로 이어졌다.</p> ' +
                '                                                                        <p>2010년 1.8%였던 제주의 경제성장률은 </p> ' +
                '                                                                        <p>2015년 7.4%, 2016년 8%까지 ' +
                '                                                                            치솟았다. </p> ' +
                '            </div> ' +
                '        </section> ' +
' ' +
                '        <section class="page03"> ' +
                '            <div class="content-box"> ' +
                '                <h2>한 풀 꺽인 이주열풍</h2> ' +
                '                <br> ' +
                '                    <br> ' +
                '                       <video muted src="/site/images/CHART2.mp4" type="video/quicktime" ' +
                '                               class="video play-video"></video> ' +
                '                        <br> ' +
                '                            <br> ' +
                '                                <p class="video-start">제주 인구는 여전히 늘고 있지만 그 상승세는 크게 꺾였다.</p> ' +
                '                                <p>한 때 제주의 매력성을 강조하며 제주살이 열풍을 부채질하던</p> ' +
                '                                <p>언론들은 ‘제주살이 열풍이 끝났다’고 진단하기도한다.</p> ' +
                '                                <br> ' +
                '                                    <br> ' +
                '                                        <p>제주 인구유입이 줄어든 이유는 복합적이다.</p> ' +
                '                                        <br> ' +
                '                                            <br> ' +
                '                                                <p>부동산 광풍으로 급등한 집값에 비해 </p> ' +
                '                                                <p>임금수준은 열악하다는점이 원인 중 하나로 꼽힌다.</p> ' +
                '                                                <p>제주의 근로자 1인 평균소득은 전국 최하위로 전국평균보다 500만원 낮다.</p> ' +
                '                                                <p>5인 미만 영세기업이 82%에 이르는 제주에서</p> ' +
                '                                                <p>안정적이고 지속적인 일자리를 얻는 것은 쉬운 일이 아니었다.</p> ' +
                '                                                <br> ' +
                '                                                    <br> ' +
                '                                                        <p>기존 거주지과는 다른 문화적 풍토와 작은 마을의 배타성 등을</p> ' +
                '                                                        <p>어려움으로 호소하는 사례도 있었다.</p> ' +
                '                                                        <p>체계적인 분석과 시장조사 없이 제주에 대한 환상을 기반으로</p> ' +
                '                                                        <p>이주한 경우, 현실적 삶에 대한 만족도가 떨어지는 경우도 많았다.</p> ' +
                '                                                        <br> ' +
                '                                                            <br> ' +
                '                                                                <p> ' +
                '                                                                    <span>여행지로서의 제주와 삶의 공간으로의 제주는 별개이며,</span> ' +
                '                                                                </p> ' +
                '                                                                <p> ' +
                '                                                                    <span>삶의 터전을 옮긴다는 것은 간단한 문제가 아니었다.</span> ' +
                '                                                                </p> ' +
                '            </div> ' +
                '        </section> ' +
' ' +
                '        <section class="page04"> ' +
                '            <div class="bg"> ' +
                '                <img src="/site/images/jjs4-img4.JPG" alt=""/> ' +
                '            </div> ' +
                '            <div class="step"> ' +
                '                <div class="num-main"> ' +
                '                    <div class="num-box"> ' +
                '                        <p>2001년 제주 방문 관광객</p> ' +
                '                        <p class="font-big count03">0</p> ' +
                '                    </div> ' +
                '                    <div class="num-box"> ' +
                '                        <p>2016년 제주 방문 관광객</p> ' +
                '                        <p class="font-big count04">0</p> ' +
                '                    </div> ' +
                '                </div> ' +
' ' +
                '                <span class="count-start">15년만에 1174만명(286%)↑</span> ' +
                '            </div> ' +
                '        </section> ' +
' ' +
                '        <section class="page03"> ' +
                '            <div class="content-box"> ' +
                '                <h2>관광객이 쏟아지다</h2> ' +
                '                <br> ' +
                '                    <br> ' +
                '                       <video muted src="/site/images/CHART3.mp4" type="video/quicktime" ' +
                '                               class="video play-video2"></video> ' +
                '                        <br> ' +
                '                            <br> ' +
                '                                <p class="video-start2">2005년 500만, 2013년 1000만명, 2016년 1585만.</p> ' +
                '                                <p>본래 관광도시로 불리던 곳이었지만 2000년대 </p> ' +
                '                                <p>제주 방문 관광객의 상승세는 놀라웠다.</p> ' +
                '                                <br> ' +
                '                                    <br> ' +
                '                                        <img src="/site/images/jjs4-chart.png" alt=""> ' +
                '                                            <br> ' +
                '                                                <br> ' +
                '                                                    <p>상승세를 이끈 것은 ‘내국인 개별관광객’이었다.</p> ' +
                '                                                    <br> ' +
                '                                                        <br> ' +
                '                                                            <p>이런 관광 패턴변화는 저가항공사(LCC) 확대, 올레길 열풍, </p> ' +
                '                                                            <p>제주 한달살이 행렬 등과 맞물려 대세가 됐다 .</p> ' +
                '                                                            <p>조용했던 제주 읍면지역 곳곳에 카페와 맛집들이 들어서고 </p> ' +
                '                                                            <p>이곳이 기존 관광지 역할을 대체하는 모습,</p> ' +
                '                                                            <p>기존에 알려지지 않았던 자연공간이나 마을이</p> ' +
                '                                                            <p>소위 ‘핫플’이 되는 흐름이 본격화됐다.</p> ' +
                '            </div> ' +
                '        </section> ' +
' ' +
                '        <section class="page03"> ' +
                '            <div class="content-box"> ' +
                '                <h2>지역내총생산(GRDP) ↑</h2> ' +
                '                <br> ' +
                '                    <br> ' +
                '                        <div class="num-main"> ' +
                '                            <div class="num-box"> ' +
                '                                <p>2010년</p> ' +
                '                                <p class="font-big">11,158,882</p> ' +
                '                            </div> ' +
                '                            <div class="num-box"> ' +
                '                                <p>2020년</p> ' +
                '                                <p class="font-big">19,615,758</p> ' +
                '                            </div> ' +
                '                        </div> ' +
                '                        <br> ' +
                '                            <br> ' +
                '                                <p class="blue-text">“10년 동안 76%↑”</p> ' +
                '                                <br> ' +
                '                                    <br> ' +
                '                                        <p>인구와 관광객의 급증은 자연스럽게 외형적 성장으로 이어졌다.</p> ' +
                '                                        <p>지역별 경제 지표 중 대표적인 것이 </p> ' +
                '                                        <p>지역 내 총생산(GRDP: Gross Regional Domestic Product).</p> ' +
                '                                        <p>규모가 팽창하자 제주도의 GRDP도 늘어났다.</p> ' +
                '                                        <p>한해 제주관광 수입은 6조원 규모에 이른다.</p> ' +
                '                                        <br> ' +
                '                                            <br> ' +
                '                                                <p>외형적으로 크게 성장하는 제주의 모습은</p> ' +
                '                                                <p>인구 유치나 경제적 발전 계기를 찾기 힘든</p> ' +
                '                                                <p>많은 지자체에서 부러워할만한 상황으로 여겨졌다.</p> ' +
                '                                                <br> ' +
                '                                                    <br> ' +
                '                                                        <p>그러나... </p> ' +
                '            </div> ' +
' ' +
                '            <p class="link-msg">| 다음 편으로 이동하기 |</p> ' +
                '            <a href=""> </a> ' +
' ' +
                '        </section> ' +
' ' +
                ' ' +
                '    </div> '
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 기사5
        blockManager.add("jejusound-news05", {
            label: "jejusound-news05",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    var _this = this;
                    newsController.initScrollEvent('.news05', '10')

                }
                var html = '<div>';
                html +=
                '    <div class="content news05">' +
                '        <section class="page01">' +
                '            <div class="bg">' +
                '                <img src="/site/images/jjs05-img.JPG" alt=""/>' +
                '            </div>' +
                '            <div class="page01-text">' +
                '                <h2>' +
                '                    04' +
                '                    <br/>' +
                '                    한계 부딪친 하수처리' +
                '                </h2>' +
                '            </div>' +
                '        </section>' +
'' +
                '        <section class="page02">' +
                '            <div class="scroll-graphic10">' +
                '               <div class="graphic-item10 visible"><img class="scene-img"' +
                '                                                            src="/site/images/jjs05-img2.jpg"' +
                '                                                             alt=""/></div>' +
                '               <div class="graphic-item10"><img class="scene-img"' +
                '                                                     src="/site/images/jjs05-img2.jpg" alt=""/></div>' +
                '               <div class="graphic-item10"><img class="scene-img"' +
                '                                                     src="/site/images/jjs05-img3.JPG" alt=""/></div>' +
                '               <div class="graphic-item10"><img class="scene-img"' +
                '                                                     src="/site/images/jjs05-img4.JPG" alt=""/></div>' +
                '               <div class="graphic-item10"><img class="scene-img"' +
                '                                                     src="/site/images/jjs05-img5.JPG" alt=""/></div>' +
                '               <div class="graphic-item10"><img class="scene-img"' +
                '                                                     src="/site/images/jjs05-img6.JPG" alt=""/></div>' +
                '            </div>' +
                '            <div class="scroll-text">' +
                '                <div class="blank10">' +
                '                    <p>하수처리장이 하수를 제대로 정화하지 못하고</p>' +
                '                    <p>오염된 물이 바다에 흘러들어간다면?</p>' +
                '                    <p>그 곳이 청정자연의 상징으로 여겨지는 제주도라면?</p>' +
                '                    <br>' +
                '                        <p>그 일이 제주에서 실제로 일어났다.</p>' +
                '                </div>' +
                '                <div class="blank10">' +
                '                    <p>2016년 8월, 제주도 상하수도본부는 예고 없이</p>' +
                '                    <p>도청 기자실을 찾아 지난 3년간 제주하수처리장의</p>' +
                '                    <p>방류수 수질이 기준치를 넘어섰다고 고백했다. </p>' +
                '                    <p>' +
                '                        <제주의소리>가 이 문제로 취재를 시작하자' +
                '                    </p>' +
                '                    <p>부랴부랴 언론대응에 나선 것이다.</p>' +
                '                    <br>' +
                '                        <p>제주 최대의 하수처리시설인 제주하수처리장은 </p>' +
                '                        <p>제주시 19개 동지역에서 발생하는 하수가 모이는 곳이다. </p>' +
                '                </div>' +
                '                <div class="blank10">' +
                '                    <p>화장실, 주방 등에서 사용한 물이</p>' +
                '                    <p>하수도를 거쳐 이곳으로 향한다.</p>' +
                '                    <p>유입된 하수는 유입침사지를 거쳐</p>' +
                '                    <p>자갈과 모래 등이 제거되고 침전지로 향하고,</p>' +
                '                    <p>슬러지(폐수의 부유물질이 침전된 생긴 가루)를 걸러내는데</p>' +
                '                    <p>여기서 핵심적인 역할을 하는 것이 미생물이다. </p>' +
                '                    <br>' +
                '                        <p>그런데 미생물이 사멸한 것이다.</p>' +
                '                </div>' +
                '                <div class="blank10">' +
                '                    <p>매립장 침출수와 음식물 배출수에서 나오는</p>' +
                '                    <p>탈리액이 원인으로 추정됐다. </p>' +
                '                    <p>악성 물질 과다 배출로 미생물이 죽었다는 얘기다.</p>' +
                '                    <br>' +
                '                        <p>취재 결과 2015년 6월부터 12월까지 125일간, </p>' +
                '                        <p>2016년 1월부터 7월까지 197일간</p>' +
                '                        <p>기준치를 5배 이상 초과한 물이 </p>' +
                '                        <p>제주 앞바다로 방류된 사실이 확인됐다.</p>' +
                '                </div>' +
                '                <div class="blank10">' +
                '                    <p>제주참여환경연대 등 시민사회에서는</p>' +
                '                    <p>“제주도가 하수처리 실태를 은폐했다”며</p>' +
                '                    <p>“제주도의 환경 수용 능력을 검토하지 않고 </p>' +
                '                    <p>개발지상주의와 성장주의로 치달으면서 벌어진 일”이라고 </p>' +
                '                    <p>비판했다.</p>' +
                '                    <br>' +
                '                        <p>제주도는 하수처리시설 증설과 신설 등</p>' +
                '                        <p>인프라 확대로 문제를 해결하려 하지만</p>' +
                '                        <p>이것도 여의치 않다.</p>' +
                '                </div>' +
                '                <div class="blank10">' +
                '                    <p>제주도는 제주하수처리장을 지하화해</p>' +
                '                    <p>하루 유입량 22만톤까지 견딜 수 있는 </p>' +
                '                    <p>‘제주 공공하수처리시설 현대화사업’을 선언했지만</p>' +
                '                    <p>몇 년째 첫 삽도 뜨지 못하고 있다.</p>' +
                '                    <br>' +
                '                        <p>제주 동부지역 하수를 처리하는 월정리의 </p>' +
                '                        <p>제주동부하수처리장 증설 사업을 추진 중이지만</p>' +
                '                        <p>주민들의 거센 반발에 부딪친 상태다.</p>' +
                '                </div>' +
                '                <div class="link">' +
                '                    <p class="link-msg">| 다음 편으로 이동하기 |</p>' +
                '                    <a href=""></a>' +
                '                </div>' +
                '            </div>' +
                '        </section>' +
'' +
                '' +
                '    </div> '
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });


        // 기사6
        blockManager.add("jejusound-news06", {
            label: "jejusound-news06",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    var _this = this;

                }
                var html = '<div>';
                html +=
                '    <div class="content news06">' +
                '        <section class="page01">' +
                '            <div class="bg">' +
                '                <img src="/site/images/jjs6-img.png" alt=""/>' +
                '            </div>' +
                '            <div class="page01-text">' +
                '                <h2>' +
                '                    05' +
                '                    <br/>' +
                '                    차가 막혀도 너무 막혀' +
                '                </h2>' +
                '            </div>' +
                '        </section>' +
'' +
                '        <section class="page02">' +
                '            <div class="bg">' +
                '                <img src="/site/images/jjs6-img2.JPG" alt=""/>' +
                '            </div>' +
                '            <div class="content-box">' +
                '                <h2>차가 늘어나다</h2>' +
                '                <br>' +
                '                    <br>' +
                '                        <img src="/site/images/jjs6-img3.gif" alt="">' +
                '                            <br>' +
                '                                <br>' +
                '                                    <p>전국에서 집값, 땅값이 가장 빠르게 오르는 곳이 </p>' +
                '                                    <p>제주가 될 거라고 누가 상상했을까.</p>' +
                '                                    <p>전국 1위일 뿐아니라 다른 지역과 편차가 몇 배에 이르렀다. </p>' +
                '                                    <br>' +
                '                                        <br>' +
                '                                            <p>2010년부터 2014년 10월까지 제주 주택매매가격은</p>' +
                '                                            <p>15.3% 올랐는데 이는 전국의 두 배 수준이다. </p>' +
                '                                            <p>특히 이 기간 아파트는 33.7% 올라 전국(11.1%)의 3배를 넘었다.</p>' +
                '                                            <br>' +
                '                                                <br>' +
                '                                                    <br>' +
                '                                                        <p>2015년과 2016년은 드라마틱한 시기였다. </p>' +
                '                                                        <p>제주는 2년 연속 전국에서 집값과 땅값 모두 가장 많이 오른 지역이었다. </p>' +
                '                                                        <p>각종 부동산 관련 통계에 ‘전국 최고, 사상 최대’라는 설명이 붙었다.</p>' +
                '                                                        <br>' +
                '                                                            <br>' +
                '                                                                <p>제주가 내놓은 대책은 수요관리 정책이었다. </p>' +
                '                                                                <p>차고지가 있어야만 신차 구매가 가능한 차고지증명제를' +
                '                                                                    도입했고, </p>' +
                '                                                                <p>렌터카를 줄이기 위한 렌터카 총량제를 실시했지만 </p>' +
                '                                                                <p>업체들과 법정공방 끝에 패소하면서 실효성이 떨어진 상황이다.</p>' +
                '                                                                <br>' +
                '                                                                    <br>' +
                '                                                                        <p>고질적인 교통난을 해결하기 위해 </p>' +
                '                                                                        <p>2017년 대중교통체계 개편을 선언했다. </p>' +
                '                                                                        <p>버스전용차로가 도입됐고, 노선을 전면' +
                '                                                                            개편했다. </p>' +
                '                                                                        <p>그러나 유동인구가 적은 곳의 노선이' +
                '                                                                            삭제되고, </p>' +
                '                                                                        <p>지역별 환승센터 건십 사업도 경제성 문제로' +
                '                                                                            백지화됐다.</p>' +
                '                                                                        <br>' +
                '                                                                            <br>' +
                '                                                                                <p>결국 근본적인 해결을 위해서는 </p>' +
                '                                                                                <p>차량 수요정책을 비롯해 </p>' +
                '                                                                                <p>대중교통, 주차공간 확보, 제3의' +
                '                                                                                    교통수단 등과 맞물려</p>' +
                '                                                                                <p>통합적인 로드맵이 나와야 한다는 제언이' +
                '                                                                                    나온다. </p>' +
                '                                                                                <br>' +
                '                                                                                    <br>' +
                '                                                                                        <br>' +
                '                                                                                           <a target="_blank"' +
                '                                                                                               href="https://youtu.be/nZz6CLQfE1M">' +
                '                                                                                                <img' +
                '                                                                                                   src="/site/images/jjs6-img4.jpg"' +
                '                                                                                                    alt="">' +
                '                                                                                            </a>' +
                '            </div>' +
                '            <!-- <div class="link">' +
                '             <p class="link-msg">| 다음 편으로 이동하기 |</p>' +
                '             <a href=""> </a>' +
                '           </div> -->' +
                '        </section>' +
'' +
                '' +
                   ' </div>'
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });


        // 기사7
        blockManager.add("jejusound-news07", {
            label: "jejusound-news07",
            category: 'SAMPLE PAGE',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    var _this = this;
' +'
                }
                var html = '<div>';
                html +=
                '    <div class="content news07">' +
                '        <section class="page01">' +
                '            <div class="bg">' +
                '                <img src="/site/images/jjs07-img.JPG" alt=""/>' +
                '            </div>' +
                '            <div class="page01-text">' +
                '                <h2>' +
                '                    07' +
                '                    <br/>' +
                '                    부동산 광풍' +
                '                </h2>' +
                '            </div>' +
                '        </section>' +
'' +
                '        <section class="page02">' +
                '            <img src="/site/images/jjs07-img2.jpg" alt="">' +
                '                <div class="content-box">' +
                '                    <br>' +
                '                        <p>전국에서 집값, 땅값이 가장 빠르게 오르는 곳이 </p>' +
                '                        <p>제주가 될 거라고 누가 상상했을까.</p>' +
                '                        <p>전국 1위일 뿐아니라 다른 지역과 편차가 몇 배에 이르렀다. </p>' +
                '                        <br>' +
                '                            <br>' +
                '                                <p>2010년부터 2014년 10월까지 제주 주택매매가격은</p>' +
                '                                <p>15.3% 올랐는데 이는 전국의 두 배 수준이다. </p>' +
                '                                <p>특히 이 기간 아파트는 33.7% 올라 전국(11.1%)의 3배를 넘었다.' +
                '                                </p>' +
                '                                <br>' +
                '                                    <br>' +
                '                                        <p>2015년과 2016년은 드라마틱한 시기였다. </p>' +
                '                                        <p>제주는 2년 연속 전국에서 집값과 땅값 모두 가장 많이 오른 지역이었다. </p>' +
                '                                        <p>각종 부동산 관련 통계에 ‘전국 최고, 사상 최대’라는 설명이 붙었다.</p>' +
                '                                        <br>' +
                '                                            <br>' +
                '                                                <h3>국토부 개별공시지가</h3>' +
                '                                                <br>' +
                '                                                    <img src="/site/images/jjs07-img3.gif" alt="">' +
                '                                                        <br>' +
                '                                                            <br>' +
                '                                                                <p>부동산 가격 상승의 가장 큰 원인은</p>' +
                '                                                                <p>이주 열풍으로 매해 1만명이 넘게 불어난 인구와</p>' +
                '                                                                <p>부쩍 늘어난 각종 대형 개발사업. </p>' +
                '                                                                <br>' +
                '                                                                    <br>' +
                '                                                                        <p>사람들이 늘어나자 주택매매거래가 급증했고, </p>' +
                '                                                                        <p>자연스레 건축허가 건수도 증가했다.</p>' +
                '                                                                        <p>부동산 시장이 꿈틀대자 투기세력까지' +
                '                                                                            끼어들면서 </p>' +
                '                                                                        <p>가격 상승을 부채질했다.</p>' +
                '                                                                        <br>' +
                '                                                                            <br>' +
                '                                                                                <br>' +
                '                                                                                   <a target="_blank"' +
                '                                                                                       href="https://youtu.be/nZz6CLQfE1M">' +
                '                                                                                        <img' +
                '                                                                                           src="/site/images/jjs07-img4.jpg"' +
                '                                                                                            alt="">' +
                '                                                                                    </a>' +
                '                </div>' +
'' +
                '        </section>' +
                '        <section class="page02">' +
                '            <img src="/site/images/jjs07-img5.jpg" alt="">' +
                '                <div class="content-box">' +
                '                    <br>' +
                '                        <h2>양극화가 심해지다</h2>' +
                '                        <br>' +
                '                            <p>자산축적 수단이 된 부동산.</p>' +
                '                            <p>부동산 급등으로 제주지역은 전국에서 가계 순자산이 전국 최고 수준으로 올랐다.</p>' +
                '                            <p>동시에 격차가 벌어지면서 자산불평등이 심각해졌다.</p>' +
                '                            <br>' +
                '                                <br>' +
                '                                    <p>다음은 한국은행이 2022년 7월 발표한 </p>' +
                '                                    <p>"제주지역 가계순자산 규모 및 자산 격차 현황" 보고서 주요 내용이다.</p>' +
                '                                    <br>' +
                '                                        <br>' +
                '                                            <p><span>- 제주지역 가계 평균 순자산은 서울을 제외하면 전국 16개 시도중 가장 높다</span>' +
                '                                            </p>' +
                '                                            <p><span>- 불평등지수(지니계수)도 전국에서 서울에 이어 두 번째로 높다</span></p>' +
                '                                            <p><span>- 청년세대 가구 간 자산불평등이 심각하며, 점점 심해지고 있다</span></p>' +
                '                                            <p><span>- 청년세대간 불평등은 세대간 자산이전이 주된 원인으로 보인다</span></p>' +
                '                                            <br>' +
                '                                                <br>' +
                '                                                    <p>2010년대부터 코로나 팬데믹 이후 까지,</p>' +
                '                                                    <p>지금 제주에서는 자산 격차가 심해지면서</p>' +
                '                                                    <p>상속이나 증여로 인한 부의 대물림도 강화되고 있다.</p>' +
                '                                                    <p> 세대간 자산이전을 보여주는 증여세가 </p>' +
                '                                                    <p>2017년 160억원에서 2021년에는 402억원으로 급증했다.</p>' +
                '                                                    <br>' +
                '                                                        <br>' +
                '                                                            <p>부동산 광풍이 바꿔놓은 제주사회의 모습이다. </p>' +
                '                </div>' +
                '                <div class="link">' +
                '                    <a href=""> </a>' +
                '                    <p class="link-msg">| 다음 편으로 이동하기 |</p>' +
                '                </div>' +
                '        </section>' +
'' +
                '' +
                    '</div>'
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });



        // 샘플 타이틀 01
        blockManager.add("jejusound-title-01", {
            label: "jejusound-title-01",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: '<div class="content news01">' +
                '' +
                '            <section class="page01">' +
                '               <div class="bg">' +
                '                   <img src="/site/images/jejuimage01.png" alt="">' +
                '                </div>' +
                '              <div class="page01-text">' +
                '                <h2>쓰레기섬 제주? <small>쓰레기장은 포화상태, 1인당 생활폐기물 배출량 전국 1위</small></h2>' +
                '                ' +
                '              </div>' +
                '              <a href="#page02" onclick="return true"  class="icon-scroll">' +
                '                <i class=\'bx bx-mouse\' ></i>' +
                '                <i class=\'bx bx-chevrons-down\' ></i>' +
                '              </a>' +
                '            </section>' +
                '            ' +
                '        </div>'
        });

        // 샘플 휠 내용
        blockManager.add("jejusound-WheelContent-01", {
            label: "jejusound-WheelContent-01",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    newsController.initScrollEvent('.news01', '');
                }
                var html = '<div>';
                html += '<div class="content news01">' +
                    '' +
                    '            <section class="page02">' +
                    '              <div class="scroll-graphic">' +
                    '               <div class="bg">' +
                    '                   <img src="/site/images/jejuimage02.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item" data-index="0">' +
                    '                  <div id="page02" class="step">' +
                    '                    <p >핵심은 감당할 수 없을 정도로 쓰레기가 쏟아지고 있다는 것.</p>' +
                    '                    <p>현재 제주시 회천동에 있는 북부소각장은 하루 평균 140톤을</p>' +
                    '                    <p>처리할 수 있는데, 하루에 반입되는 쓰레기는 201톤.</p>' +
                    '                    <p>매일 70톤의 쓰레기가 쌓여간다는 얘기입니다.</p>' +
                    '                    <p>쓰레기를 압축해 주변에 쌓아두고 있는데 이 공간마저</p>' +
                    '                    <p>부족한 상황입니다.</p>' +
                    '                    <p>현재 갈 곳을 잃고 야적된 압축 쓰레기는 무려 5만톤.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="graphic-item" data-index="1">' +
                    '                  <div class="step">' +
                    '                    <p>제주도의 쓰레기는 하루 이틀 문제가 아닙니다.</p>' +
                    '                    <p>제주의 1인당 쓰레기 베출량은 전국 최고 수준.</p>' +
                    '                    <p>급격히 불어난 1년 1500만명씩 찾아오는 관광객이 버린</p>' +
                    '                    <p>쓰레기가 주 원인입니다.</p>' +
                    '                    <p>쓰레기를 압축해 주변에 쌓아두고 있는데 이 공간마저</p>' +
                    '                    <p>제주 이주 붐으로 인구가 급증하고, 이 흐름에 맞춰 각종</p>' +
                    '                    <p>건축과 개발이 늘어난 것도 악역향을 줬습니다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank" data-index="0"></div>' +
                    '              <div class="blank" data-index="1"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '            ' +
                    '        </div>';

                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 지도 모달
        blockManager.add("jejusound-MapModal", {
            label: "jejusound-MapModal",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    newsController.initMapModal('.page03-map .map-senter01', '.modal01');
                    newsController.initMapModal('.page03-map .map-senter02', '.modal02');
                    newsController.initMapModal('.page03-map .map-senter03', '.modal04');
                    newsController.initMapModal('.page03-map .map-senter04', '.modal03');
                }
                var html = '<div>'
                html += '<div class="content news01">' +
                '            <section class="page03">' +
                '               <div class="bg">' +
                '                   <img src="/site/images/jejuimage03.png" alt="">' +
                '                </div>' +
                '              <div class="page03-text">' +
                '                <h2>주요 쓰레기매립장 상황</h2>' +
                '                <p>공공데이터포털 / 2021.1.2. 기준</p>' +
                '              </div>' +
                '              ' +
                '              <div class="page03-map">' +
                '                <img src="/site/images/jejumap.png" alt="">' +
                '                <button class="map-senter01"></button>' +
                '                <button class="map-senter02"></button>' +
                '                <button class="map-senter03"></button>' +
                '                <button class="map-senter04"></button>' +
                '              </div>' +
                '              ' +
                '                <div class="page03-modal modal01">' +
                '                  <h3>제주환경자원순환센터</h3>' +
                '                  <img src="/site/images/jejumap01.png" alt="">' +
                '                  <strong class="active">5%</strong>' +
                '                  <p>매립용량%: 2,417,179 m³ / 현재매립량: 118,837 m³</p>' +
                '                  <button class="modalClose">' +
                '                    <i class=\'bx bx-x\'></i>' +
                '                  </button>' +
                '                </div>' +
                '                <div class="page03-modal modal02">' +
                '                  <h3>화천매립장</h3>' +
                '                  <img src="/site/images/jejumap02.png" alt="">' +
                '                  <strong>100%</strong>' +
                '                  <p>매립용량%: 2,319,800 m³ / 현재매립량: 2,319,800 m³</p>' +
                '                  <button class="modalClose">' +
                '                    <i class=\'bx bx-x\' ></i>' +
                '                  </button>' +
                '                </div>' +
                '                <div class="page03-modal modal03">' +
                '                  <h3>색달매립장</h3>' +
                '                  <img src="/site/images/jejumap02.png" alt="">' +
                '                  <strong>98.94%</strong>' +
                '                  <p>매립용량%: 812,868 m³ / 현재매립량: 804,302 m³</p>' +
                '                  <button class="modalClose">' +
                '                    <i class=\'bx bx-x\' ></i>' +
                '                  </button>' +
                '                </div>' +
                '                <div class="page03-modal modal04">' +
                '                  <h3>남원매립장</h3>' +
                '                  <img src="/site/images/jejumap02.png" alt="">' +
                '                  <strong>100%</strong>' +
                '                  <p>매립용량%: 45,974 m³ / 현재매립량: 45,974 m³</p>' +
                '                  <button class="modalClose">' +
                '                    <i class=\'bx bx-x\' ></i>' +
                '                  </button>' +
                '                </div>' +
                '              ' +
                '            </section>' +
                '            ' +
                '        </div>'
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 line 내용
        blockManager.add("jejusound-LineContent", {
            label: "jejusound-LineContent",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    $(window).on("scroll", () => {
                        const scrollBottom = $(window).scrollTop() + $(window).height();
                        const line = $('.line-wrapper')
                        let ofset
                        if (line.length) {
                            ofset = line.offset().top;
                        }
                        if (scrollBottom > ofset) {
                            $('.line-bar').addClass('on')
                        } else {
                            $('.line-bar').removeClass('on')
                        }
                    })
                }
                var html = '<div>';
                html += '<div class="content news01">' +
                    '' +
                    '            <section class="page04">' +
                    '              <div class="line-wrapper">' +
                    '                <div class="line-container">' +
                    '                  <div id="bar" class="line-bar"></div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="page04-area">' +
                    '                <h3 data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">"쓰레기장을 더 많이?"</h3>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">쓰레기가 많이 나오니 매립장과 소각장을 더 만드는 게 적절할까요?</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">계속 인프라를 늘리는 게 정답이 될 순 없습니다.</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주 전체를 쓰레기장으로 만들 수는 없는 노릇이죠.</p>' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000" src="/site/images/lineimage01.png" alt="">' +
                    '              </div>' +
                    '              <div class="page04-area">' +
                    '                <h3 data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">아직 현실화된 것은 없다</h3>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">쓰레기 대량 배출자를 대상으로 한 쓰레기 처리비용 현실화,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주를 찾는 관광객에게 환경보전기여금을 부과하는 방안,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">일회용품 사용 제한 등 다양한 아이디어가 거론된 지 꽤 됐지만</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">현실화된 것은 아직 없습니다.</p>' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000" src="/site/images/jejuimage04.png" alt="">' +
                    '              </div>' +
                    '                ' +
                    '              <div class="page04-area">' +
                    '                <h3 data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">섬을 찾는 \'1500만명\'</h3>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주도의 쓰레기는 하루 이틀 문제가 아닙니다.</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주의 1인당 쓰레기 배출량은 전국 최고 수준,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">급격히 불어난 1년 1500만명씩 찾아오는</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">관광객들이 버린 쓰레기가 주 원인입니다.</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">제주 이주 붐으로 인구가 급증하고,</p>' +
                    '                <p data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000">이 흐름에 맞춰 각종 건축과 개발이 늘어난 것도 악영향을 줬습니다.</p>' +
                    '                <img data-aos="fade-right"' +
                    '                data-aos-easing="ease-in-sine"' +
                    '                data-aos-duration="1000" src="/site/images/lineimage02.png" alt="">' +
                    '              </div>' +
                    '              ' +
                    '            </section>' +
                    '            ' +
                    '        </div>'
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 이미지슬라이드
        blockManager.add("jejusound-ImgSlide", {
            label: "jejusound-ImgSlide",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function () {
                    var _this = this;
                    newsController.initSwiper(_this.id);
                }
                var html = '<div>';
                html += '<div class="content news01">' +
                    '            <section class="page05">' +
                    '               <div class="bg">' +
                    '                   <img src="/site/images/jejuimage05.png" alt="">' +
                    '                </div>' +
                    '              <div class="swiper-container">' +
                    '                <div class="swiper-wrapper">' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                  <div class="swiper-slide">' +
                    '                    <img src="/site/images/swiperimage01.png" alt="">' +
                    '                    <p>애월읍 고내리 일대의 바닷가. 2021년 12월. 밀려오는 해양쓰레기로 갯바위가 흉물스럽게 덥혀있다. 소금기가 있어 처리하기에도 힘이 든다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <button class="swiper-prev">' +
                    '              </button>' +
                    '              <button class="swiper-next">' +
                    '              </button>' +
                    '            </section>' +
                    '            ' +
                    '        </div>'

                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })
        });

        // 샘플 링크
        blockManager.add("jejusound-link", {
            label: "jejusound-link",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: '<div class="content news01">' +
                '' +
                '            <section class="page06">' +
                '               <div class="bg">' +
                '                   <img src="/site/images/jejuimage06.png" alt="">' +
                '                </div>' +
                '              <div class="page06-text">' +
                '                <h3>더 자세한 이야기가 궁금하다면?</h3>' +
                '                <h4>※ 주제를 클릭하면 [쓰레기의 반격, 위기의 제주] 기사 페이지로 이동합니다.</h4>' +
                '              </div>' +
                '              ' +
                '              <div class="link-box">' +
                '                <a target="_blank" href="">급증하는 가연성쓰레기</a>' +
                '                <a target="_blank" href="">재활용 버거운 이유?</a>' +
                '                <a target="_blank" href="">쓰레기매립장 폐쇄!?</a>' +
                '                <a target="_blank" href="">대행폐기물도 골치라고?</a>' +
                '                <a target="_blank" href="">해양쓰레기도 역대 최다</a>' +
                '                <a target="_blank" href="">음식물 쓰레기로 바다로 \'위험\'</a>' +
                '              </div>' +
                '            </section>' +
                '            ' +
                '        </div>'
        });

        // 샘플 타이틀2
        blockManager.add("jejusound-title-02", {
            label: "jejusound-title-02",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: '<div class="content news02">' +
                '            <section class="page01">' +
                '               <div class="bg">' +
                '                   <img src="/site/images/bg.gif" alt="">' +
                '                </div>' +
                '              <h2>01</h2>' +
                '              <h2>홍가포르를 꿈꾸다</h2>' +
                '            </section>' +
                '        </div>'
        });

        // 샘플 페이드인 내용
        blockManager.add("jejusound-FadeInContent", {
            label: "jejusound-FadeInContent",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: '<div class="content news02">' +
                '' +
                '            <section class="page02" id="page02">' +
                '              <div class="page02-area">' +
                '               <div class="bg">' +
                '                   <img src="/site/images/jejubg01.png" alt="">' +
                '                </div>' +
                '                <img data-aos="fade-right"' +
                '                data-aos-easing="ease-in-sine" data-aos-duration="1000"  src="/site/images/js01.png" alt="">' +
                '                <p data-aos="fade-right"' +
                '                data-aos-easing="ease-in-sine" data-aos-duration="1000" >"제주특별자치도 추진을 통해 홍콩이나 싱가포르를 능가하는 경쟁력 있는 국제자유도시로 만들어 나가자"</p>' +
                '                <span data-aos="fade-right"' +
                '                data-aos-easing="ease-in-sine" data-aos-duration="1000" >김태환 전 제주도지사. 2005년 5월 20일 기자회견 중.</span>' +
                '              </div>' +
                '              <div class="blan"></div>' +
                '            </section>' +
                '            ' +
                '        </div>'
        });

        // 샘플 휠 내용
        blockManager.add("jejusound-WheelContent-02", {
            label: "jejusound-WheelContent-02",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function() {
                var initScript = function() {
                    newsController.initScrollEvent('.news02', '2')
                }
                var html = '<div>';
                html += '<div class="content news02">' +
                    '' +
                    '            <section class="page03">' +
                    '              <div class="scroll-graphic2">' +
                    '               <div class="bg">' +
                    '                   <img src="/site/images/jejubg02.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item2">' +
                    '                  <div>' +
                    '                    <p>1998년 출범한 김대중 정부는 제주 발전전략으로 제주를</p>' +
                    '                    <p>사람과 상품, 자본의 이동이 자유로운 국제자유도시로 조성하려 했다.</p>' +
                    '                    <p>모델은 홍콩과 싱가포르였다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="graphic-item2">' +
                    '                  <div>' +
                    '                    <p>2003년 출범한 노무현 정부는 중앙집권화된 권력을 나눠주기 위한</p>' +
                    '                    <p>지방분권을 추진했고 제주도가 실험무대가 됐다.</p>' +
                    '                    <p>지방정부가 어떤 정책을 추진하려 해도 국회나 중앙정부의 승인을 받아야 하는데</p>' +
                    '                    <p>특별자치도는 많은 권한을 옮겨받아 가능해질 수 있다는 것.</p>' +
                    '                    <p>행정의 효율화를 위해 기초자치단체(시,군)을 없앤 것도 이 때문이다.</p>' +
                    '                    <p>이 때부터 제주도민은 도지사만 뽑고 시장은 도지사가 임명한다.</p>' +
                    '                    <br>' +
                    '                    <p>그리고 이 행정실험의 목표는 \'국제자유도시\'였다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '                <div class="graphic-item2">' +
                    '                  <div>' +
                    '                    <p>2001년 제주국제자유도시 기본계획이 확정됐고,</p>' +
                    '                    <p>2002년 4월 제주도는 대내외에 국제자유도시 출범을 선언한다.</p>' +
                    '                    <p>그렇게 \'국제자유도시\'는 제주의 최상위 비전이 됐다.</p>' +
                    '                    <p>\'국제자유도시종합계획\'은 제주에 적용되는 최상위 법정계획으로서</p>' +
                    '                    <p>지난 20년간 제주개발의 청사진 역할을 해왔다.</p>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank2"></div>' +
                    '              <div class="blank2"></div>' +
                    '              <div class="blank2"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '        </div>'
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 다크 페이드인 01
        blockManager.add("jejusound-DarkFadeIn-01", {
            label: "jejusound-DarkFadeIn-01",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function() {
                var initScript = function() {
                    newsController.initFadeInView('.news02', '.page04', '.scroll-graphic2', 'on')
                }
                var html = '<div>'
                html += '<div class="content news02">' +
                    '            <section class="page04">' +
                    '              <h3 data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="2000"' +
                    '              >20년이 지난 지금</h3>' +
                    '            </section>' +
                    '            ' +
                    '        </div>';
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 다크 페이드인 02
        blockManager.add("jejusound-DarkFadeIn-02", {
            label: "jejusound-DarkFadeIn-02",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    newsController.initFadeInView('.news02', '#page05', '.scroll-graphic3', 'on')
                }
                var html = '<div>'
                html += '<div class="content news02">' +
                    '            <section class="page07">' +
                    '              <p data-aos="fade-right"  data-aos-easing="ease-in-sine" data-aos-duration="1000">"도민의 삶을 담보로 추진한 신자유주의 실험"</p>' +
                    '              <br>' +
                    '              <p data-aos="fade-right"  data-aos-easing="ease-in-sine" data-aos-duration="1000">"개발을 위한 규제완화로 농지, 초지, 임야가 무분별한 개발과 부동산 투기 대상화"</p>' +
                    '              <br>' +
                    '              <p data-aos="fade-right"  data-aos-easing="ease-in-sine" data-aos-duration="1000">"끊임없이 부동산을 개발하는 국제자유도시는 소득 불평등 심화"</p>' +
                    '            </section>' +
                    '            ' +
                    '        </div>';
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 휠 내용 03
        blockManager.add("jejusound-WheelContent-03", {
            label: "jejusound-WheelContent-03",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function() {
                var initScript = function() {
                    newsController.initScrollEvent('.news02', '4')
                }
                var html = '<div>'
                html += '<div class="content news02">' +
                    '            <section class="page08">' +
                    '              <div class="scroll-graphic4">' +
                    '               <div class="bg">' +
                    '                   <img src="/site/images/jejubg04.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item4" data-index="0">' +
                    '                  <p>국제자유도시를 만들기 위해</p>' +
                    '                  <p>투자자와 외부자본의 유치와 편익을 보장한다는 기조는</p>' +
                    '                  <p>개발 붐과 자연환경 파괴로 이어졌다.</p>' +
                    '                  <p>\'부동산 개발사업들에 불과했다\'는 비판이 나오는 이유다</p>' +
                    '                  <br>' +
                    '                  <p>성장 중심의 개발정책이 제주를 지배했고, 자연 뿐 아니라</p>' +
                    '                  <p>지역사회에 갈등이 늘어나 공동체 파괴라는 부작용도 생겼다.</p>' +
                    '                </div>' +
                    '                <div class="graphic-item4" data-index="1">' +
                    '                  <p>국제자유도시종합계획을 추진한 결과,</p>' +
                    '                  <p>도민의 삶의 질 하락과 자연환경의 훼손은 가속화된데 비해</p>' +
                    '                  <p>개발이익은 꾸준히 외부로 유출된다는 비판이 계속되고 있다.</p>' +
                    '                  <p>삶의 질이 오히려 떨어졌다고 냉혹한 평가가 이어진다.</p>' +
                    '                  <p>국제자유도시라는 최상위 비전을 이젠 수정해야 한다는 목소리도 높다.</p>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank4" data-index="0"></div>' +
                    '              <div class="blank4" data-index="1"></div>' +
                    '              <div class="blan"></div>' +
                    '            </section>' +
                    '            ' +
                    '        </div>'

                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });

        // 샘플 휠 내용 04
        blockManager.add("jejusound-WheelContent-04", {
            label: "jejusound-WheelContent-04",
            category: 'SAMPLE COMPONENT',
            attributes: {
                class: "fs-5 far fa-newspaper"
            },
            content: (function(){
                var initScript = function() {
                    newsController.initScrollEvent('.news02', '5')
                }
                var html = '<div>'
                html += '<div class="content news02">' +
                    '            <section class="page09">' +
                    '            <div class="scroll-graphic5">' +
                    '               <div class="bg">' +
                    '                   <img src="/site/images/jejubg05.png" alt="">' +
                    '                </div>' +
                    '                <div class="graphic-item5">' +
                    '                  <p>더 자세한 이야기가 궁금하다면</p>' +
                    '                  <h3>관련기사 보기</h3>' +
                    '                  <a class="link-box" href="">' +
                    '                    <img src="/site/images/js05.png" alt="">' +
                    '                  </a>' +
                    '                </div>' +
                    '                <div class="graphic-item5">' +
                    '                  <p>더 자세한 이야기가 궁금하다면</p>' +
                    '                  <h3>영상으로 정리한 제주국제자유도시 이야기</h3>' +
                    '                  <div class="link-box">' +
                    '                    <iframe width="838" height="605" src="https://www.youtube.com/embed/1XrH1IGCOrg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                    '                  </div>' +
                    '                </div>' +
                    '              </div>' +
                    '              <div class="blank5" data-index="0"></div>' +
                    '              <div class="blank5" data-index="1"></div>' +
                    '            </section>' +
                    '        </div>';
                html += '<script>(';
                html += String(initScript);
                html += ')()</script></div>';
                return html;
            })()
        });
    }

    return {
        createBlockComponent
    }
})();