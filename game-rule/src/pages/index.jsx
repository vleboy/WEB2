import React from 'react'
import { Link } from 'react-router-dom'
export default function Index() {
  return (
    <div>
      <div className="indexContent">
        <div className="item">
        <Link to="/classic">
          <span>
            <p className="icon-01" />
            <p className="tab-01" />
            <p className="title">传统百家乐</p>
          </span>
        </Link>
      </div>
      <div className="item">
          <Link to="/baozhuo">
            <span>
              <p className="icon-03" />
              <p className="tab-03" />
              <p className="title">包桌百家乐</p>
            </span>
          </Link>
      </div>
      <div className="item">
        <Link to="/jinmi">
          <span>
            <p className="icon-02" />
            <p className="tab-02" />
            <p className="title">竞咪百家乐</p>
          </span>
        </Link>
      </div>
    </div>
    <div className="indexContent">
       <div className="item">
        <Link to="/longbao">
          <span>
            <p className="icon-04" />
            <p className="tab-04" />
            <p className="title">龙宝百家乐</p>
          </span>
        </Link>
      </div>
      <div className="item">
        <Link to="/insurance">
          <span>
            <p className="icon-05" />
            <p className="tab-05" />
            <p className="title">保险百家乐</p>
          </span>
        </Link>
      </div>
      <div className="item">
        <Link to="/pailu">
          <span>
            <p className="icon-06" />
            <p className="tab-06" />
            <p className="title">牌路介绍</p>
          </span>
         </Link>
        </div>
      </div>
    </div>
  )
}
