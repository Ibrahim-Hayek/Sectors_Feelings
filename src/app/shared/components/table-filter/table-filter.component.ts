import { Component, OnInit, Renderer2, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss']
})
export class TableFilterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
  ) {
  }

  filterForm: FormGroup;
  showSearch = false;
  position = new FormControl('above');
  public isFilterEmojiPickerVisible: boolean;

  @ViewChild('filterField') filterField: ElementRef;
  @Output() tableFilter: EventEmitter<string> = new EventEmitter();
  @Output() filterOpened: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.initFilterForm();
  }

  // Emit filter action in parant component
  emitTableFilterEvent(filterString: string): void {
    this.tableFilter.emit(filterString);
  }

  // toggle show/hide the search form
  toggleShowSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.filterOpened.emit(true);
      setTimeout(() => {
        this.renderer.selectRootElement(this.filterField.nativeElement).focus();
      }, 100);
    }
  }

  // clear and hide the filter form
  clearFilter(): void {
    this.showSearch = false;
    this.filterForm.reset();
    this.filterOpened.emit(false);
    this.emitTableFilterEvent('')
  }

  // initiate the filter form
  initFilterForm(): void {
    this.filterForm = this.formBuilder.group({
      filterField: ['', Validators.required],
    });
    this.filterForm.controls['filterField'].valueChanges.subscribe(value => {
      if (value == '') {
        this.emitTableFilterEvent('')
      }
    });
  }

  // submit the filter and do the filter action on the grid
  submitFilter(): void {
    const formValue = this.filterForm.value;
    this.emitTableFilterEvent(formValue.filterField)
  }

  // add emoji to the filter input
  addFilterEmoji(event: any): void {
    this.filterForm.patchValue({
      filterField: `${event.emoji.native}`,
    });
    this.isFilterEmojiPickerVisible = false;
    this.submitFilter();
  }

  // show the emoji tab for the filter form
  showFilterEmojiList(): void {
    this.isFilterEmojiPickerVisible = true;
  }

}
