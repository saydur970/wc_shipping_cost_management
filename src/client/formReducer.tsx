import { ty_shippingAreaList_item } from "../types/shippingArea.type";

export type T_Reducer_Shipping_State = {

  city: string;
  policeStation: string;
  area: string;
  cost: string;
  shippingAreaID: string;
  address: string;
  availablePSList: string[];
  availableAreaList: ty_shippingAreaList_item[];
  totalWeight: number;
  approximateWeight: number;
  totalPrice: string;
  cartPrice: number;
}

export type T_Reducer_Shipping_Dispatch =
  { type: 'php_cart', payload: { total: number; approximate: number; price: number; } } |
  { type: 'policeStation', payload: string } |
  { type: 'area', payload: number } |
  { type: 'address', payload: string } |
  { type: 'availablePS', payload: string[] } |
  { type: 'availableArea', payload: ty_shippingAreaList_item[] };


export const shippingFormReducer_initial: T_Reducer_Shipping_State = {
  city: 'Amsterdam',
  policeStation: '',
  area: '',
  shippingAreaID: '',
  cost: '',
  address: '',
  availablePSList: [],
  availableAreaList: [],
  totalWeight: 0,
  approximateWeight: 1,
  totalPrice: '',
  cartPrice: 0
};

export const shippingFormReducer = (
  state:T_Reducer_Shipping_State, action: T_Reducer_Shipping_Dispatch
): T_Reducer_Shipping_State => {

  switch(action.type) {

    case 'php_cart': {
      return {
        ...state,
        totalWeight: action.payload.total,
        approximateWeight: action.payload.approximate,
        cartPrice: action.payload.price
      }
    }

    case 'policeStation': {
      return {
        ...state,
        policeStation: action.payload,
        area: '',
        cost: '',
        shippingAreaID: '',
        totalPrice: ''
      }
    }

    case 'area': {

      const areaItem = state.availableAreaList[action.payload];

      return {
        ...state,
        area: areaItem.area,
        cost: `${areaItem.cost}`,
        shippingAreaID: `${areaItem.id}`,
        totalPrice: `${Number(areaItem.cost) * Number(state.approximateWeight)}`
      }
    }
    case 'address': {
      return {
        ...state,
        address: action.payload
      }
    }
    case 'availablePS': {
      return {
        ...state,
        availablePSList: [...action.payload]
      }
    }

    case 'availableArea': {
      return {
        ...state,
        availableAreaList: [...action.payload]
      }
    }

    default:
      return state;
  }


}