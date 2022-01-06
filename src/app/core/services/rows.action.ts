import { Row } from 'src/app/models/rowModal';

export class AddRow {
    static readonly type = '[Row] Add';
    constructor(public payload: Row) { }
}

export class DeleteRow {
    static readonly type = '[Row] Delete';
    constructor(public id: number) { }
}

export class EditRow {
    static readonly type = '[Row] Edit';
    constructor(public payload: Row) { }
}