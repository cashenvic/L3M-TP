import * as NF from "./nf";

export let dataPromise = new Promise<NF.ListeChoses>( (resolve) => {
    setTimeout(() => resolve( new NF.ListeChoses() ), 100);
} );
