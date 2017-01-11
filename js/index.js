/**
 * Created by liuc on 2016/11/19.
 */
var list = document.querySelector('.list');
var lis = document.querySelectorAll('.list_i');
var scroll = document.querySelectorAll('.scroll');
var tops = document.querySelectorAll('.list_i .top');
var bottoms = document.querySelectorAll('.list_i .bottom');
var box = document.querySelector('.box');
var bWrap = document.querySelectorAll('.bWrap');
var txt = box.querySelectorAll('.txt');
var user = document.getElementById('user');
var end = document.querySelector('.end');
var endWord = document.querySelector('.endWord');
var len = 5;
var n = 0;


//开场动画
var circle = document.querySelector('.circle');
var title = document.querySelector('.title');
var bottomTxt = document.querySelector('.bottomTxt');
var inputTxt = document.querySelector('.inputTxt');
var line = document.querySelector('.line');
var plane = document.querySelector('.plane');

//让头像运动
setTimeout(function () {//让圆变大
    circle.style.backgroundImage = 'none';
    circle.style.transition = '1.6s';
    circle.style.width = circle.style.height = width * 1.2 + 'px';

    setTimeout(function () {
        circle.style.transition = 'none';
        circle.style.display = 'none';
        list.style.display = 'block';

        title.style.transition = '.075s';//标题完全不透明
        title.style.opacity = '1';
        bottomTxt.style.transition = '.075s';//动态文字完全不透明
        bottomTxt.style.opacity = '1';

        setTimeout(function () {//飞机飞到左边
            flyRight();
        }, 100);

        setTimeout(function () {//左下角文字输入完成
            var str = getWordArr('<br>{<br>&emsp;&emsp;return "fir.im"<br>}');
            moveWord(str, inputTxt, 2000, function () {
                line.style.display = 'none';
                myWheel(document, callback);//打开滚轮事件
            });
        }, 100);


    }, 1600);//1130

}, 633);


