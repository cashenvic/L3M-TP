import * as NF 			from "../NF/nf";
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
	constructor(public NF: NF.Chose, public root: Element) {
		super(NF, root);
	}
}
