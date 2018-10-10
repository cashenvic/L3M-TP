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
    private label : HTMLLabelElement;
    private supp : HTMLButtonElement;
    private cbox : HTMLInputElement ;
    private editer : HTMLInputElement;
  
    constructor(public model: TodoItemModel, root: HTMLElement | string) {
        super(model, root);
        this.root.innerHTML = htmlTemplate;
      
        // Etape 0: Identifier les éléments intéressant pour le HTML
        this.label = this.root.querySelector("label") as HTMLLabelElement;
        this.label.textContent = model.label;

        this.supp = this.root.querySelector("button") as HTMLButtonElement;
        this.supp.addEventListener("click", ()  => {
            this.model.dispose();
            const div = this.root.querySelector("div");
            this.root.removeChild(div);
        });

        this.editer = this.root.querySelector('input.edit') as HTMLInputElement;
        this.editer.setAttribute('value', model.label);



      
        // Bloc 1 : S'abonner aux interaction sur la vue et les traduire en commandes model
        this.cbox = this.root.querySelector("input.toggle");
        this.cbox.addEventListener("click", () => {
            this.label.className = "completed";
            this.model.done = this.cbox.checked;
            /*on ne peux creer un nouveau element strike
            pour avoir un texte barré
            il faut 'checked' sur le checkbox sur le input du checkbox
            ->
             this.cbox.setAttribute('checked');
            */
        });

        // Bloc 2 : S'abonner aux model et mettre à jour la vue en conséquence
    }
}
