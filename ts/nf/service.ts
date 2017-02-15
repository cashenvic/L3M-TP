import {ListeChoses} from "./nf";

export let dataPromise = new Promise<ListeChoses>( (resolve) => {
    setTimeout(() => resolve( new ListeChoses() ), 100);
} );
