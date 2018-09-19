import {TodoListModel} from "@NF/Models";
import {UIComponent} from "./UIComponent";

const htmlTemplate = `
	<section class="todoapp">
		<header class="header">
			<h1>TP3 : Liste</h1>
			<form action="#/">
				<input class="new-todo" placeholder="Que faire?" autofocus>
			</form>
		</header>
		<section class="main">
			<input class="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list"></ul>
		</section>
	</section>
`;

// Classe à compléter...
export class TodoListUI extends UIComponent {
    private form: HTMLFormElement;
    private ul: HTMLUListElement;
    private inputToggleAll: HTMLInputElement;
    private newTodoInput: HTMLInputElement;

    constructor(public model: TodoListModel, root: HTMLElement | string) {
        super(model, root);
        this.root.innerHTML = htmlTemplate;

        // Etape 0: Identifier dans le DOM les balises qui m'intéressent
        this.form           = this.root.querySelector( "form"               );
        this.ul             = this.root.querySelector( "ul.todo-list"       );
        this.inputToggleAll = this.root.querySelector( "input.toggle-all"   );
        this.newTodoInput   = this.root.querySelector( "input.new-todo"     );

        // Etape 1: On traduit les événements issus du HTML en commandes du noyau fonctionnel
        this.form.onsubmit = () => {

        }

        // Etape 2: Traduire les événements du Noyau fonctionnel en commandes à l'IHM

    }
}





