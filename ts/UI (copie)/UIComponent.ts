import {Model} from "@NF/Models";

export class UIComponent {
    root: HTMLElement;
    model: Model;
    constructor(model: Model, root: HTMLElement | string) {
        this.model = model;
        this.root  = this.getRoot(root);
    }
    dispose() {
        this.root.parentNode.removeChild( this.root );
        this.root.innerHTML = "";
    }
    private getRoot(rootSelector: HTMLElement | string): HTMLElement {
        let root: HTMLElement;
        if (rootSelector instanceof HTMLElement) {
            root = rootSelector;
        } else {
            root = document.querySelector( rootSelector ) as HTMLElement;
        }
        return root;
    }
}
