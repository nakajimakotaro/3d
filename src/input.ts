export class Input {
    private pushList: { [key: string]: KeyboardEvent } = {};
    private mouse: MouseEvent | null = null;

    constructor(private element: HTMLElement) {
        element.addEventListener("keydown", e => {
            this.pushList[e.key] = e;
        });
        element.addEventListener("keyup", e => {
            delete this.pushList[e.key];
        });
        element.addEventListener("mousemove", e => {
            this.mouse = e;
        })
    }

    isPush(key: string): KeyboardEvent | null {
        return this.pushList[key];
    }

    mousePos() {
        if (this.mouse == null) {
            return null;
        }
        //@ts-ignore
        let rect = this.mouse.target.getBoundingClientRect();

        return {
            x: this.mouse.clientX - rect.left,
            y: this.mouse.clientY - rect.top
        };
    }
}