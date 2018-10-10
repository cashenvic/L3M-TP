import {TodoItemModel} from "@NF/Models";
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
    private cbxFait: HTMLInputElement;
    private labelText: HTMLLabelElement;
    private bouton: HTMLButtonElement;
    private formulaire: HTMLFormElement;

    constructor(public ItemModel: TodoItemModel, root: HTMLElement | string) {
        super(ItemModel, root);
        this.root.innerHTML = htmlTemplate;

        // Etape 0: Identifier les éléments intéressant pour le HTML
        this.cbxFait = document.querySelector("input.toogle");
        this.labelText = document.querySelector("label.texte");
        this.bouton = document.querySelector("button.destroy");
        this.formulaire = document.querySelector("form");

        // Bloc 1 : S'abonner aux interaction sur la vue et les traduire en commandes ItemModel
        this.labelText.textContent = this.ItemModel.label;

        this.bouton.addEventListener("click", () => {
            this.ItemModel.dispose();
        });

        this.formulaire.onsubmit = () => {

        };

        // Bloc 2 : S'abonner aux ItemModel et mettre à jour la vue en conséquence
        this.ItemModel.on("update", (model, eventName, event) => {

        });

    }
}
