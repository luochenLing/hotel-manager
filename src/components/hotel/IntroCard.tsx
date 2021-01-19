import React from 'react'
import 'css/hotel/intro-card.scss'
interface propsTypes {
  info: {
    score: number //分数
    titleName: string //酒店名称
    addr: string //地址名称
    landmark: string
    mapContent: string //地图内容
    subTitle: string //副标题
    tag: string[] //标签
  }
}
function IntroCardDom(props: propsTypes) {
  const { info } = props
  return (
    <>
      <div className='intro-card'>
        <div className='card-head'>
          <span className='card-score'>
            {info?.score}
            <span className='card-unit'>分</span>
          </span>
          <span className="card-title"></span>
        </div>

        <div className='card-body'>
          <span className='card-addr'>
            {info?.addr}【{info?.landmark}】
          </span>
          <span className='card-map-content'>
            {info?.mapContent}
          </span>
        </div>

        <div className='card-footer'>
          <span className='card-sub-title'>
            {info?.subTitle}
          </span>
          <ul className='card-tag'>
            {
              (info?.tag||[]).map(item=>{
                return <li key={item}>{item}</li>
              })
            }
          </ul>
        </div>
      </div>
    </>
  )
}
const IntroCard = React.forwardRef((props: any, ref: any) => {
  return <IntroCardDom {...props} myRef={ref}></IntroCardDom>
})
export default IntroCard
