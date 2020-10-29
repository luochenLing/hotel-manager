import { combineReducers } from 'redux'
import { SET_ShowKeyWordPanel, SET_KeyWordConditon } from './actionTypes'
type action = {
  type: string
  payload: any
}

const defaultKeyWorkOption = false
/**
 * 是否显示关键字页面
 * @param state
 * @param action
 */
function keyWordPanelReducer(state = defaultKeyWorkOption, action: action) {
  // debugger
  switch (action.type) {
    case SET_ShowKeyWordPanel:
      return action.payload
    default:
      return state
  }
}
const defaultCondition = ''
function keyWordConditionReducer(state = defaultCondition, action: action) {
  // debugger
  switch (action.type) {
    case SET_KeyWordConditon:
      return action.payload
    default:
      return state
  }
}
//reducers是处理action 逻辑的方法存放处
export default combineReducers({ keyWordPanelReducer, keyWordConditionReducer })
