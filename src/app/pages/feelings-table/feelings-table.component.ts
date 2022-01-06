import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SectorModelManager } from 'src/app/business/managers/ItemsModel.service';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { SectorModel } from 'src/app/models/sectorModel';
import { ItemModel } from 'src/app/models/ItemModel';
import { Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { TableGridComponent } from 'src/app/shared/components/table-grid/table-grid.component';
import { PageEvent } from '@angular/material/paginator';
import { Store, Select } from '@ngxs/store';
import { AddRow, DeleteRow } from 'src/app/core/services/rows.action';
import { Observable } from 'rxjs';
import { Row } from 'src/app/models/rowModal';
import { RowState } from 'src/app/core/state/row.state';

@Component({
  selector: 'app-feelings-table',
  templateUrl: './feelings-table.component.html',
  styleUrls: ['./feelings-table.component.scss']
})
export class FeelingsTableComponent implements OnInit {

  constructor(
    serviceManages: SectorModelManager,
    private translate: TranslateService,
    private helperService: HelperService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private store: Store
  ) {
    this._serviceManages = serviceManages;
  }

  _serviceManages: SectorModelManager;
  sectorsResponse: SectorModel | undefined;
  sectors: ItemModel[] = [];
  addItemForm: FormGroup;
  isEmojiPickerVisible: boolean;
  itemToEdit: any;
  editMode = false;
  sectorNameToDelete: '';
  position = new FormControl('above');
  dialogRef: any;
  rows: Row[] | any;
  filterIsOpen = false;
  
  @ViewChild('addItemDialog') addItemDialog: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('cannotAddDialog') cannotAddDialog: TemplateRef<any>;
  @ViewChild(TableGridComponent) tableGrid: TableGridComponent;

  // Set Error Messages
  errorMessages = {
    name: {
      required: 'CO2 is required'
    },
    co2: {
      required: 'CO2 is required',
      minNumber: 'Minimum number for CO2 is 0.'
    },
    feelings: {
      required: 'ANNOUNCEMENTS.BODY_AR'
    }
  };

  length: number;
  pageSize: number;

  ngOnInit(): void {
    this.fetchSectors();
    this.initaddItemForm();
  }

  // Event triggered when the pagination is changed
  paginationChanged(event: PageEvent): void {
    if (event.pageIndex > Number(event.previousPageIndex)) {
      this.tableGrid.goToNext();
    }
    else if (event.pageIndex < Number(event.previousPageIndex)) {
      this.tableGrid.goToPrev();
    }
    else if (event.pageIndex == Number(event.previousPageIndex)) {
      this.tableGrid.gridApi.paginationSetPageSize(Number(event.pageSize));
    }
  }

  // Update the pagination values
  updatePaginator(): void {
    this.pageSize = this.tableGrid.paginationPageSize;
    this.length = this.tableGrid.getAllRowsNumber()
  }

  // Get sectors from API
  async fetchSectors(): Promise<any> {
    await this._serviceManages.fetchSectors().then(response => {
      const sectorsResponse = response;
      if (sectorsResponse.hasError() && sectorsResponse.errors) {
        sectorsResponse.errors.forEach(element => {
          this.translate.get(['TOASTER.DATAMODEL.FAILD']).subscribe(translateValue => {
            this.showFaildToastr(translateValue['TOASTER.DATAMODEL.FAILD'], element.message ? element.message : 'No message provided')
          });
        });
      }
      else {
        this.sectorsResponse = response.result;
        if (this.sectorsResponse) {
          this.sectors = this.sectorsResponse.children;
          localStorage.setItem('sectorsFromAPI', JSON.stringify(this.sectorsResponse.children));
        }
        this.setUsedSectors();
      }
    });
  }

  // Initiate the add/edit form
  initaddItemForm(): void {
    this.addItemForm = this.formBuilder.group({
      sector: ['', [Validators.required]],
      co2: ['', [Validators.required, Validators.max(Number.MAX_VALUE), Validators.min(0)]],
      feeling: ['', [Validators.required]],
    });
  }

  // check if all sectors is added before shwing the Add dialog
  checkOpenDialog() {
    if (this.length === this.sectors.length) {
      this.oepncannotAddDialog();
    }
    else {
      this.openDialog()
    }
  }

  // Open the message dialog
  oepncannotAddDialog() {
    this.dialogRef = this.dialog.open(this.cannotAddDialog, { panelClass: ['confirmationPopup'], disableClose: true });
    this.dialogRef.afterClosed().subscribe((result: any) => {
    })
  }

  // Open the add/edit form dialog
  openDialog(): void {
    this.dialogRef = this.dialog.open(this.addItemDialog, { panelClass: ['formWithTabs'], disableClose: true });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        if (result !== 'no') {
          console.log(result);
        } else if (result === 'no') {
          this.dialogRef.close();
          this.addItemForm.reset();
          this.editMode = false;
        }
      }
    })
  }

  // Submit add a new item
  submitAddItem(): void {
    this.dialogRef.close();
    const formValue = this.addItemForm.value;
    this.addItemForm.reset();
    const sector = this.getSectorNameById(formValue.sector);
    this.tableGrid.addNewItem(formValue, sector);
    this.saveRowsToLocal();
    this.updatePaginator();
    this.helperService.openSnackBar('Item added successfully!', 'close')
  }

  // Confirm Edit item
  submitEditItem(): void {
    var rowNode = this.tableGrid.gridApi.getRowNode(this.itemToEdit.id);
    this.dialogRef.close();
    const formValue = this.addItemForm.value;
    this.addItemForm.reset();
    var newData = {
      sector: this.getSectorNameById(formValue.sector),
      co2: formValue.co2,
      feeling: formValue.feeling,
      sectorId: formValue.sector,
      id: this.itemToEdit.id
    };
    rowNode.setData(newData);
    this.editMode = false;
    this.saveRowsToLocal();
    this.tableGrid.confirmAddCallBack(newData);
    this.helperService.openSnackBar('Item edited successfully!', 'close')
  }

  // Show dialog popup to confirm the delete item
  onDeleteClicked(data: any): void {
    this.dialogRef = this.dialog.open(this.deleteDialog, { panelClass: ['confirmationPopup'], disableClose: true });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        if (result !== 'no') {
          this.confirmDelete(data)
        } else if (result === 'no') {
          this.cancelDelete();
        }
      }
    })
  }

  // Confirm delete item
  confirmDelete(data: any): void {
    this.tableGrid.deleteGridItem(data);
    this.sectorNameToDelete = '';
    this.saveRowsToLocal();
    this.updatePaginator();
    this.helperService.openSnackBar('Item deleted successfully!', 'close')
  }

  // Cancel delete and hide delete popup
  cancelDelete(): void {
    this.dialogRef.close();
    this.sectorNameToDelete = '';
  }

  // event emitted when edit row clicked
  editItem(itemToEdit: any): void {
    this.addItemForm.patchValue({
      sector: itemToEdit.sectorId,
      co2: itemToEdit.co2,
      feeling: itemToEdit.feeling
    });
    this.itemToEdit = itemToEdit;
    this.editMode = true;
    this.openDialog();
  }

  // event emitted when delete row clicked
  deleteItem(params: any): void {
    this.onDeleteClicked(params.data);
    this.sectorNameToDelete = params.data.sector;
  }

  // Show Emoji List inside the form dialog
  showEmojiList(): void {
    this.isEmojiPickerVisible = true;
  }

  // Function called when choosing emoji inside the form
  addEmoji(event: any): void {
    this.addItemForm.patchValue({
      feeling: `${event.emoji.native}`,
    });
    this.isEmojiPickerVisible = false;
  }

  // Get sector name by giving sector id
  getSectorNameById(id: string): string {
    let sectorName = '';
    if (this.sectors) {
      sectorName = this.sectors.filter(item => item.id === id)[0].name;
    }
    return sectorName;
  }

  // Get sector Id by giving sector name
  getSectorIDByName(name: string): string {
    let sectorID = '';
    if (this.sectors) {
      sectorID = this.sectors.filter(item => item.name === name)[0].id;
    }
    return sectorID;
  }

  // Save rows to localStorage in order to get them reloading the page
  saveRowsToLocal(): void {
    const rowData: any[] = [];
    this.tableGrid.gridApi.forEachNode((node: any) => rowData.push(node.data));
    localStorage.setItem('rows', JSON.stringify(rowData));
    this.setUsedSectors();
  }

  // Filter Sectors to hide the used ones in dropdown to avoid duplicates
  setUsedSectors(): void {
    this.store.select(RowState.rows).subscribe(rows => {
      this.rows = rows;
      if (this.sectors && this.rows instanceof Array) {
        this.sectors.forEach(sector => {
          if (this.rows.filter((row: any) => row.sectorId == sector.id)[0] != null) {
            sector.hidden = true;
          }
          else {
            sector.hidden = false;
          }
        });
      }
    });
  }

  // Filter the table rows
  tableFilter(event: string): void {
    this.tableGrid.filter(event)
  }

  excportToExcel() {
    this.tableGrid.exportToExcel();
  }
  // Show Faild Message toast
  showFaildToastr(title: string, message: string): void {
    this.helperService.showFaildToastr(title, message);
  }

  filterOpened(event: boolean): void {
    this.filterIsOpen = event;
  }
}
