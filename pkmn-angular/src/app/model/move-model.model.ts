export interface MoveModel {
  id: number,
  name: string,
  power: number,
  pp: number,
  ppMax: number,
  type: string,
  accuracy: number,
  damageClass: DamageClass,
  effect_chance: number|null,
  stat_changes?: Array<StatChanges>,
  priority: number,
  hits?: MaxHit,
  crit_rate?: number,
  moveFx: string,
  target: string,
  description: string,
  drain?: number
}

export interface MaxHit{
  min_hits: number,
  max_hits: number
}

export interface DamageClass{
  name: string,
  ailment?: Ailment
}

export interface Ailment{
  name: string,
  category: string
  chance?: number
}

export interface StatChanges{
  change: number,
  stat: StatModel
}

export interface StatModel{
  name: string,
  url: string
}
