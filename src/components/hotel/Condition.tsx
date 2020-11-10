import React from 'react'
import 'css/hotel/condition.scss'
type stateType = {}
type propsType = {}
class Condition extends React.Component<propsType, stateType> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className='hotel-condition'>
        <ul className='list'>
          <li className='item active'>欢迎度排序</li>
          <li className='item'>位置距离</li>
          <li className='item'>价格/星级</li>
          <li className='item'>筛选</li>
        </ul>
      </div>
    )
  }
}

export default Condition
