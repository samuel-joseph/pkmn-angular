import { Component, Input, OnInit } from '@angular/core';
import { playerProfile } from 'src/environments/environment-constants';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.scss']
})
export class VersusComponent implements OnInit {
  @Input() dataObj: any
  playerProfile = playerProfile
  
  ngOnInit(): void {
  }
}
