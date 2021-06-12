import { combineReducers } from "redux";
import {
  SET_ShowKeyWordPanel,
  SET_KeyWordConditon,
  SET_ShowNavPanelPanel,
} from "./actionTypes";
type action = {
  type: string;
  payload: any;
};

const defaultkeyWordPanel = "firstLoad";
/**
 * 是否显示关键字页面
 * @param state
 * @param action
 */
function keyWordPanelReducer(state = defaultkeyWordPanel, action: action) {
  switch (action.type) {
    case SET_ShowKeyWordPanel:
      // debugger;
      return action.payload;
    default:
      return state;
  }
}
const defaultkeyWordCondition = "";
/**
 * 关键字条件设置
 * @param state
 * @param action
 */
function keyWordConditionReducer(
  state = defaultkeyWordCondition,
  action: action
) {
  switch (action.type) {
    case SET_KeyWordConditon:
      return action.payload;
    default:
      return state;
  }
}
const defaultNavPanelShow = false;
/**
 * 竖导显示设置
 * @param state
 * @param action
 */
function navPanelShowReducer(state = defaultNavPanelShow, action: action) {
  switch (action.type) {
    case SET_ShowNavPanelPanel:
      return action.payload;
    default:
      return state;
  }
}
//reducers是处理action 逻辑的方法存放处
export default combineReducers({
  keyWordPanelReducer,
  keyWordConditionReducer,
  navPanelShowReducer,
});
