import React from 'react'
import 'css/hotel/pro-list.scss'
type stateType = {}
type propsType = {}
class ProList extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <ul className='pro-list'>
        <li className='item'>
          <img className="pro-img" src='assets/images/hotel/p-img1.webp' alt='这是一张图片' />
          <div>
            <h3 className='title'>上海陆家嘴酒店</h3>
            <div className='intro'>
              位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区,位于上海市陆家嘴环境优美的一处偏僻地区
            </div>
            <div className='container'>
              <div className='tag'>
                {/* 多出来的隐藏掉 */}
                <i>商务出行</i>
                <i>精品酒店</i>
                <i>近地铁</i>
              </div>
              <span className="score">4.7<em>分</em></span>
            </div>
            <div className='other'>
              <i className='star-level'>星级</i>
              <i className='price'>
                ￥437<em>起</em>
              </i>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}

export default ProList
