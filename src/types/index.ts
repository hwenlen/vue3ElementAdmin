export interface RouteMetaModel {
  hideInMenu?: boolean,
  icon: string | undefined,
  title: string | undefined,
  affix?: boolean
  hadeInTag?: boolean
}

export interface RouteResultModel {
  id: number,
  pid: number,
  name: string,
  path: string,
  meta: RouteMetaModel | undefined,
  component: string,
  redirect?: string | undefined,
  children?: RouteResultModel[]
}