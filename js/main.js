//Плавная прокрутка

function scrolltoFnOne() {
    document.getElementById('agree-goal').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}
function scrolltoFnTwo() {
    document.getElementById('moreof-goal').scrollIntoView({
        block: "start",
        behavior: 'smooth'
    })
}



//Счетчик карточек и управление слайдером в Members

document.addEventListener('DOMContentLoaded', function () {

    let counterMembers = document.querySelector('.members__count span'),
        membersWrapper = document.querySelector('.members__wrapper'),
        container = document.querySelector('.container'),
        numbers = 0;  //количество просмотренных слайдов

    let membersNav = document.querySelector('.members__nav'),
        membersCards = document.querySelectorAll('.members__person'),
        membersSum = membersCards.length,
        scrollAmound = 0, //текущее положение смещения
        shift = 0, //величина смещения
        navL = document.getElementById('left'),
        navR = document.getElementById('right'),
        membersMin;

    let countNow = function () {
        if (container.offsetWidth > 910) {
            numbers = 3;
            if (numbers === 3) {
                navL.classList.add('members__arrow_disabled');
            } else {
                navL.classList.remove('members__arrow_disabled');
            }
        };
        if ((container.offsetWidth > 530) && (container.offsetWidth <= 910)) {
            numbers = 2;
            if (numbers === 2) {
                navL.classList.add('members__arrow_disabled');
            } else {
                navL.classList.remove('members__arrow_disabled');
            }
        };
        if (container.offsetWidth <= 530) {
            numbers = 1;
            if (numbers === 1) {
                navL.classList.add('members__arrow_disabled');
            } else {
                navL.classList.remove('members__arrow_disabled');
            }
        };
        counterMembers.innerHTML = numbers;
    }

    let shiftVar = function () {
        if (container.offsetWidth == 1222) {
            shift = 41.3;
            membersMin = 3;
        };
        if (container.offsetWidth == 1150) {
            shift = 39.0;
            membersMin = 3;
        };
        if (container.offsetWidth == 910) {
            shift = 47.9;
            membersMin = 2;
        };
        if (container.offsetWidth == 700) {
            shift = 37.2;
            membersMin = 2;
        };
        if (container.offsetWidth == 530) {
            shift = 57.4;
            membersMin = 1;
        };
        if (container.offsetWidth == 335) {
            shift = 37.9;
            membersMin = 1;
        };
        if (container.offsetWidth <= 334) {
            shift = 33.5;
            membersMin = 1;
        };
    };

    countNow(); //указывает сколько слайдов должно быть активно по умолчанию
    shiftVar(); //тек. велич. смещения и кол-во активных слайдов

    window.addEventListener('resize', (e) => {
        shift = null;
        countNow();
        shiftVar();
        scrollAmound = 0;
        membersWrapper.style.transform = "translateX(0)";
        if (navR.classList.contains('members__arrow_disabled')) {
            navR.classList.remove('members__arrow_disabled');
        };

    })

    let membersClick = function (e) {
        e.stopPropagation();

        shiftVar();


        if (e.target === navR) {
            if (navL.classList.contains('members__arrow_disabled')) {
                navL.classList.remove('members__arrow_disabled');
            };
            if (numbers < membersSum) {

                numbers++;
                if (scrollAmound == 0.0) {
                    scrollAmound = +0;
                };

                let number = scrollAmound;
                let n = 2; //точность. Сколько брать чисел после запятой
                let fractional = Math.floor((number % 1) * Math.pow(10, n));  //удаляет все остальные числа после "n" (если всего одна цифра - оставляет одну)
                let num = String(fractional).length;  //возвращает длину числа

                if (num === 2) {
                    scrollAmound = +scrollAmound.toFixed(1) + +shift;  //округляет до 1 цифры после запятой
                }
                else {
                    scrollAmound += +shift;
                }

                membersWrapper.style.transform = "translateX(-" + scrollAmound + "rem)";

                if (numbers == membersSum) {

                    navR.classList.add('members__arrow_disabled');

                }
            }

        } else if (e.target === navL) {

            if (navR.classList.contains('members__arrow_disabled')) {
                navR.classList.remove('members__arrow_disabled');
            };
            if (numbers > membersMin) {

                numbers--;
                if (scrollAmound == 0.0) {
                    scrollAmound = +0;
                };

                let number = scrollAmound;
                let n = 2; //точность. Сколько брать чисел после запятой
                let fractional = Math.floor((number % 1) * Math.pow(10, n));
                let num = String(fractional).length;

                if (num === 2) {
                    scrollAmound = +scrollAmound.toFixed(1) - +shift;
                }
                else {
                    scrollAmound -= +shift;
                }
                membersWrapper.style.transform = "translateX(-" + scrollAmound + "rem)";
                if (numbers === membersMin) {
                    navL.classList.add('members__arrow_disabled');
                }
            }
        }
        counterMembers.innerHTML = numbers;
    };
    membersNav.addEventListener('click', membersClick);




    // Слайдер с автопрокруткой

    let OneDragTime = 2400;
    let clickTo = function () {
        navR.click();

        if (numbers == membersSum) {
            setTimeout(function () {
                function func5() {
                    navL.click();
                }
                count = 0;
                intervalId = setInterval(function () {
                    count++;
                    if (count == (membersSum - membersMin)) {
                        clearInterval(intervalId);
                    }
                    func5(); //перевод слайдера на начало
                }, 1)
            }, 1300);
        };
    };
    let timer = setInterval(clickTo, OneDragTime);


    // отмена автопрокрутки

    function killSlider() {
        clearInterval(timer);
    };

    membersNav.addEventListener('mouseover', killSlider);

    // восстановление автопрокрутки

    function restoreSlider() {
        timer = setInterval(clickTo, OneDragTime);
    };


    let timeout = 3000;
    let lastCall = null;

    function action() {
        if ((Date.now() - lastCall) >= timeout) {
            restoreSlider();
        }
    }

    function actionWait() {  //если между событиями не прошло 3 секунды - не разрешает запуск
        lastCall = new Date();
        setTimeout(action, timeout)
    }

    membersNav.addEventListener('mouseout', actionWait);







    ///////////Управление слайдером в stages


    let stagesWrapper = document.querySelector('.stages__list'),
        container2 = document.querySelector('.stages__title'),
        body = document.querySelector('body'),
        numbers2 = 0;  //количество просмотренных слайдов

    let stagesNav = document.querySelector('.stages__nav'),
        stagesCards = document.querySelectorAll('.stages__list li'),
        stagesSum = stagesCards.length - 3,
        scrollAmound2 = 0, //текущее положение смещения
        shift2 = 0, //величина смещения
        navLeft = document.getElementById('st-left'),
        navRight = document.getElementById('st-right'),
        bullets = document.querySelector('.stages__nav_bullets'),
        bulletItem = document.querySelectorAll('.stages__nav_bullet'),
        stagesMin = 0;

    let start = function () {
        if (numbers2 == 0) {
            navLeft.classList.add('stages__nav_arrow_disabled');
            if (navRight.classList.contains('stages__nav_arrow_disabled')) {
                navRight.classList.remove('stages__nav_arrow_disabled');
            }

        } else if (numbers2 == stagesSum) {
            navRight.classList.add('stages__nav_arrow_disabled');
            if (navLeft.classList.contains('stages__nav_arrow_disabled')) {
                navLeft.classList.remove('stages__nav_arrow_disabled');
            }
        }

        else {
            navLeft.classList.remove('stages__nav_arrow_disabled');
            navRight.classList.remove('stages__nav_arrow_disabled');
        };

        if (numbers2 == 0) {
            bulletItem.forEach(function (el, i) {
                if (i == 0) {
                    el.classList.add('stages__nav_active');
                }
            })
        }
    }


    let shiftVar2 = function () {
        if (container2.offsetWidth == 335) {
            shift2 = 47;
        };
        if (container2.offsetWidth <= 334) {
            shift2 = 35.5;
        };
    };

    start();
    shiftVar2(); //тек. велич. смещения и кол-во активных слайдов

    window.addEventListener('resize', () => {
        shift2 = null;
        shiftVar2();
        scrollAmound2 = 0;
        stagesWrapper.style.transform = "translateX(0rem)";
        if (navRight.classList.contains('stages__nav_arrow_disabled')) {
            navRight.classList.remove('stages__nav_arrow_disabled');
        };
    })

    stagesNav.addEventListener('click', (e) => {
        console.log(numbers2);
        start();
        //e.stopPropagation;
        bulletItem.forEach((el) => {
            if (el.classList.contains('stages__nav_active')) {
                el.classList.remove('stages__nav_active');
            };
        })
        const targetBullet = e.target.closest('.stages__nav_bullet');
        if (targetBullet) {
            bulletItem.forEach((item) => {
                if (item === targetBullet) {
                    item.classList.add('stages__nav_active');
                    if (item.dataset.bullet == '1') {
                        stagesWrapper.style.transform = "translateX(-" + 0 + "rem)";
                        numbers2 = 0;
                        scrollAmound2 = 0;
                        start();
                    };
                    if (item.dataset.bullet == '2') {
                        stagesWrapper.style.transform = "translateX(-" + (0 + shift2) + "rem)";
                        numbers2 = 1;
                        if (container2.offsetWidth == 335) {
                            scrollAmound2 = 47;
                        };
                        if (container2.offsetWidth <= 334) {
                            scrollAmound2 = 35.5;
                        };
                        start();
                    };
                    if (item.dataset.bullet == '3') {
                        stagesWrapper.style.transform = "translateX(-" + (0 + (shift2 * 2)) + "rem)";
                        numbers2 = 2;
                        if (container2.offsetWidth == 335) {
                            scrollAmound2 = 94;
                        };
                        if (container2.offsetWidth <= 334) {
                            scrollAmound2 = 71;
                        };
                        start();
                    };
                    if (item.dataset.bullet == '4') {
                        stagesWrapper.style.transform = "translateX(-" + (0 + (shift2 * 3)) + "rem)";
                        numbers2 = 3;
                        if (container2.offsetWidth == 335) {
                            scrollAmound2 = 141;
                        };
                        if (container2.offsetWidth <= 334) {
                            scrollAmound2 = 106.5;
                        };
                        start();
                    };
                    if (item.dataset.bullet == '5') {
                        stagesWrapper.style.transform = "translateX(-" + (0 + (shift2 * 4)) + "rem)";
                        numbers2 = 4;
                        if (container2.offsetWidth == 335) {
                            scrollAmound2 = 188;
                        };
                        if (container2.offsetWidth <= 334) {
                            scrollAmound2 = 142;
                        };
                        start();
                    };
                }
            })
        }

        if (e.target === navRight) {
            if (navLeft.classList.contains('stages__nav_arrow_disabled')) {
                navLeft.classList.remove('stages__nav_arrow_disabled');
            };

            if (numbers2 < stagesSum) {

                numbers2++;
                scrollAmound2 += shift2;
                stagesWrapper.style.transform = "translateX(-" + scrollAmound2 + "rem)";

                bulletItem.forEach((e) => {
                    if (e.dataset.bullet == (numbers2 + 1)) {
                        e.classList.add('stages__nav_active');
                    }
                })

                if (numbers2 === stagesSum) {
                    navRight.classList.add('stages__nav_arrow_disabled');
                }
            }
        } else if (e.target === navLeft) {
            //start();
            if (navRight.classList.contains('stages__nav_arrow_disabled')) {
                navRight.classList.remove('stages__nav_arrow_disabled');
            };
            if (numbers2 > stagesMin) {

                numbers2--;
                scrollAmound2 -= shift2;
                scrollAmound2 = scrollAmound2.toFixed(1); //округляет до 1 десятой
                if (scrollAmound2 == 0.0) {
                    scrollAmound2 = 0;
                };
                stagesWrapper.style.transform = "translateX(-" + scrollAmound2 + "rem)";
                if (numbers2 === stagesMin) {
                    navLeft.classList.add('stages__nav_arrow_disabled');
                }

                bulletItem.forEach((e) => {
                    if (e.dataset.bullet == (numbers2 + 1)) {
                        e.classList.add('stages__nav_active');
                    }
                })
            }
        }
    })
})





