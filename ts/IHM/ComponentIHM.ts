import {NF as ClassNF} from "@NF/nf";

export class ComponentIHM {
    root: Element;
    NF  : ClassNF;
    constructor(NF: ClassNF, root: Element) {
        this.NF   = NF;
        this.root = root;
    }
    dispose() {
        this.root.parentNode.removeChild( this.root );
        this.root.innerHTML = "";
    }
}