function callback(down, finish) {
    if (down) {
        switch (n) {
            case 1:
                console.log('d case1');
                dCase1();
                break;
            case 2:
                console.log('d case2');
                dCase2();
                break;
            case 3:
                console.log('d case3');
                dCase3();
                break;
            case 4:
                console.log('d case4');
                dCase4();
                break;
            case 5:
                console.log('d case5');
                dCase5();
                break;
            default:
                console.log('d default');
                finish();
                break;
        }
        n = n > 0 ? --n : 0;
    } else {
        switch (n) {
            case 0:
                console.log('case0');
                case0();
                break;
            case 1:
                console.log('case1');
                case1();
                break;
            case 2:
                console.log('case2');
                case2();
                break;
            case 3:
                console.log('case3');
                case3();
                break;
            case 4:
                console.log('case4');
                case4();
                break;
            default:
                finish();
                break;
        }
        n = n < len - 1 ? ++n : len;
    }
    console.log(n);

    //往上滚轮
    function dCase1() {
        plane.style.display = 'block';
        title.style.transition = '.2s';
        removeClass(title, 'white');
        for (var i = 0, len = lis.length; i < len; i++) {//翻页
            (function (i) {
                setTimeout(function () {
                    if (i == 2) {
                        mTween(lis[i], {rotateY: 0}, 500, 'easeIn', function () {
                        });
                    } else {
                        mTween(lis[i], {rotateY: 0}, 500, 'easeIn');
                    }
                }, i * 330);
            })(i);
        }

        setTimeout(function () {//飞机飞到左边
            flyRight();
        }, 167);

        setTimeout(function () {//左下角文字输入完成
            var str = getWordArr('BetaAppHost<br>{<br>&emsp;&emsp;return "fir.im"<br>}');
            moveWord(str, inputTxt, 3000, function () {
                line.style.display = 'none';
                finish();
            });
        }, 1467);
    }

    function dCase2() {
        box.style.display = 'none';
        scroll[1].children[1].style.display = 'block';//让top显示
        for (var i = 0, len = tops.length; i < len; i++) {
            if (i == 0) {
                mTween(scroll[i], {top: 0}, 1000, 'easeBoth', function () {
                });
            } else if (i == 1) {
                mTween(scroll[i], {top: -liH}, 1000, 'easeBoth', function () {
                    scroll[1].style.top = '-100%';
                });
            } else {
                mTween(scroll[i], {top: 0}, 1000, 'easeBoth', function () {
                    finish();
                });
            }
        }
    }

    function dCase3() {
        for (var i = 0, len = bottoms.length; i < len; i++) {
            (function (i) {
                setTimeout(function () {
                    if (i == 0) {
                        mTween(scroll[i], {top: -liH}, 400, 'easeBoth', function () {
                            scroll[0].style.top = '-100%';
                        });
                    } else if (i == 1) {
                        mTween(scroll[1], {top: 0}, 400, 'easeBoth', function () {
                        });
                    } else {
                        mTween(scroll[i], {top: -liH}, 400, 'easeBoth', function () {
                            scroll[2].style.top = '-100%';

                            for (var i = 0; i < bWrap.length; i++) {
                                var boxSpan = bWrap[i].querySelectorAll('span');//盒子两边的叶子
                                for (var j = 0; j < boxSpan.length; j++) {
                                    boxSpan[j].style.transition = 'none';
                                    boxSpan[j].style.transform = 'rotateX(90deg)';
                                }
                                txt[i].style.transition = 'none';
                                txt[i].style.opacity = '0';
                                txt[i].style.bottom = '52%';
                            }

                            finish();
                        });
                    }
                }, i * 167);
            })(i);
        }
    }

    function dCase4() {
        mTween(user, {top: liH}, 800, 'easeBoth', function () {
            finish();
            user.style.top = '100%';
        });
    }

    function dCase5() {
        mTween(end, {top: liH}, 800, 'easeBoth', function () {
            end.style.top = '100%';
            finish();
            endWord.innerHTML = '';
        });
        setTimeout(function () {
            title.style.transition = '.2s';
            addClass(title, 'white');
        }, 200);
    }

    //往下滚轮
    function case0() {
        inputTxt.style.transition = '.1s';//动态文字消失
        inputTxt.innerHTML = '';

        title.style.transition = '.2s';
        addClass(title, 'white');

        flyLeft();//飞机飞到左边

        setTimeout(function () {
            plane.style.transition = 'none';

            for (var i = 0, len = lis.length; i < len; i++) {
                (function (i) {
                    setTimeout(function () {
                        if (i == 2) {
                            mTween(lis[i], {rotateY: -180}, 500, 'easeIn', finish);
                        } else {
                            mTween(lis[i], {rotateY: -180}, 500, 'easeIn');
                        }
                    }, i * 330);
                })(i);
            }
        }, 800);
    }

    function case1() {
        for (var i = 0; i < scroll.length; i++) {
            if (i == 0) {
                mTween(scroll[i], {top: -liH}, 1000, 'easeBoth', function () {
                    scroll[0].style.top = '-100%';
                });
            } else if (i == 1) {
                mTween(scroll[i], {top: 0}, 1000, 'easeBoth', function () {
                    scroll[1].children[1].style.display = 'none';//让top隐藏
                });
            } else {
                mTween(scroll[i], {top: -liH}, 1000, 'easeBoth', function () {
                    scroll[2].style.top = '-100%';
                    box.style.display = 'block';
                    finish();
                });
            }
        }
    }

    function case2() {
        list.style.background = 'none';
        for (var i = 0; i < scroll.length; i++) {
            (function (i) {
                setTimeout(function () {
                    if (i == 0) {
                        mTween(scroll[i], {top: -2 * liH}, 400, 'easeBoth', function () {
                            scroll[0].style.top = '-200%';
                        });
                    } else if (i == 1) {
                        mTween(scroll[i], {top: -liH}, 400, 'easeBoth', function () {
                            scroll[1].style.top = '-100%';
                        });
                    } else {
                        mTween(scroll[i], {top: -2 * liH}, 400, 'easeBoth', function () {
                            scroll[2].style.top = '-200%';
                        });
                    }
                }, i * 167);
            })(i);
        }


        for (var i = 0; i < bWrap.length; i++) {
            (function (i) {
                var boxSpan = bWrap[i].querySelectorAll('span');//盒子两边的叶子

                setTimeout(function () {//让盒往上运动
                    bWrap[i].style.transition = 'none';
                    bWrap[i].style.top = '32.758%';

                    setTimeout(function () {//让盒子往下运动
                        bWrap[i].style.transition = '.5s';
                        bWrap[i].style.top = '48.432%';

                        setTimeout(function () {//让叶子展开
                            for (var j = 0; j < boxSpan.length; j++) {
                                boxSpan[j].style.transition = '.3s';
                                boxSpan[j].style.transform = 'rotateX(-50deg)';
                            }

                            setTimeout(function () {//让文字不透明，并向上运动
                                txt[i].style.transition = '.5s';
                                txt[i].style.opacity = '1';
                                txt[i].style.bottom = '100%';

                                setTimeout(function () {
                                    finish();
                                }, 500);

                            }, 100);

                        }, 500);

                    }, 10);
                }, i * 200);

            })(i);
        }


    }

    function case3() {
        mTween(user, {top: 0}, 800, 'easeBoth', function () {
            finish();
        });
    }

    function case4() {
        mTween(end, {top: 0}, 800, 'easeBoth', function () {
            var str = 'fir.im';
            str = str.split('');
            moveWord(str, endWord, 700, finish);
        });
        setTimeout(function () {
            title.style.transition = '.2s';
            removeClass(title, 'white');
        }, 200);
    }
}


