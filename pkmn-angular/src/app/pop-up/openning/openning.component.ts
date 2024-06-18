import {
  Component, OnInit
} from '@angular/core';
import { getRandNum } from 'src/app/helper/pokemon-helper';

@Component({
  selector: 'app-openning',
  templateUrl: './openning.component.html',
  styleUrls: ['./openning.component.scss']
})
export class OpenningComponent implements OnInit{
  frontStarterArray = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/9.gif',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/160.gif',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/260.gif'
  ]
  waterStarter: string

  backStarterArray = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/6.gif',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/392.gif',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/157.gif'
  ]
  fireStarter: string
  fireFx = 'https://i.gifer.com/3q62.gif'
  waterFx = 'https://webstockreview.net/images/clipart-mountain-ocean-1.gif'


  ngOnInit(): void {
    let randNumFront = getRandNum(0, this.frontStarterArray.length - 1)
    let randNumBack = getRandNum(0, this.backStarterArray.length - 1)
    
    this.waterStarter = this.frontStarterArray[randNumFront]
    this.fireStarter = this.backStarterArray[randNumBack]
  }
}
