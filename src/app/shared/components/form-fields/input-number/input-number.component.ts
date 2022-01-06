import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {

  constructor() { }

  @Input() childControl: any;
  @Input() label: any;

}
