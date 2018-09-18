import {TodoItemNF} from "@NF/Models";
import {UIComponent} from "./UIComponent";

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
export class TodoItemUI extends UIComponent {
    constructor(public NF: TodoItemNF, root: HTMLElement | string) {
        super(NF, root);
        this.root.innerHTML = htmlTemplate;

        // Etape 0: Identifier les éléments intéressant pour le HTML

        // Bloc 1 : S'abonner aux interaction sur la vue et les traduire en commandes NF

        // Bloc 2 : S'abonner aux NF et mettre à jour la vue en conséquence
    }
}
