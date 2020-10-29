import {SET_ShowKeyWordPanel,SET_KeyWordConditon} from './actionTypes'

/**
 * 控制keyword面板显示
 * @param payload 是否显示panel
 */
export const keyWordPanelOption=(keyWord:boolean)=>({type:SET_ShowKeyWordPanel,payload:keyWord})

/**
 * 控制keyword关键字
 * @param keyWord 
 */
export const keyWordConditionOption=(condition:string)=>({type:SET_KeyWordConditon,payload:condition})
