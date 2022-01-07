import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonRendererComponent } from './button-renderer.component';
import { Guid } from 'guid-typescript';
import { Store, Select } from '@ngxs/store';
import { AddRow, DeleteRow, EditRow } from 'src/app/core/services/rows.action';
import { Observable } from 'rxjs';
import { Row } from 'src/app/models/rowModal';
import { RowState } from 'src/app/core/state/row.state';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {

  constructor(
    private store: Store
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
    this.getRowNodeId = function (data: any) {
      return data.id;
    };
  }

  @Output() editItem: EventEmitter<any> = new EventEmitter();
  @Output() deleteItem: EventEmitter<any> = new EventEmitter();
  @Output() gridReady: EventEmitter<void> = new EventEmitter();

  frameworkComponents: any;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef = {
    sortable: true,
    lockPosition: true,
  };
  columnDefs = [
    { headerName: 'Sector', field: 'sector', headerTooltip: 'The sector name', flex: 4, },
    { headerName: 'CO2', field: 'co2', headerTooltip: 'The CO2 number', flex: 1, cellStyle: { 'font-size': '14px', 'text-align': 'center' }, headerClass: 'alignCenterHeader' },
    { headerName: 'Feeling', field: 'feeling', headerTooltip: 'The feeling', flex: 1, cellStyle: { 'font-size': '20px', 'text-align': 'center' }, headerClass: 'alignCenterHeader' },
    {
      flex: 2, cellStyle: { 'font-size': '14px', 'text-align': 'center' }, headerClass: 'alignCenterHeader', headerName: 'Actions', cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onRowActionClick.bind(this),
      },
    },
  ];
  rowHeight = 50;
  rowSelection = 'single';
  getRowNodeId: any;
  paginationPageSize: number;
  rows: Observable<Row>;

  onPaginationChanged(e: any) {
  }

  ngOnInit(): void {
    this.paginationPageSize = 10;
  }

  // Called when the table grid is ready
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDomLayout('autoHeight');
    this.setRowsFromStorage();
    this.gridReady.emit();
  }

  // Row buttons click actions edit & delete
  onRowActionClick(params: any): void {
    if (params.isEdit) { // Edit Action
      const rows = this.getAllRows()
      var itemToEdit = rows.filter(item => item.id == params.rowId)[0];
      this.editItem.emit(itemToEdit);
    }
    else if (params.isDelete) { // Delete Action
      this.deleteItem.emit(params)
    }
  }

  // Get rows from localStorage and set them to the grid rows
  setRowsFromStorage(): void {
    this.store.select(RowState.rows).subscribe((rowsFromStore: Row[]) => {
      if (rowsFromStore && rowsFromStore.length == 0) {
        const rowsToAdd = JSON.parse(localStorage.getItem('rows') || '{}');
        if (rowsToAdd instanceof Array) {
          rowsToAdd.forEach((element: Row) => {
            this.store.dispatch(new AddRow(element));
          });
        }
      }
    });
    const rowsToAddToGrid = JSON.parse(localStorage.getItem('rows') || '{}');
    if (rowsToAddToGrid instanceof Array) {
      this.gridApi.updateRowData({
        add: rowsToAddToGrid
      });
    }
    else {
      this.gridApi.updateRowData({
        add: []
      });
    }
  }

  // Returns all rows of the table grid 
  getAllRows(): any[] {
    const rowData: any[] = [];
    this.gridApi.forEachNode((node: any) => rowData.push(node.data));
    return rowData;
  }

  // Returns all rows of the table grid 
  getAllRowsNumber(): number {
    var rowData: number = 0;
    this.gridApi.forEachNode((node: any) => rowData++);
    return rowData;
  }

  goToNext(): void {
    this.gridApi.paginationGoToNextPage();
  }

  goToPrev(): void {
    this.gridApi.paginationGoToPreviousPage();
  }

  // Add new item to the grid
  addNewItem(formValue: any, sector: string): void {
    const guid = Guid.create();
    const itemToAdd = {
      sector: sector,
      co2: formValue.co2,
      feeling: formValue.feeling,
      sectorId: formValue.sector,
      id: guid.toString()
    }
    this.gridApi.updateRowData({
      add: [itemToAdd]
    });
    this.store.dispatch(new AddRow(itemToAdd));
  }

  // delete item from the grid
  deleteGridItem(data: any): void {
    this.gridApi.updateRowData({ remove: [data] });
    this.store.dispatch(new DeleteRow(data.id));
  }

  confirmAddCallBack(newData: Row) {
    this.store.dispatch(new EditRow(newData));
  }

  // apply the filter on the grid
  filter(event: string): void {
    this.gridApi.setQuickFilter(event);
  }

  exportToExcel(): void {
    this.gridApi.exportDataAsCsv({
      columnKeys: ['sector', 'co2', 'feeling'],
      fileName: 'Sectors Feelings' + (new Date()).toString()
    });
  }
}
