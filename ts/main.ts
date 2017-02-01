/* Noyau fonctionnel */
import {ListeChoses} from "@NF/nf";
import {dataPromise} from "@NF/service";

/* Version sans framework */
import {ListeChosesIHM} from "./IHM/listeChoses_IHM";
let PromesseDocumentPret = new Promise( (resolve) => {
	if(document.readyState === "complete") {
		resolve();
	} else {
		document.body.onload = resolve;
	}
});

let P_all = Promise.all( [dataPromise, PromesseDocumentPret] );
P_all.then( ([liste]: [ListeChoses, {}]) => {
	console.log("Initialisation...");
	new ListeChosesIHM(liste, "#sansFramework");
});
