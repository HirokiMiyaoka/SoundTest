class Diva {
    constructor() {
        this.files = {};
    }
    add(...files) {
        files.forEach((file) => {
            if (typeof file === 'string') {
                this.files[file] = new Audio(file);
            }
            else {
                this.files[file.file] = new Audio(file.file);
                this.files[file.file].loop = !!file.loop;
            }
        });
        return this;
    }
    play(file) {
        if (!this.files[file]) {
            return this;
        }
        this.files[file].play();
        return this;
    }
    pause(file) {
        if (file) {
            if (!this.files[file]) {
                return this;
            }
            this.files[file].pause();
            this.files[file].currentTime = 0;
            return this;
        }
        Object.keys(this.files).forEach((key) => {
            this.files[key].pause();
            this.files[key].currentTime = 0;
        });
        return this;
    }
    stop(file) {
        if (file) {
            if (!this.files[file]) {
                return this;
            }
            this.files[file].pause();
            this.files[file].currentTime = 0;
            return this;
        }
        Object.keys(this.files).forEach((key) => {
            this.files[key].pause();
            this.files[key].currentTime = 0;
        });
        return this;
    }
    next(file) {
        if (!this.files[file]) {
            return this;
        }
        Object.keys(this.files).forEach((key) => {
            if (key !== file) {
                this.files[key].pause();
                return;
            }
        });
        this.files[file].play();
        return this;
    }
    get(file) { return this.files[file]; }
    count() { return Object.keys(this.files).length; }
}
window.Diva = Diva;
