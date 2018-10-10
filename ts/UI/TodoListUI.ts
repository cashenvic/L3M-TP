import {TodoListModel} from "../data/Models";
import {UIComponent} from "./UIComponent";
import {TodoItemUI} from "./TodoItemUI";
import {TodoItemModel} from "../data/Models";

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
    private todoapp : HTMLTableSectionElement;
    private footer : HTMLElement;
    private ulfter : HTMLUListElement;
    private span : HTMLSpanElement;    
    private strong : HTMLElement;
    private li1 : HTMLElement;
  
  /*  private li2 : HTMLElement;
    private li3 : HTMLElement;
    private button : HTMLButtonElement;*/

    constructor(public model: TodoListModel, root: HTMLElement | string) {
        super(model, root);
        this.root.innerHTML = htmlTemplate;
        //console.log( "Il faut injecter le template HTML dans la balise racine", this.root, "du composant TodoListUI");

        // Etape 0: Identifier dans le DOM les balises qui m'intéressent
        this.form           = this.root.querySelector( "form"               );
        this.ul             = this.root.querySelector( "ul.todo-list"       );
        this.inputToggleAll = this.root.querySelector( "input.toggle-all"   );
        this.newTodoInput   = this.root.querySelector( "input.new-todo"     );

        //console.log(this.ul, this.inputToggleAll, this.newTodoInput);

        // Etape 1: On traduit les événements issus du HTML en commandes du noyau fonctionnel
        this.form.onsubmit = (evt) => {
            model.append( this.newTodoInput.value );
            this.newTodoInput.value = "";
            evt.preventDefault(); // Permet de ne pas rafraichir la page...
        };

        // Etape 2: Traduire les événements du Noyau fonctionnel en commandes à l'IHM
        model.on( "update" , cbLog);
        model.on( "update", (todoListModel, eventName, event) => {
            if (event.append !== undefined){
                const itemModel: TodoItemModel = event.append;
                const li = document.createElement("li");
                const itemIU = new TodoItemUI(itemModel , li);
                this.ul.appendChild(li);
            }
            if (event.remove !== undefined) {
                const itemModel : TodoItemModel = event.remove;
            }
        });
        /*
         this.inputToggleAll.addEventListener("click", () => {
            const listeLi = this.ul.querySelectorAll("li")as HTMLElement[];
            const input = listeLi[0].querySelector("input") as HTMLInputElement;

            if (input.hasAttribute("checked")){
                listeLi.forEach( (i) => {
                    const input = i.querySelector("input") as HTMLInputElement;
                    input.removeAttribute("checked");
                    i.className = "";
                });
            } else {
                listeLi.forEach((i) => {
                    const input = i.querySelector("input") as HTMLInputElement;
                    input.setAttribute("checked", "checked");
                    i.className = "completed";
                });
            }

        });*/

       // const listeLi = this.ul.querySelectorAll("li")as HTMLElement[];        
      //  const input = listeLi[0].querySelector("input") as HTMLInputElement;

        function check(liste: HTMLElement[]) {
          let verif = false;

         /* liste.forEach((model.items, v) => {
            if (v.done == true) {
              verif = true;
            }
          });*/
        }


        this.inputToggleAll.addEventListener("click", () => {
          const listeLi = this.ul.querySelectorAll("li") as HTMLLIElement[];
            if (check(listeLi)) {
                listeLi.forEach( (i) => {
                    const input = i.querySelector("input") as HTMLInputElement;
                    input.removeAttribute("checked");
                    i.className = "";
                });
            } else  {
                listeLi.forEach((i) => {
                    const input = i.querySelector("input") as HTMLInputElement;
                    input.setAttribute("checked", "checked");
                    i.className = "completed";
                });
            }

        });
        
        // page de pied
        const footer = document.createElement('footer');
        footer.setAttribute("class","footer");
        this.todoapp = this.root.querySelector("section.todoapp");
        this.todoapp.appendChild(footer);
        this.footer =this.root.querySelector("footer");

        // compteur d'element
        const span = document.createElement("span");
        span.setAttribute("class","todo-count");
        this.footer.appendChild(span);
        this.span = this.root.querySelector("span.todo-count") as HTMLElement;

        const strong = document.createElement("strong");
        this.span.appendChild(strong);
        let nbItems = this.model.items.length;
        this.span.textContent = nbItems + ' item left';
        this.strong = this.root.querySelector("span strong");


        const ulfter = document.createElement("ul");
        ulfter.setAttribute("class","filters");
        this.footer.appendChild(ulfter);
        this.ulfter = this.root.querySelector("ul.filter");


/*
        const li1 = document.createElement("li");        
        this.footer.appendChild(li1);        
        this.li1 = this.root.querySelector("ul.filter li");

        const a = document.createElement("a");
        a.setAttribute("class","selected");
        a.setAttribute("href","#/");
        a.textContent ="All";
        this.li1.appendChild(a);

        const li2 = document.createElement("li");        
        this.footer.appendChild(li2);        
        this.li2 = this.root.querySelector("footer ul li[1]");
        this.li2.innerHTML ='<a href="#/active">Active</a>';

        const li3 = document.createElement("li");                
        this.footer.appendChild(li3);
        this.li3 = this.root.querySelector("footer ul li[2]");
        this.li3.innerHTML ='<a href="#/completed">Completed</a>';

        const button = document.createElement("button");
        button.setAttribute("class","clear-completed");
        button.innerHTML='Clear completed';
        this.footer.appendChild(button);
        this.button = this.root.querySelector("button.clear-completed");
        
        this.strong.value = document.getElementById("todo-list").getElementsByTagName("li").length;
*/
        

        
    }
}


function cbLog(model, eventName, event) {
    console.log(model, "dit", eventName, "avec", event);
}




