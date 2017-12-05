export class Input {
    private pushList: { [key: string]: KeyboardEvent } = {};

    constructor(private element: HTMLElement) {
        element.addEventListener("keydown", e => {
            this.pushList[e.key] = e;
            console.log(e);
        });
        element.addEventListener("keyup", e => {
            delete this.pushList[e.key];
        });
    }

    isPush(key: string): KeyboardEvent | null {
        return this.pushList[key];
    }
}