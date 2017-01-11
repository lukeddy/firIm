/**
 * Created by liuc on 2016/10/10.
 */
//增加class
function addClass(ele, c) {
    var c0 = ele.className;
    if (!c0) {
        ele.className = c;
    } else {
        ele.className = c0 + ' ' + c;
    }
}

//删除calss
function removeClass(ele, c) {
    var c0 = ele.className;
    c0 = c0.replace(/\s+/, ' ');
    var arr = c0.split(' ');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == c) {
            arr.splice(i, 1);
        }
    }
    ele.className = arr.join('');
}


//滚轮事件
function myWheel(obj, callback) {
    obj.addEventListener('DOMMouseScroll', whellFn);
    obj.addEventListener('mousewheel', whellFn);
    function whellFn(ev) {
        var down = true;
        if (ev.wheelDelta) {
            down = ev.wheelDelta > 0 ? true : false;
        } else {
            down = ev.detail < 0 ? true : false;
        }
        if (callback && typeof callback === 'function') {
            function finish() {
                obj.addEventListener('DOMMouseScroll', whellFn);
                obj.addEventListener('mousewheel', whellFn);
            }

            obj.removeEventListener('DOMMouseScroll', whellFn);
            obj.removeEventListener('mousewheel', whellFn);
            callback(down, finish);
        }
        ev.preventDefault();//阻止默认事件，如在div上滚动滚轮时，不让屏幕的滚动条跟着滚动；但是在div的外面滚动时，屏幕的滚动条还是会跟着滚动
    }
}


//拖拽
function Drag(json) {
    var settings = {
        id: json.id,
        id2: json.id2,
        fnDuang: json.fnDuang,
        fnNoDuang: json.fnNoDuang
    }

    var obj = document.getElementById(settings.id);
    var obj2 = document.getElementById(settings.id2);
    obj.addEventListener('mousedown', fnDown);
    function fnDown(ev) {
        var disX = ev.pageX - obj.offsetLeft;
        var disY = ev.pageY - obj.offsetTop;

        document.addEventListener('mousemove', fnMove);
        document.addEventListener('mouseup', fnUp);

        function fnMove(ev) {
            obj.style.left = ev.pageX - disX + 'px';
            obj.style.top = ev.pageY - disY + 'px';

            //如果传入一个obj2 并且 obj2要是个元素 并且 碰到了
            if (obj2 && obj2.nodeType === 1 && duang(obj, obj2)) {
                //fnDuang是不是一个函数
                if (settings.fnDuang && typeof settings.fnDuang === 'function') {
                    settings.fnDuang(obj, obj2);
                }
            } else {
                //要传入一个fnNoDuang为真 并且 fnNoDuang为函数
                if (settings.fnNoDuang && typeof settings.fnNoDuang === 'function') {
                    settings.fnNoDuang(obj, obj2);
                }
            }

        }

        function fnUp() {
            document.removeEventListener('mousemove', fnMove);
            document.removeEventListener('mouseup', fnUp);
        }

        ev.preventDefault();//阻止默认行为
    }
}

//碰撞检测
function duang(obj1, obj2) {
    var l1 = obj1.offsetLeft;
    var t1 = obj1.offsetTop;
    var b1 = t1 + obj1.offsetHeight;
    var r1 = l1 + obj1.offsetWidth;

    var l2 = obj2.offsetLeft;
    var t2 = obj2.offsetTop;
    var b2 = t2 + obj2.offsetHeight;
    var r2 = l2 + obj2.offsetWidth;

    if (r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
        //没碰到
        return false;
    } else {
        //碰到了
        return true;
    }
}

//布局转换
function changeBj(sle) {
    var arr = [];

    M(sle).forEach(function (item) {
        arr.push([item.offsetLeft, item.offsetTop]);
    });

    M(sle).forEach(function (item, i) {
        item.style.margin = '0';
        item.style.position = 'absolute';
        item.style.left = arr[i][0] + 'px';
        item.style.top = arr[i][1] + 'px';
    });
}

//通过选择器获取元素
function M(sele) {
    var first = sele.substr(0, 1);
    var isArr = sele.split(' ');
    if (first === '#' && isArr.length == 1) {
        return document.getElementById(sele.substr(1));
    } else {
        var arr = Array.from(document.querySelectorAll(sele));
        return arr.length == 1 ? arr[0] : arr;
    }
}

//返回 arr[0] 到 arr[1] 的随机数
function rP(arr) {
    var max = Math.max(arr[0], arr[1]),
        min = Math.min(arr[0], arr[1]);
    return Math.round(Math.random() * (max - min)) + min;
}

//抖动函数
function shake(obj, times, dir, fn) {
    var arr = [];
    for (var i = times; i >= 0; i--) {
        arr.push(i, -i);
    }
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        obj.style.transform = 'translate' + dir + '(' + arr[n] + 'px)';
        n++;
        if (n == arr.length) {
            clearInterval(obj.timer);
            if (typeof fn == 'function') {
                setTimeout(fn, 16);
            }
        }
    }, 16);
}

