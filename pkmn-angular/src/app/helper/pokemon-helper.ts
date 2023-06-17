import { Type } from "../model/pokemon-model.model"

export const getMove = (move:any)=>{
  return {
    id: move.id,
    name: move.name,
    power: move.power,
    pp: move.pp,
    type: move.type.name,
    accuracy: move.accuracy,
    damageClass: move.damage_class.name,
    priority: move.priority,
    hits: move.meta?{
      max_hits: move.meta.max_hits,
      min_hits: move.meta.min_hits
    } : {
      max_hits: 0,
      min_hits: 0
      },
    crit_rate: move.meta? move.meta.crit_rate : 0
  }
}

export const getStats = (stats: Array<any>) => {
  let arr = []
  for (let stat of stats) {
    let tempObj = {}
    tempObj = {
      base_stat: stat.base_stat,
      name: stat.stat.name
    }
    arr.push(tempObj)
  }
  return arr
}

export const getTypes = (type: any) => {
  return type.length > 1 ? {
    typeOne: type[0].type.name,
    typeTwo: type[1].type.name
  } : {
    typeOne: type[0].type.name
  }
}

export const getRandNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const calculateHp = (hpStat: number) => {
  return Math.floor(.01*(2*hpStat+30+Math.floor(.25*150))*100)+100+10
}

export const calculateDamage = (
  damage: number,
  attackerStat: number,
  receiverStat: number,
  attackerType: Type,
  moveType: string,
  receiverType: Type
) => {
  const STAB = attackerType.typeOne == moveType || attackerType.typeTwo == moveType ? 2 : 1
  let TYPE
  if(receiverType.typeTwo){
    TYPE = typeAdvantage(moveType, receiverType.typeOne) * typeAdvantage(moveType, receiverType.typeTwo)
  } else {
    TYPE = typeAdvantage(moveType, receiverType.typeOne)
  }

  return Math.floor(((((((2*100)/5)+2)*damage*(attackerStat/receiverStat))/50)+2)*STAB*TYPE)
}

export const typeAdvantage = (moveType:string, receiverType: string) => {
  switch (moveType) {
    case "Dragon":
      switch (receiverType) {
        case "Dragon":
          return 2;
        default:
          return 1;
      }
    case "Ghost":
      switch (receiverType) {
        case "Normal":
          return 0;
        case "Psychic":
          return 0;
        case "Ghost":
          return 2;
        default:
          return 1;
      }
    case "Rock":
      switch (receiverType) {
        case "Fire":
          return 2;
        case "Ice":
          return 0.5;
        case "Fighting":
          return 0.5;
        case "Flying":
          return 2;
        case "Ground":
          return 0.5;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Bug":
      switch (receiverType) {
        case "Fire":
          return 0.5;
        case "Grass":
          return 2;
        case "Fighting":
          return 0.5;
        case "Poison":
          return 2;
        case "Flying":
          return 0.5;
        case "Psychic":
          return 2;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Psychic":
      switch (receiverType) {
        case "Fighting":
          return 2;
        case "Poison":
          return 2;
        case "Psychic":
          return 0.5;
        default:
          return 1;
      }
    case "Flying":
      switch (receiverType) {
        case "Electric":
          return 0.5;
        case "Grass":
          return 2;
        case "Fighting":
          return 2;
        case "Bug":
          return 2;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Ground":
      switch (receiverType) {
        case "Fire":
          return 2;
        case "Electric":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 2;
        case "Flying":
          return 0;
        case "Bug":
          return 0.5;
        case "Rock":
          return 2;
        default:
          return 1;
      }
    case "Poison":
      switch (receiverType) {
        case "Grass":
          return 2;
        case "Ice":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 0.5;
        case "Ground":
          return 0.5;
        case "Bug":
          return 2;
        case "Rock":
          return 0.5;
        case "Ghost":
          return 0.5;
        default:
          return 1;
      }
    case "Fighting":
      switch (receiverType) {
        case "Normal":
          return 2;
        case "Ice":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 0.5;
        case "Psychic":
          return 0.5;
        case "Flying":
          return 0.5;
        case "Bug":
          return 0.5;
        case "Rock":
          return 2;
        case "Ghost":
          return 0;
        default:
          return 1;
      }
    case "Ice":
      switch (receiverType) {
        case "Water":
          return 0.5;
        case "Grass":
          return 2;
        case "Ice":
          return 0.5;
        case "Ground":
          return 2;
        case "Flying":
          return 2;
        case "Dragon":
          return 2;
        default:
          return 1;
      }
    case "Grass":
      switch (receiverType) {
        case "Fire":
          return 0.5;
        case "Water":
          return 2;
        case "Grass":
          return 0.5;
        case "Poison":
          return 0.5;
        case "Ground":
          return 2;
        case "Flying":
          return 0.5;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Electric":
      switch (receiverType) {
        case "Water":
          return 2;
        case "Electric":
          return 0.5;
        case "Grass":
          return 0.5;
        case "Ground":
          return 0;
        case "Flying":
          return 2;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Water":
      switch (receiverType) {
        case "Fire":
          return 2;
        case "Water":
          return 0.5;
        case "Grass":
          return 0.5;
        case "Ground":
          return 2;
        case "Rock":
          return 2;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Fire":
      switch (receiverType) {
        case "Fire":
          return 0.5;
        case "Water":
          return 0.5;
        case "Grass":
          return 2;
        case "Ice":
          return 2;
        case "Bug":
          return 2;
        case "Rock":
          return 0.5;
        case "Dragon":
          return 0.5;
        default:
          return 1;
      }
    case "Normal":
      switch (receiverType) {
        case "Rock":
          return 0.5;
        case "Ghost":
          return 0;
        default:
          return 1;
      }
    default:
      return 1
  }
}