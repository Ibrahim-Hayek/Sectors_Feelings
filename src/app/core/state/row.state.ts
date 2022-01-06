import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Row } from 'src/app/models/rowModal';
import { AddRow, DeleteRow, EditRow } from '../services/rows.action';
import { Injectable } from '@angular/core';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

export class RowStateModel {
    rows: Row[];
}

@State<RowStateModel>({
    name: 'rows',
    defaults: {
        rows: [],
    }
})
@Injectable()
export class RowState {

    @Selector() static rows(state:any){ return state.rows }

    @Action(AddRow)
    add({ getState, patchState }: StateContext<RowStateModel>, { payload }: AddRow) {
        const state = getState();
        patchState({
            rows: [...state.rows, payload]
        });
    }

    @Action(DeleteRow)
    deleteRow(ctx: StateContext<RowStateModel>, { id }: DeleteRow) {
        ctx.setState(
            patch({
                rows: removeItem<any>(item => item.id === id.toString())
            })
        );
    }

    @Action(EditRow)
    editRow(ctx: StateContext<RowStateModel>, { payload }: EditRow) {
        ctx.setState(
            patch({
                rows: updateItem<any>(item => item.id === payload.id.toString(), payload)
            })
        );
    }
}