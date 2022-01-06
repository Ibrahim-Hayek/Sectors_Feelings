import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent {

  constructor() { }

  pageSizeOptions: number[] = [3, 5, 8, 10];
  @Input() length: number;
  @Input() pageSize: number;
  @Output() paginationChanged: EventEmitter<any> = new EventEmitter();

  // Trigger the paginator page change
  page(event: any) {
    this.paginationChanged.emit(event)
  }
}
