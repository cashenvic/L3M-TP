import {Chose} from "@NF/nf";
import {ComponentIHM} from "./ComponentIHM";

const htmlTemplate = `
	<div class="view">
		<input class="toggle" type="checkbox">
		<label class="texte"></label>
		<button class="destroy"></button>
	</div>
	<form>
	    <input class="edit"/>
    </form>
`;

// Classe à compléter...
export class ChoseIHM extends ComponentIHM {
    constructor(public NF: Chose, root: HTMLElement | string) {
        super(NF, root);
        this.root.innerHTML = htmlTemplate;

        // Etape 0: Identifier les éléments intéressant pour le HTML

        // Bloc 1 : S'abonner aux interaction sur la vue et les traduire en commandes NF

        // Bloc 2 : S'abonner aux NF et mettre à jour la vue en conséquence
    }
}
