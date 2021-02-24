import {init} from '../pixi'



const SET_VIEW      = "set_view";
const ADD_RES       = "add_res";
const DELETE_RES    = "delete_res";

export const addRes = (reservation) => ({
  type: ADD_RES,
  payload: reservation
});

export const deleteRes = (id) => ({
  type: DELETE_RES,
  payload: id
})


let reservations = [
    {from: new Date(2021, 1, 11), to: new Date(2021, 1, 17), room: 0, id: 64, roomId:  1, color: 0x3C87C4},
    {from: new Date(2021, 1, 20), to: new Date(2021, 1, 25), room: 0, id: 43, roomId:  6, color: 0x31A24C},
    {from: new Date(2021, 1, 27), to: new Date(2021, 1, 30), room: 0, id: 65, roomId: 13, color: 0x3C87C4},
    {from: new Date(2021, 1, 26), to: new Date(2021, 1, 31), room: 0, id:  3, roomId: 11, color: 0xE5CA00},
    {from: new Date(2021, 1, 5 ), to: new Date(2021, 1, 9 ), room: 0, id: 62, roomId: 13, color: 0x31A24C},
    {from: new Date(2021, 1, 30), to: new Date(2021, 2, 4 ), room: 0, id: 88, roomId: 16, color: 0xd12a0d}
]
let rooms = [
    {id:  3, name: "Bryza"      , typeId: 20},
    {id:  1, name: "Kasia"      , typeId: 20},
    {id: 11, name: "Fala"       , typeId: 21},
    {id:128, name: "Taras"      , typeId: 22},
    {id:106, name: "Brzeg"      , typeId: 20},
    {id:  6, name: "Basia"      , typeId: 20},
    {id: 12, name: "03-2"       , typeId: 10},
    {id:112, name: "03-3"       , typeId: 10},
    {id: 13, name: "43a"        , typeId: 10},
    {id:113, name: "43b"        , typeId: 10},
    {id: 16, name: "07"         , typeId: 10},
    {id: 17, name: "08"         , typeId: 10},
    {id: 23, name: "09"         , typeId: 11},
    {id: 26, name: "10"         , typeId: 11},
    {id: 27, name: "11"         , typeId: 22},
    {id:116, name: "27"         , typeId: 10},
    {id:117, name: "28"         , typeId: 10},
    {id:123, name: "29"         , typeId: 11},
    {id:126, name: "20"         , typeId: 11},
    {id:127, name: "21"         , typeId: 22},
    {id:103, name: "32"         , typeId: 20},
    {id:101, name: "34"         , typeId: 20},
    {id:111, name: "35"         , typeId: 21},
    {id:128, name: "fa"         , typeId: 22}
]
let types = [
    {name: "Jednoosobowy",                  typeId: 10},
    {name: "Jednoosobowy - Łazienka",       typeId: 11},
    {name: "Dwuosobowy",                    typeId: 20},
    {name: "Dwuosobowy - Łazienka",         typeId: 21},
    {name: "Dwuosobowy - Łazianka, Taras",  typeId: 22}
]
let params = {
    dpv             : 32,
    padding         : 5,
    screenWidth     : window.innerWidth,
    screenHeight    : window.innerHeight - 4
}
let calendarQueue = []

const ini = init(params, reservations, rooms, calendarQueue)

const initialState = {
  view: ini[0],
  reservations: reservations,
  updateView: ini[1]
};

const processQueue = (state) => {
    while (calendarQueue.length > 0) {
        const order = calendarQueue.shift()
        switch (order.type) {
            case "add_res":
                reservations = [...state.reservations, order.payload]
                state.updateView()
                state = {...state, reservations: reservations}
            default:
                {}
        }
    }
    return state;
}


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_RES:
      reservations = [...state.reservations, action.payload]
      console.log(reservations)
      state.updateView()
      return {...state, reservations: reservations}
    case DELETE_RES:
      reservations = state.reservations.filter(res => res.id !== action.payload)
      state.updateView()
      return {...state, reservations: reservations}
    default:
      return processQueue(state);
  }
};