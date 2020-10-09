import {combineReducers} from 'redux'
import {SET_ShowKeyWord} from './actionTypes'
type action={
  type:string,
  payload:any
}

const defaultKeyWorkOption=false
/**
 * 系统相关操作
 * @param state 
 * @param action 
 */
function keyWorkOption(state=defaultKeyWorkOption,action:action){
  switch(action.type){
    case SET_ShowKeyWord:
      return action.payload;
    default:
      return state;
  }
}
function setName(state=[]){
return state
}
//reducers是处理action 逻辑的方法存放处
export default combineReducers({keyWorkOption,setName})