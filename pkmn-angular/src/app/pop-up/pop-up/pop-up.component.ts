import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  @Input() movesAllReady: boolean
  @Output() battlePrep = new EventEmitter();

  isReady(response: boolean) {
    this.battlePrep.emit(response)
  }
}
