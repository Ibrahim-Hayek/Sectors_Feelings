import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button mat-flat-button class="editItem tableAction" type="button" (click)="onClickEdit($event)" matTooltip="Edit"
    matTooltipClass="normativeTooltip" [matTooltipPosition]="position.value">
       <mat-icon>edit</mat-icon>
    </button>
    <button mat-flat-button class="deleteItem tableAction" type="button" (click)="onClickDelete($event)"  matTooltip="Delete"
    matTooltipClass="normativeTooltip" [matTooltipPosition]="position.value">
       <mat-icon>delete</mat-icon>
    </button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  position = new FormControl('above');

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClickEdit($event: any) {
    $event.stopPropagation();
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        rowId: this.params.data.id,
        isEdit: true
      }
      this.params.onClick(params);

    }
  }

  onClickDelete($event: any) {
    $event.stopPropagation();
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        data: this.params.data,
        isDelete: true
      }
      this.params.onClick(params);

    }
  }
}