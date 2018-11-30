import React from 'react'
const Longhu =()=>{
    return(
        <div>
        <div className="banner clearfix">
				<li className="title">龙虎</li>
				<li className="des">Dragon Tiger</li>
				<li className="bar"></li>
				<li className="intro"><strong>龙虎</strong> 加入真人游戏平台後，让更多玩家於电脑以及任何移动装置连接我们的娱乐平台，感受犹如置身现场的享乐新体验，一试自己的运气！</li>
				<li className="cap"></li>
			</div>
			<div className="content clearfix">
				<div className="title">如何胜出:</div>
				<div className="des">正确预计两家  龙 和  虎 的点数比较大。</div>
				<div className="title">操作及下注指南:</div>
				<div className="rules">
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>点击下注的筹码<br/>再点击桌上下注任何一块( 龙丶虎或平局 )。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>荷官只派两门牌<br/>每门各派一只牌即龙与虎双方斗大。</span></div>						
					</li>
				</div>
			</div>
			<div className="content clearfix">			
				<div className="title">游戏规则:</div>
				<div className="des2">
					<li><strong>1. </strong>牌面的大小不比花色，只比点数，K为最大牌，A为最小。</li>
					<li><strong>2. </strong>荷官先派发第一张牌于龙的位置，而第二张牌派发到虎的位置，牌面全是向上的，点数较大的胜出。</li>					
				</div>
				
				<div className="title">派彩赔率:</div>
				
				<div className="table clearfix">
					<li className="col-xs-6 t-title"><span>投注项目</span></li>
					<li className="col-xs-6 t-title"><span>赔率</span></li>
					
					<li className="col-xs-6"><span>龙</span></li>
					<li className="col-xs-6"><span className="yellow">1 ：1 (开和局时，退回一半下注金额)</span></li>

					<li className="col-xs-6"><span>虎</span></li>
					<li className="col-xs-6"><span className="yellow">1 ：1 (开和局时，退回一半下注金额)</span></li>

					<li className="col-xs-6"><span>和局</span></li>
					<li className="col-xs-6"><span className="yellow">1 ：8</span></li>				
				</div>
				
				<div className="title">注意事项:</div>
				<div className="des2">
					<li><strong>1. </strong>桌台限红是本游戏桌台主要玩法的最小丶最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</li>
					<li><strong>2. </strong>荷官先派发第一张牌于龙的位置，而第二张牌派发到虎的位置，牌面全是向上的，点数较大的胜出。</li>
					<li><strong>3. </strong>如遇结算错误，按照当期视频结果重新结算。</li>					
				</div>
								
			</div>
        </div>
    )
}
export default Longhu