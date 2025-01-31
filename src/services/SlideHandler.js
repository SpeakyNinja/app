export default class SlideHandler {
    container;
    endHandler;
    moveHandler;
    direction;
    startPos;
    lastMoveEvent;

    ts;
    tm;
    te;

    constructor(container, endHandler, moveHandler = null, direction = 'y') {
        this.container = container;
        this.endHandler = endHandler;
        this.moveHandler = moveHandler;
        this.direction = direction;

        this.ts = this.touchStartHandler.bind(this);
        this.tm = this.touchMoveHandler.bind(this);
        this.te = this.touchEndHandler.bind(this);

        this.init();
    }

    init() {
        this.container.addEventListener('touchstart', this.ts);
        this.container.addEventListener('touchmove', this.tm);
        this.container.addEventListener('touchend', this.te);
    }

    clearListeners() {
        this.container.removeEventListener('touchstart', this.ts);
        this.container.removeEventListener('touchmove', this.tm);
        this.container.removeEventListener('touchend', this.te);
    }

    touchStartHandler(e) {
        this.startPos = this.getPosition(e);
    }

    touchMoveHandler(e) {
        this.lastMoveEvent = e;

        // if(this.direction == 'y') {
        //     e.preventDefault();
        // }

        const distance = this.getPosition(this.lastMoveEvent) - this.startPos;

        if(this.moveHandler) {
            this.moveHandler(distance);
        }
    }

    touchEndHandler(e) {
        if(!this.lastMoveEvent) {
            return null;
        }

        const clientY = this.getPosition(this.lastMoveEvent);
        const delta = Math.abs(this.startPos - clientY);
        const direction = clientY < this.startPos ? 1 : -1;
        this.endHandler(direction, delta, e);
        this.lastMoveEvent = null;
    }

    getPosition(e) {
        if(this.direction == 'x') {
            return e.touches[0].clientX;
        }

        return e.touches[0].clientY;
    }
}