import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {

  constructor() { }

  @Input() childControl: any;
  @Input() label: string = '';
  @Input() readonly: boolean = false;
  @Output() emojiList: EventEmitter<void> = new EventEmitter();

  showEmojiList(): void {
    this.emojiList.emit()
  }
}
