import { Component, OnInit } from '@angular/core';
import { GymLeader } from 'src/app/model/gym-leader-model.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  gymLeaders = environment.gymLeaders
  npc: GymLeader
  winner = false
  npcPokemonsUrl = []
  
  ngOnInit(): void {
    for (let leader of this.gymLeaders) {
      if (!leader.gymLose) {
        this.npc = leader
        
        break
      } else {
        this.winner = true
      }
    }
  }
}
