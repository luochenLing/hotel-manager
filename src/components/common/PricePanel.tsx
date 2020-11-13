import React from 'react'
import 'css/common/input-search.scss'
import 'css/common/price-panel.scss'
import { Button, Range } from 'framework7-react'
interface propsTypes {
  curPrice: string
  minRange: number
  maxRange: number
  startList: { name: string; checked: boolean; code: string }[]
  getPriceRange: (val?: any) => void
  checkStart: (event?: any) => void
  resetCondition: (event?: any) => void
  searchList: (event?: any) => void
}

function PricePanelDom(props: propsTypes) {
  return (
    <>
      <ul className='price'>
        <li className='price-title'>
          <span style={{ marginRight: '.5rem' }}>价格</span>
          {props.curPrice ? (
            <span className='num'>￥{props.curPrice}以上</span>
          ) : (
            ''
          )}
        </li>
        <li className='price-slider'>
          <Range
            value={props.curPrice}
            min={props.minRange}
            max={props.maxRange}
            label={true}
            step={5}
            className='price-slider-bar'
            onRangeChange={props.getPriceRange}>
            <span className='min-prince'>￥{props.minRange}</span>
            <span className='max-prince'>￥{props.maxRange}以上</span>
          </Range>
          <div className='range-knob end-knob'></div>
        </li>
      </ul>
      <ul className='star-rating'>
        <li className='star-rating-title'>
          <h3>星级</h3>
          <span>(可多选)</span>
        </li>
        <li className='star-rating-content'>
          <ul className='start-list'>
            {props.startList.map((item) => {
              return (
                <li
                  className={`start-list-item ${item.checked ? 'active' : ''}`}
                  onClick={() => {
                    props.checkStart(item.code)
                  }}
                  key={item.code}>
                  {item.name}
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
      <div className='btn-tools'>
        <Button className='btn-reset' outline onClick={props.resetCondition}>
          重置
        </Button>
        <Button className='btn-ok' fill onClick={props.searchList}>
          完成
        </Button>
      </div>
    </>
  )
}

const PricePanel = React.forwardRef((props: any, ref: any) => {
  return <PricePanelDom {...props} myRef={ref}></PricePanelDom>
})
export default PricePanel