//zj mTween2
function mTween2(obj, attrs, times, fx, fn) {
    if (typeof times == 'undefined') {
        times = 400;
        fx = 'linear';
    }
    if (typeof times == 'string') {  // (box,{opacity:30},'linear')
        if (typeof fx == 'undefined') {
            fx = times;
            times = 400;
        } else {
            fn = fx;
            fx = times;
            times = 400;
        }
    }
    if (typeof times == 'function') { //(box,{opacity:30},function(){})
        fn = times;
        fx = 'linear';
        times = 400;
    }
    if (typeof times == 'number') {//(box,{opacity:30},400,function(){})
        if (typeof fx == 'undefined') { //(box,{opacity:30},400)
            fx = 'linear';
        }
        if (typeof fx == 'function') { //(box,{opacity:30},400,fn)
            fn = fx;
            fx = 'linear';
        }
    }
    var json = {};
    for (var attr in attrs) {
        if (attr == 'opacity') {
            json[attr] = getComputedStyle(obj)[attr] * 100;
        } else {
            json[attr] = parseInt(getComputedStyle(obj)[attr]);
        }
    }
    var startTime = new Date().getTime();
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var nowTime = new Date().getTime();
        var t = Math.min(times, nowTime - startTime);
        for (var attr in attrs) {
            var value = Tween[fx](t, json[attr], attrs[attr] - json[attr], times);
            if (attr == 'opacity') {
                obj.style.opacity = value / 100;
            } else {
                obj.style[attr] = value + 'px';
            }
        }
        if (t == times) {
            clearInterval(obj.timer);
            if (typeof fn == 'function') {
                setTimeout(function () {
                    fn();
                }, 16);
            }
        }
    }, 16);
}

//运动形式
var Tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 2.70158;  //回缩的距离
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2 ) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function (t, b, c, d) {
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
};

//当css的参数个数小于3，获取否则 设置
function css(element, attr, val) {
    if (attr == 'scale' || attr == 'rotate' || attr == 'rotateX' || attr == 'rotateY' || attr == 'rotateZ' || attr == 'scaleX' || attr == 'scaleY' || attr == 'translateY' || attr == 'translateX' || attr == 'translateZ' || attr == 'skewX' || attr == 'skewY' || attr == 'skewZ') {
        return setTransform(element, attr, val);
    }
    if (arguments.length == 2) {
        var val = element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
        if (attr == 'opacity') {
            val = Math.round(val * 100);
        }
        return parseFloat(val);
    } else {
        switch (attr) {
            case 'width':
            case 'height':
            case 'paddingLeft':
            case 'paddingTop':
            case 'paddingRight':
            case 'paddingBottom':
            case 'borderWidth':
            case 'borderLeftWidth':
            case 'borderRightWidth':
            case 'borderTopWidth':
            case 'borderBottomWidth':
                val = val < 0 ? 0 : val;
            case 'left':
            case 'top':
            case 'marginLeft':
            case 'marginTop':
            case 'marginRight':
            case 'marginBottom':
                element.style[attr] = val + "px";
                break;
            case 'opacity':
                element.style.filter = "alpha(opacity:" + val + ")";
                element.style.opacity = val / 100;
                break;
            default:
                element.style[attr] = val;
        }
    }
}

//获取变换的样式
function setTransform(element, attr, val) {
    if (!element["transform"]) {
        element["transform"] = {};
    }
    if (typeof val == "undefined") {
        val = element["transform"][attr];
        if (typeof val == "undefined") {
            if (attr == "scale" || attr == "scaleX" || attr == "scaleY") {
                element["transform"][attr] = 100;
            } else {
                element["transform"][attr] = 0;
            }
        }
        return parseFloat(element["transform"][attr]);
    } else {
        var str = "";
        element["transform"][attr] = val;
        for (var s in element["transform"]) {
            switch (s) {
                case 'skewX':
                case 'skewY':
                case 'skewZ':
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                    str += s + "(" + element["transform"][s] + "deg) ";
                    break;
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                    str += s + "(" + element["transform"][s] + "px) ";
                    break;
                default:
                    str += s + "(" + element["transform"][s] / 100 + ") ";
            }
        }
        element.style.MozTransform = element.style.msTransform = element.style.WebkitTransform = element.style.transform = str;
    }
}

//运动函数
function mTween(el, target, time, type, callBack) {
    clearInterval(el.timer);
    var t = 0;
    var b = {};
    var c = {};
    var d = time / 20;
    for (var s in target) {
        b[s] = css(el, s);
        c[s] = target[s] - b[s];
    }
    el.timer = setInterval(function () {
        t++;
        if (t > d) {
            clearInterval(el.timer);
            callBack && callBack(); //回调函数 动画执行完了以后，要执行的内容 ，类型 function
        } else {
            for (var s in target) {
                var val = Tween[type](t, b[s], c[s], d);
                css(el, s, val);
            }
        }
    }, 20);
}


//获取元素
function getId(name) {
    return document.getElementById(name);
}
function getTag(parent, tag) {
    return parent.getElementsByTagName(tag);
}
function getClass(parent, name) {
    return parent.getElementsByClassName(name);
}