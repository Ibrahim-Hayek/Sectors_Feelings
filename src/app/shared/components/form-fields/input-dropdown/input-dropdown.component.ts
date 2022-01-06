import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  styleUrls: ['./input-dropdown.component.scss']
})
export class InputDropdownComponent {

  constructor() { }

  @Input() childControl: any;
  @Input() label: any;
  @Input() dropdownItems: any[];

}
