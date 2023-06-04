import { Component, Input } from '@angular/core';
import { PokemonModel } from 'src/app/model/pokemon-model.model';

@Component({
  selector: 'app-pre-battle',
  templateUrl: './pre-battle.component.html',
  styleUrls: ['./pre-battle.component.scss']
})
export class PreBattleComponent {
  @Input() myPokemons: PokemonModel[] = []
}
