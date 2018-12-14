import React from 'react'
const Toubao =()=>{
    return(
        <div>
			<div className="tou_banner clearfix">
				<li className="title">骰宝</li>
				<li className="des">Sicbo</li>
				<li className="tou_bar"></li>
				<li className="intro">
					<strong>骰宝游戏</strong> 节奏明快刺激，投注组合丰富，深受亚洲人喜爱。真人骰宝游戏更开拓出崭新领域，付予玩家前所未有的全新感受，令人乐而忘返。
					<br/><br/>也叫赌大小，以猜测骰子开出的点数或是点数总合的博彩。多元化的投注种类及吸引的赔率，极之受玩家欢迎。</li>
				<li className="tou_cap"></li>
			</div>
			<div className="tou_content clearfix">
				<div className="tou_title">如何胜出:</div>
				<div className="des">玩家的押注的内容与三颗骰子停留开出的点数相同，便赢得彩金。</div>
				<div className="tou_title">操作及下注指南:</div>
				<div className="rules">
					<li className="tou-bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>开始新局后即开始下注倒数计时<br/>你可以依照你的预测，选择筹码下注 。</span></div>						
					</li>
					<li className="tou-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>倒数时间结束后停止下注<br/>再由荷官按钮经机械自动摇骰。</span></div>						
					</li>
					<li className="tou-bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>待骰盅停止后，视讯显示三颗骰子停留开出的点数，由荷官输入三点数，同时画面亮起灯光，可清楚看到胜出注码和赔率；是否与玩家押注的内容相同，来判定输赢。</span></div>						
					</li>					
				</div>

				<div className="tou_title">游戏规则:</div>
				<div className="des">筹码放在划有不同赌法的方格的赌桌上<br/>你可以下注在任何的方格，但要在下注时限之内押注。</div>
				
				<div className="tou_title">派彩赔率:</div>
				
				<div className="tou_table clearfix">
					<li className="col-xs-3 t-title"><span>投注项目</span></li>
					<li className="col-xs-3 t-title"><span>赔率</span></li>					
					<li className="col-xs-6 t-title"><span>说明</span></li>
					
					<li className="col-xs-3"><span>大 / 小</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 1</span></li>
					<li className="col-xs-6"><span>大：总点数 11 至 17 <br/>小：总点数为 4 至 10 ( 遇围骰庄家通吃 )</span></li>

					<li className="col-xs-3"><span>围骰</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 150</span></li>
					<li className="col-xs-6"><span>投注指定的围骰 ( 如 1 围骰 ) ，必须开出 3 颗所投注的骰子</span></li>					

					<li className="col-xs-3"><span>全围</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 24</span></li>
					<li className="col-xs-6"><span>3 颗骰子都一样</span></li>
					
							
				</div>
				
				<div className="des">下注在单一个点数:</div>				
				<div className="tou_table clearfix">
					<li className="col-xs-3 t-title"><span>投注项目</span></li>
					<li className="col-xs-3 t-title"><span>赔率</span></li>					
					<li className="col-xs-6 t-title"><span>说明</span></li>
					
					<li className="col-xs-3"><span>出现单骰</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 1</span></li>
					<li className="col-xs-6"><span>投注每颗骰子 1 至 6 中指定的点数，点数出现 1 次</span></li>

					<li className="col-xs-3"><span>出现双骰</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 2</span></li>
					<li className="col-xs-6"><span>投注每颗骰子 1 至 6 中指定的点数，点数出现 2 次</span></li>					

					<li className="col-xs-3"><span>出现全骰</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 3</span></li>
					<li className="col-xs-6"><span>投注每颗骰子 1 至 6 中指定的点数，点数出现 3 次</span></li>
					
					<li className="col-xs-3"><span>对子<br/> ( 双骰丶长牌 )</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 8</span></li>
					<li className="col-xs-6"><span>投注指定的双骰 ( 如双 1 点 ) ，至少开出 2 颗所投注的骰子</span></li>

					<li className="col-xs-3"><span>牌九式<br/> ( 骨牌丶短牌 )</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 5</span></li>
					<li className="col-xs-6"><span>投注 15 种 2 颗骰子可能出现的组合 ( 如 1丶2)</span></li>
				</div>
				
				<div className="des">3颗骰子点数总和:</div>				
				<div className="tou_table clearfix">
					<li className="col-xs-3 t-title"><span>投注项目</span></li>
					<li className="col-xs-4 t-title"><span>赔率</span></li>					
					<li className="col-xs-5 t-title"><span>说明</span></li>
					
					<li className="col-xs-3"><span>4 或17 点</span></li>
					<li className="col-xs-4"><span className="yellow">1 : 50</span></li>
					<li className="col-xs-5"><span>总和为 4 或 17 点</span></li>

					<li className="col-xs-3"><span>5 或 16 点</span></li>
					<li className="col-xs-4"><span className="yellow">1 : 18</span></li>
					<li className="col-xs-5"><span>总和为 5 或 16 点</span></li>					

					<li className="col-xs-3"><span>6 或 15 点</span></li>
					<li className="col-xs-4"><span className="yellow">1 : 14</span></li>
					<li className="col-xs-5"><span>总和为 6 或 15 点</span></li>
					
					<li className="col-xs-3"><span>7 或 14 点</span></li>
					<li className="col-xs-4"><span className="yellow">1 : 12</span></li>
					<li className="col-xs-5"><span>总和为 7 或 14 点</span></li>

					<li className="col-xs-3"><span>8 或 13 点</span></li>
					<li className="col-xs-4"><span className="yellow">1：8</span></li>
					<li className="col-xs-5"><span>总和为 8 或 13 点</span></li>
					
					<li className="col-xs-3"><span>9丶10丶11丶或 12 点</span></li>
					<li className="col-xs-4"><span className="yellow">1 : 6</span></li>
					<li className="col-xs-5"><span>总和为 9丶10丶11 或 12 点</span></li>
				</div>
				
				<div className="des">3颗骰子点数总和:</div>				
				<div className="tou_table clearfix">
					<li className="col-xs-3 t-title"><span>投注项目</span></li>
					<li className="col-xs-3 t-title"><span>赔率</span></li>					
					<li className="col-xs-6 t-title"><span>说明</span></li>
					
					<li className="col-xs-3"><span>单</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 1</span></li>
					<li className="col-xs-6"><span>	总点数为 5, 7, 9, 11, 13, 15, 17 点 <br/>( 遇围骰庄家通吃 )</span></li>

					<li className="col-xs-3"><span>双</span></li>
					<li className="col-xs-3"><span className="yellow">1 : 1</span></li>
					<li className="col-xs-6"><span>总点数为 4, 6, 8, 10, 12, 14, 16 点 <br/>( 遇围骰庄家通吃 )</span></li>					
				</div>
				
				<div className="tou_title">注意事项:</div>
				<div className="des2">
					<li><strong>1. </strong>桌台限红是本游戏桌台主要玩法的最小丶最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服</li>
					<li><strong>2. </strong>骰子摇动后，偶有稳定后无法判读点数状况时，此时荷官将重摇骰，直到能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</li>
					<li><strong>3. </strong>如遇结算错误，按照当期视频结果重新结算。</li>					
				</div>				
			</div>
        </div>
    )
}
export default Toubao