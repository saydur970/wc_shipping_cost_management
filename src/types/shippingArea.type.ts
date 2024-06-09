export interface ty_shippingAreaList_item {
  id: number;
  area: string;
  cost: number;
}

export type ty_shippingAreaList = {
  ps: string;
  list: ty_shippingAreaList_item[]
}[]