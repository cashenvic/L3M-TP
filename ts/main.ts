import {TodoListModel} from "@NF/Models";
import {TodoListUI} from "@UI/TodoListUI";

// Instantiate a Model and a UI
const tdlNF = new TodoListModel();
new TodoListUI(tdlNF, "#sansFramework");

// Subscribe to tdlNF to save locally the list
function serializeList() {
    const items = tdlNF.items;
    localStorage.setItem(
        "L3M-TP3-list",
        JSON.stringify( items.map( item => ({label: item.label, done: item.done}) ) )
    );
}

tdlNF.on("update", (m, eName, evt) => {
  serializeList();
  if (evt.append) {
    const item = evt.append;
    item.on("update", serializeList);
  }
});

// At the begining, unserialize the list saved locally, if any
const itemsSerialized = localStorage.getItem("L3M-TP3-list") || "[]";
JSON.parse( itemsSerialized ).forEach( item => tdlNF.append(item.label, item.done) );
