import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emojis-tab',
  templateUrl: './emojis-tab.component.html',
  styleUrls: ['./emojis-tab.component.scss']
})
export class EmojisTabComponent {

  constructor() { }

  @Output() emojiSelected: EventEmitter<any> = new EventEmitter();
  @Output() closeTab: EventEmitter<void> = new EventEmitter();

  addFilterEmoji(event: any) {
    this.emojiSelected.emit(event)
  }

  closeTabEvent() {
    this.closeTab.emit()
  }
}
