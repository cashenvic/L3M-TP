type ModelCallBack = (model: Model, eventName: string, value: any) => void;

export class Model {
    private cbList: Map<string, ModelCallBack[]>;

    constructor() {
        this.cbList = new Map<string, ModelCallBack[]>();
    }

    emit(eventName: string, value: any): this {
        if (this.cbList.has(eventName)) {
            let array = this.cbList.get(eventName);
            array.forEach(cb => cb(this, eventName, value));
        }
        return this;
    }

    on(eventName: string, cb: ModelCallBack): this {
        let array: ModelCallBack[] = this.cbList.get(eventName) || [];
        this.cbList.set(eventName, [...array, cb]);
        return this;
    }

    off(eventName: string, cb: ModelCallBack): this {
        if (this.cbList.has(eventName)) {
            let array: ModelCallBack[] = this.cbList.get(eventName) || [];
            this.cbList.set(eventName, array.filter( c => c !== cb ) );
        }
        return this;
    }
}

export type TodoItemEvent = {
    done?: boolean,
    label?: string
};
export type TodoItemCallBack = (nf: TodoItemModel, eventName: string, value: TodoItemEvent) => void;

export class TodoItemModel extends Model {
    private readonly _todoListNF: TodoListModel;
    private _label: string;
    private _done: boolean;

    constructor(todoList: TodoListModel, label: string, done: boolean = false) {
        super();
        this._label      = label;
        this._done       = done;
        this._todoListNF = todoList;
    }

    dispose() {
        this._todoListNF.remove(this);
    }

    get label(): string {
        return this._label;
    }
    set label(label: string) {
        this._label = label;
        this.emit("update", {label: label});
    }

    get done(): boolean {
        return this._done;
    }
    set done(done: boolean) {
        this._done = done;
        this.emit("update", {done: done});
    }

    on(eventName: "update", cb: TodoItemCallBack): this {
        return super.on(eventName, cb);
    }

    off(eventName: "update", cb: TodoItemCallBack): this {
        return super.off(eventName, cb);
    }
}

export type TodoListEvent = { append?: TodoItemModel, remove?: TodoItemModel };
export type TodoListCallBack = (nf: TodoItemModel, eventName: string, value: TodoListEvent) => void;

export class TodoListModel extends Model {
    private _items: TodoItemModel[] = [];

    constructor() {
        super();
    }

    get items(): TodoItemModel[] {
        return this._items.slice();
    }

    append(label: string, done: boolean = false): this {
        let item = new TodoItemModel(this, label, done);
        this._items = [...this._items, item];
        this.emit("update", {append: item});
        return this;
    }

    remove(item: TodoItemModel): this {
        this._items = this.items.filter( i => i !== item );
        this.emit("update", {remove: item});
        return this;
    }

    on(eventName: "update", cb: TodoListCallBack): this {
        return super.on(eventName, cb);
    }

    off(eventName: "update", cb: TodoListCallBack): this {
        return super.off(eventName, cb);
    }
}
