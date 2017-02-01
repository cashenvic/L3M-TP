import {NF as ClassNF} from "@NF/nf";

export class ComponentIHM {
    root: HTMLElement;
    NF  : ClassNF;
    constructor(NF: ClassNF, root: HTMLElement | string) {
        this.NF   = NF;
        this.root = this.getRoot(root);
    }
    dispose() {
        this.root.parentNode.removeChild( this.root );
        this.root.innerHTML = "";
    }
    private getRoot(rootSelector: HTMLElement | string) : HTMLElement {
        let root : HTMLElement;
        if(rootSelector instanceof HTMLElement) {
            root = rootSelector;
        } else {
            root = document.querySelector( rootSelector ) as HTMLElement;
        }
        return root;
    }
}
