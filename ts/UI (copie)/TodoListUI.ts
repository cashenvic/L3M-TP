import {TodoItemModel, TodoListModel} from "@NF/Models";
import {UIComponent} from "./UIComponent";
import {TodoItemUI} from "@UI/TodoItemUI";

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
    private section: HTMLElement;
    private formulaire: HTMLFormElement;
    private queFaire: HTMLInputElement;
    private cbxDone: HTMLInputElement;
    private ul: HTMLUListElement;

    constructor(public listModel: TodoListModel, root: HTMLElement | string) {
        super(listModel, root);
        this.root.innerHTML = htmlTemplate;

        // Etape 0: Identifier dans le DOM les balises qui m'intéressent

        this.section = document.querySelector("section.main");
        this.formulaire = document.querySelector("form");
        this.queFaire = document.querySelector("input.new-todo");
        this.cbxDone = document.querySelector("input.toggle-all");
        this.ul = document.querySelector("ul");

        this.formulaire.onsubmit = (evt) => {
            listModel.append(this.queFaire.value);
            this.queFaire.value = "";
            evt.preventDefault();
        };
        // console.log( "Il faut injecter le template HTML dans la balise racine", this.root, "du composant TodoListUI");

        // Etape 1: On traduit les événements issus du HTML en commandes du noyau fonctionnel

        listModel.on( "update", (todoListModel, eventName, event) => {
            if (event.append !== undefined) {
                const item: TodoItemModel = event.append;
                const li = document.createElement("li");
                this.ul.appendChild(li);
                new TodoItemUI(item , li);
            }
        });

        // Etape 2: Traduire les événements du Noyau fonctionnel en commandes à l'IHM

    }
}





