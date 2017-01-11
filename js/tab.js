function Tab(id) {
    this.box = document.getElementById(id);
    this.btns = this.box.querySelector('.nav');
    this.inputs = this.btns.getElementsByTagName('span');
    this.divs = this.box.querySelector('.divs');
    this.divsChild = this.divs.getElementsByTagName('p');
    this.timerTab = null;
    this.color = ['#3c81df', '#e3a520', '#d85245', '#11b076', '#3c81df'];
    this.num = 0;//当前显示
    this.old = 0;//上一个显示
    this.event();
}

Tab.prototype.event = function () {
    var _this = this;
    for (var i = 0; i < _this.inputs.length; i++) {
        (function (i) {
            _this.inputs[i].addEventListener('mouseover', function () {
                _this.num = i;
                _this.change(_this.num);
            })
        })(i);
    }
};

Tab.prototype.autoplay = function () {
    var _this = this;
    clearInterval(_this.timerTab);
    _this.timerTab = setInterval(function () {
        _this.num++;
        _this.num = _this.num > _this.inputs.length - 1 ? 0 : _this.num;
        _this.change(_this.num);
    }, 3000);
};

Tab.prototype.stop = function () {
    clearInterval(this.timerTab);
    this.timerTab = null;
};

Tab.prototype.change = function (index) {
    this.inputs[this.old].className = '';
    this.divsChild[this.old].className = 'hide';
    this.inputs[this.old].style.color = '#fff';

    this.inputs[index].className = 'active';
    this.divsChild[index].className = 'show';
    this.inputs[index].style.color = this.color[index];

    this.box.style.transition.index = '.5s';
    this.box.style.backgroundColor = this.color[index];

    this.old = index;
};


new Tab('user');
