var Diva = (function () {
    function Diva() {
        this.files = {};
    }
    Diva.prototype._add = function (file, key) {
        if (!key) {
            key = file;
        }
        if (this.files[key] && this.files[key].src === file) {
            return this.files[key];
        }
        this.files[key] = new Audio(file);
        return new Audio(file);
    };
    Diva.prototype.add = function () {
        var _this = this;
        var files = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            files[_i] = arguments[_i];
        }
        files.forEach(function (file) {
            if (typeof file === 'string') {
                _this._add(file);
            }
            else {
                _this._add(file.file, file.name).loop = !!file.loop;
            }
        });
        return this;
    };
    Diva.prototype.play = function (file) {
        if (!this.files[file]) {
            return this;
        }
        this.files[file].play();
        return this;
    };
    Diva.prototype.pause = function (file) {
        var _this = this;
        if (file) {
            if (!this.files[file]) {
                return this;
            }
            this.files[file].pause();
            this.files[file].currentTime = 0;
            return this;
        }
        Object.keys(this.files).forEach(function (key) {
            _this.files[key].pause();
            _this.files[key].currentTime = 0;
        });
        return this;
    };
    Diva.prototype.stop = function (file) {
        var _this = this;
        if (file) {
            if (!this.files[file]) {
                return this;
            }
            this.files[file].pause();
            this.files[file].currentTime = 0;
            return this;
        }
        Object.keys(this.files).forEach(function (key) {
            _this.files[key].pause();
            _this.files[key].currentTime = 0;
        });
        return this;
    };
    Diva.prototype.next = function (file) {
        var _this = this;
        if (!this.files[file]) {
            return this;
        }
        Object.keys(this.files).forEach(function (key) {
            if (key !== file) {
                _this.files[key].pause();
                return;
            }
        });
        this.files[file].play();
        return this;
    };
    Diva.prototype.get = function (file) { return this.files[file]; };
    Diva.prototype.count = function () { return Object.keys(this.files).length; };
    return Diva;
}());
window.Diva = Diva;