function moveWord(str, ele, time, back) {
    var len = str.length,
        perTime = time / len,
        n = 0;

    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        ele.innerHTML += str[n];
        if (n < len - 1) {
            n++;
        } else {
            clearInterval(ele.timer);
            setTimeout(function () {
                if (back && typeof  back == 'function') {
                    back();
                }
            }, perTime);
        }
    }, perTime);
}

function flyRight() {//飞机从右边飞来
    plane.style.transition = '.3s ease-out';
    plane.style.left = 0.25 * width + 'px';
    plane.style.top = 0.25 * liH + 'px';

    setTimeout(function () {
        plane.style.transition = 'none';
        plane.style.left = '25%';
        plane.style.top = '25%';
        plane.style.transition = '1s';
        plane.style.width = 1.22 * plane.offsetWidth + 'px';//飞机放大
        plane.style.height = 1.22 * plane.offsetHeight + 'px';

        setTimeout(function () {
            plane.style.transition = 'none';
            plane.style.width = '50.02%';
            plane.style.height = '53.68%';
        }, 1000);

    }, 300);
}

function flyLeft() {//飞机飞到左边
    plane.style.transition = '.1s';
    plane.style.width = plane.offsetWidth / 1.22 + 'px';//飞机缩小
    plane.style.height = plane.offsetHeight / 1.22 + 'px';

    setTimeout(function () {
        plane.style.transition = 'none';
        plane.style.width = '41%';
        plane.style.height = '44%';
        plane.style.transition = '.7s cubic-bezier(.57,-0.77,.71,.55)';
        plane.style.left = -plane.offsetWidth + 'px';//飞机从左边飞出

        setTimeout(function () {
            plane.style.display = 'none';//让飞机回到右边
            plane.style.left = '100%';//让飞机回到右边
        }, 700);

    }, 100);
}

function getWordArr(str) {
    str = str.replace(/&emsp;/g, '@').replace(/<br>/g, '#');
    str = str.split('').join(',');
    str = str.replace(/@/g, '&emsp;').replace(/#/g, '<br>');
    str = str.split(',');
    return str;
}