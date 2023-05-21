export interface MoveModel {
  id: number,
  name: string,
  power: number,
  pp: number,
  type: string,
  accuracy: number,
  damageClass: string,
  priority: number,
  hits?: MaxHit,
  crit_rate?: number
}

export interface MaxHit{
  min_hits: number,
  max_hits: number
}
