import {Chose} 			from "@NF/nf";
import {ComponentIHM} 	from "./ComponentIHM";

const htmlTemplate = `
	<div class="view">
		<input class="toggle" type="checkbox">
		<label class="texte"></label>
		<button class="destroy"></button> 
	</div>
`;

// Classe à compléter...
export class ChoseIHM extends ComponentIHM {
	constructor(public NF: Chose, root: HTMLElement | string) {
		super(NF, root);
		this.root.innerHTML = htmlTemplate;

		// Etape 0: J'identifie les éléments intéressant pour le HTML
		let label: HTMLLabelElement = this.root.querySelector( "label" ) as HTMLLabelElement;
		label.textContent = NF.texte;

		// Bloc 1 : S'abonner aux interaction sur la vue et les traduire en commandes NF
		let inputFait : HTMLInputElement = this.root.querySelector( "input.toggle" ) as HTMLInputElement;
		inputFait.addEventListener("change", (evt) => {
			console.log("La vue dit que", evt);
			NF.Fait( inputFait.checked );
		}, false);

		// Bloc 2 : S'abonner aux NF et mettre à jour la vue en conséquence
		NF.on("update", (nf, eventName, event) => {
			console.log("Le NF a dit que", event);
		});
	}
}
