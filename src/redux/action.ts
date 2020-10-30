import {SET_ShowKeyWordPanel,SET_KeyWordConditon,SET_ShowNavPanelPanel} from './actionTypes'

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

/**
 * 控制竖导航面板显示
 * @param show 
 */
export const navPanelShowOption=(show:boolean)=>({type:SET_ShowNavPanelPanel,payload:show})