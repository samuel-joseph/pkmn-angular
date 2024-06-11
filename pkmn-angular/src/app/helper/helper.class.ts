import { Injectable } from "@angular/core";
import { MoveModel } from "../model/move-model.model";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }


  createMove(move: any): MoveModel {
    let description 
    for (let desc of move.flavor_text_entries) {
      if (desc.language.name == "en") {
        description = desc.flavor_text
      }
    }
  
    return {
      id: move.id,
      name: move.name,
      power: move.power,
      pp: move.pp,
      ppMax: move.pp,
      type: move.type.name,
      accuracy: move.accuracy,
      damageClass: move.damage_class.name,
      effect_chance: move.effect_chance,
      stat_changes: move.stat_changes,
      priority: move.priority,
      hits: move.meta?{
        max_hits: move.meta.max_hits,
        min_hits: move.meta.min_hits
      } : {
        max_hits: 0,
        min_hits: 0
        },
      crit_rate: move.meta ? move.meta.crit_rate : 0,
      moveFx: '',
      target: move.target.name,
      description,
      drain: move.meta.drain
    }
  }
}