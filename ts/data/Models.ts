type NF_CallBack = (models: NF, eventName: string, value: any) => void;

export class NF {
    private cbList: Map<string, NF_CallBack[]>;

    constructor() {
        this.cbList = new Map<string, NF_CallBack[]>();
    }

    emit(eventName: string, value: any): this {
        if (this.cbList.has(eventName)) {
            let array = this.cbList.get(eventName);
            array.forEach(cb => cb(this, eventName, value));
        }
        return this;
    }

    on(eventName: string, cb: NF_CallBack): this {
        let array: NF_CallBack[] = this.cbList.get(eventName) || [];
        this.cbList.set(eventName, [...array, cb]);
        return this;
    }

    off(eventName: string, cb: NF_CallBack): this {
        if (this.cbList.has(eventName)) {
            let array: NF_CallBack[] = this.cbList.get(eventName) || [];
            this.cbList.set(eventName, array.filter( c => c !== cb ) );
        }
        return this;
    }
}

export type TodoItemEvent = {
    done?: boolean,
    label?: string
};
export type TodoItemNF_CallBack = (nf: TodoItemNF, eventName: string, value: TodoItemEvent) => void;

export class TodoItemNF extends NF {
    private readonly _todoListNF: TodoListNF;
    private _label: string;
    private _done: boolean;

    constructor(todoList: TodoListNF, label: string, done: boolean = false) {
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

    on(eventName: "update", cb: TodoItemNF_CallBack): this {
        return super.on(eventName, cb);
    }

    off(eventName: "update", cb: TodoItemNF_CallBack): this {
        return super.off(eventName, cb);
    }
}

export type TodoListEvent = { append?: TodoItemNF, remove?: TodoItemNF };
export type TodoListNF_CallBack = (nf: TodoItemNF, eventName: string, value: TodoListEvent) => void;

export class TodoListNF extends NF {
    private _items: TodoItemNF[] = [];

    constructor() {
        super();
    }

    get items(): TodoItemNF[] {
        return this._items.slice();
    }

    append(label: string, done: boolean = false): this {
        let item = new TodoItemNF(this, label, done);
        this._items = [...this._items, item];
        this.emit("update", {append: item});
        return this;
    }

    remove(item: TodoItemNF): this {
        this._items = this.items.filter( i => i !== item );
        this.emit("update", {remove: item});
        return this;
    }

    on(eventName: "update", cb: TodoListNF_CallBack): this {
        return super.on(eventName, cb);
    }

    off(eventName: "update", cb: TodoListNF_CallBack): this {
        return super.off(eventName, cb);
    }
}
