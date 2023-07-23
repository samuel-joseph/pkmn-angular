// import { moveFxRecords } from "src/environment/environment-constants"
// import { MoveModel } from "../model/move-model.model"
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

export const multiplier = (stage: number): number => {
  switch (stage) {
    case -6:
      return .25
    case -4:
      return .33
    case -3:
      return .4
    case -2:
      return .5
    case -1:
      return .66
    case 0:
      return 1
    case 1:
      return .5
    case 2:
      return 1
    case 3:
      return 1.5
    case 4:
      return 2
    case 5:
      return 2.5
    case 6:
      return 3
  }
  return 0
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

export const getStab = (attackerType: Type, moveType: string): number => {
  return attackerType.typeOne == moveType || attackerType.typeTwo == moveType ? 2 : 1
}

export const isSuperEffective = (attackerType: Type, moveType: string, receiverType: Type): boolean => {
  return getStab(attackerType, moveType) == 2 &&
    receiverType.typeTwo ?
    typeAdvantage(moveType, receiverType.typeOne) * typeAdvantage(moveType, receiverType.typeTwo) > 1 :
    typeAdvantage(moveType, receiverType.typeOne) > 1
    
}

export const calculateDamage = (
  damage: number,
  attackerStat: number,
  receiverStat: number,
  attackerType: Type,
  moveType: string,
  receiverType: Type
) => {
  const STAB = getStab(attackerType, moveType)
  let TYPE
  if(receiverType.typeTwo){
    TYPE = typeAdvantage(moveType, receiverType.typeOne) * typeAdvantage(moveType, receiverType.typeTwo)
  } else {
    TYPE = typeAdvantage(moveType, receiverType.typeOne)
  }

  return Math.floor(((((((2 * 100) / 5) + 2) * damage * (attackerStat / receiverStat)) / 50) + 2) * STAB * TYPE)
}

//        to be continued
// export const setMoveFx=(move: MoveModel)=>{
//   switch (move.type) {
//     case 'water':
//       if (move.damageClass == 'special') {
//         if (move.power <= 50) {
//           return moveFxRecords.waterSpecialLow;
//         }
//       }
//   }
// }


export const typeAdvantage = (moveType: string, receiverType: string) => {
  switch (moveType) {
    case "dragon":
      switch (receiverType) {
        case "dragon":
          return 2;
        default:
          return 1;
      }
    case "ghost":
      switch (receiverType) {
        case "normal":
          return 0;
        case "psychic":
          return 0;
        case "ghost":
          return 2;
        default:
          return 1;
      }
    case "rock":
      switch (receiverType) {
        case "fire":
          return 2;
        case "ice":
          return 0.5;
        case "fighting":
          return 0.5;
        case "flying":
          return 2;
        case "ground":
          return 0.5;
        case "ghost":
          return 0.5;
        default:
          return 1;
      }
    case "bug":
      switch (receiverType) {
        case "fire":
          return 0.5;
        case "grass":
          return 2;
        case "fighting":
          return 0.5;
        case "poison":
          return 2;
        case "flying":
          return 0.5;
        case "psychic":
          return 2;
        case "ghost":
          return 0.5;
        default:
          return 1;
      }
    case "psychic":
      switch (receiverType) {
        case "fighting":
          return 2;
        case "poison":
          return 2;
        case "psychic":
          return 0.5;
        default:
          return 1;
      }
    case "flying":
      switch (receiverType) {
        case "electric":
          return 0.5;
        case "grass":
          return 2;
        case "fighting":
          return 2;
        case "bug":
          return 2;
        case "ghost":
          return 0.5;
        default:
          return 1;
      }
    case "ground":
      switch (receiverType) {
        case "fire":
          return 2;
        case "electric":
          return 2;
        case "grass":
          return 0.5;
        case "poison":
          return 2;
        case "flying":
          return 0;
        case "bug":
          return 0.5;
        case "rock":
          return 2;
        default:
          return 1;
      }
    case "poison":
      switch (receiverType) {
        case "grass":
          return 2;
        case "ice":
          return 2;
        case "grass":
          return 0.5;
        case "poison":
          return 0.5;
        case "ground":
          return 0.5;
        case "bug":
          return 2;
        case "rock":
          return 0.5;
        case "ghost":
          return 0.5;
        default:
          return 1;
      }
    case "fighting":
      switch (receiverType) {
        case "normal":
          return 2;
        case "ice":
          return 2;
        case "grass":
          return 0.5;
        case "poison":
          return 0.5;
        case "psychic":
          return 0.5;
        case "flying":
          return 0.5;
        case "bug":
          return 0.5;
        case "rock":
          return 2;
        case "ghost":
          return 0;
        default:
          return 1;
      }
    case "ice":
      switch (receiverType) {
        case "water":
          return 0.5;
        case "grass":
          return 2;
        case "ice":
          return 0.5;
        case "ground":
          return 2;
        case "flying":
          return 2;
        case "dragon":
          return 2;
        default:
          return 1;
      }
    case "grass":
      switch (receiverType) {
        case "fire":
          return 0.5;
        case "water":
          return 2;
        case "grass":
          return 0.5;
        case "poison":
          return 0.5;
        case "ground":
          return 2;
        case "flying":
          return 0.5;
        case "dragon":
          return 0.5;
        default:
          return 1;
      }
    case "electric":
      switch (receiverType) {
        case "water":
          return 2;
        case "electric":
          return 0.5;
        case "grass":
          return 0.5;
        case "ground":
          return 0;
        case "flying":
          return 2;
        case "dragon":
          return 0.5;
        default:
          return 1;
      }
    case "water":
      switch (receiverType) {
        case "fire":
          return 2;
        case "water":
          return 0.5;
        case "grass":
          return 0.5;
        case "ground":
          return 2;
        case "rock":
          return 2;
        case "dragon":
          return 0.5;
        default:
          return 1;
      }
    case "fire":
      switch (receiverType) {
        case "fire":
          return 0.5;
        case "water":
          return 0.5;
        case "grass":
          return 2;
        case "ice":
          return 2;
        case "bug":
          return 2;
        case "rock":
          return 0.5;
        case "dragon":
          return 0.5;
        default:
          return 1;
      }
    case "normal":
      switch (receiverType) {
        case "rock":
          return 0.5;
        case "ghost":
          return 0;
        default:
          return 1;
      }
    default:
      return 1
  }
}