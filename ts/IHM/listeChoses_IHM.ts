import * as NF 			from "../NF/nf";
import {ComponentIHM} 	from "./ComponentIHM";
import {ChoseIHM}		from "./Chose_IHM";

const htmlTemplate = `
	<section class="todoapp">
		<header class="header">
			<h1>Liste</h1>
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
export class ListeChosesIHM extends ComponentIHM {
	constructor(public NF: NF.ListeChoses, rootSelector) {
		super(NF, document.querySelector( rootSelector ));
	}
};


