import {SET_ShowKeyWord,GET_ShowKeyWord} from './actionTypes'

/**
 * 设置返回方法
 * @param show 是否显示panel
 */
export const setShowKeyWord=(keyWord:boolean)=>({type:SET_ShowKeyWord,payload:keyWord})

/**
 * 获取返回方法
 */
export const getShowKeyWord=()=>({type:GET_ShowKeyWord})