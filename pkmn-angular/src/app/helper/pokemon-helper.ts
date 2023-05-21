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