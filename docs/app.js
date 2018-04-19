class Diva {
    constructor() {
        this.files = {};
    }
    add(...files) {
        files.forEach((file) => {
            if (typeof file === 'string') {
                this.files[file] = new Audio();
                this.files[file].load();
            }
            else {
                this.files[file.file] = new Audio();
                this.files[file.file].loop = !!file.loop;
                this.files[file.file].load();
            }
        });
        return this;
    }
    play(file) {
        console.log('play', file);
        if (!this.files[file]) {
            return this;
        }
        this.files[file].play();
        return this;
    }
    stop(file) {
        if (file) {
            if (!this.files[file]) {
                return this;
            }
            this.files[file].pause();
            return this;
        }
        Object.keys(this.files).forEach((key) => {
            this.files[key].pause();
        });
    }
    nextPlay(file) {
        if (!this.files[file]) {
            return;
        }
        Object.keys(this.files).forEach((key) => {
            if (key !== file) {
                this.files[key].pause();
                return;
            }
            if (!this.files[key].ended) {
                return;
            }
            this.files[key].play();
        });
    }
    get(file) { return this.files[file]; }
    count() { return Object.keys(this.files).length; }
}
window.Diva = Diva;
