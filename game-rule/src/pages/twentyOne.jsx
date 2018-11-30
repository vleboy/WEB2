import React from 'react'

const TwentyOne = () => {
  return (
    <div>
      <div className="banner clearfix">
				<li className="title">21点</li>
				<li className="bar"></li>
				<li className="intro"><strong>21点</strong> 源于法国，只要玩家的扑克牌拥有最高21点数便获胜，但超过21点的玩家称为爆牌。牌局的最终目的，是要玩家手上拥有的牌总点数达到21点（或最接近又小于21点），然后和荷官比大小。</li>
				<li className="cap">
        {/* <img src="images/bj/cap.jpg" className="img-responsive"> */}
        </li>
			</div>
			<div className="content clearfix">
				<div className="title">如何胜出</div>				
				<div className="des">
					玩家想要赢得牌局，手上的牌点数必需比荷官的牌点数大，尽量接近21点但不可超过21点，游戏不需理会其他玩家的牌点数，玩家只与荷官比牌点数。
				</div>
				<div className="title">操作及下注指南:</div>
				<div className="rules">
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>玩家必须在规定的投注时间内确认下注</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>投注时间结束后，从荷官左侧的第１位玩家开始顺时针发牌，荷官会向每一位玩家派发第1张牌值向上的牌</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>最后荷官会发１张牌给荷官自己</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>4</span></div>
						<div className="col-xs-9 des"><span>荷官再向每一位玩家派发第２张牌值向上的牌</span></div>						
					</li>					
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>5</span></div>
						<div className="col-xs-9 des"><span>最后再发给自己第2张暗牌 (点数向下的牌)</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>6</span></div>
						<div className="col-xs-9 des"><span>荷官将顺序询问该玩家的相应动作，直至玩家停牌，荷官才询问下一位玩家</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>7</span></div>
						<div className="col-xs-9 des">
							<span><strong>保险：</strong>如荷官第1张明牌是A，荷官会先询问该玩家是否要购买保险。玩家可用初始注金的一半投注保险。</span>
						</div>	
					</li>
				</div>
				<div className="des2">
					1.	如荷官是Blackjack 便可获得保险金额赔率
					<br/>2.	如荷官不是Blackjack，则玩家失去保险金
					<br/>
					3.	如玩家分牌后等同玩家有2手牌，进座或旁注玩家可不买或只买1手保险
				</div>
				<div className="rules">						
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>8</span></div>
						<div className="col-xs-9 des">
							<span><strong>要牌：</strong>玩家根据自己的手牌，决定是要加牌或不加牌，荷官每次只会提供一张明牌直到玩家选择停牌或玩家牌的点值为21点或超过21点便会自动停牌。</span>
						</div>
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>9</span></div>
						<div className="col-xs-9 des"><span><strong>加注：</strong>1. 玩家可选择加倍下注，<br/>但加注后只获补发1张牌，即定输赢
					<br/>2. 分牌后，不能加倍赌注。</span>	</div>
					</li>
				</div>
				<div className="des2">

				</div>
				<div className="title">分牌流程:</div>
				<div className="rules">
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>10</span></div>
						<div className="col-xs-9 des"><span>分牌：分牌必须首2张牌为同等点数，可选择分开为2手牌，分出每门的下注金额须与原注相同。</span></div>
					</li>
				</div>
				<div className="des2">
					1.	玩家选择分牌后，荷官会从玩家左侧第1手牌先补牌，再在玩家右侧第２手牌补牌
					<br/>2.	然后荷官会从玩家左侧询问玩家是否要牌、停牌
					<br/>3.	完成玩家左侧第１手牌后，荷官再继续问玩家右侧的第２手牌是否要牌、停牌
					<br/>4.	分牌后，不能再加倍下注
					<br/>5.	如果是一对A，每手牌只能再获得一张牌，不能继续要牌
					<br/>6.	分牌后，荷官必需补牌，并且只能分1次
					<br/>7.	只有进座玩家才可选择分或不分。
					<br/>8.	如玩家当中的其1副牌拿到A和点值为10的牌，则以普通21点赔付
				</div>
				<div className="rules">			
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>11</span></div>
						<div className="col-xs-9 des"><span><strong>停牌：</strong>选择不再拿牌，以当时的手牌点数与荷官对抗</span></div>
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>12</span></div>
						<div className="col-xs-9 des"><span>当所有玩家完成所有动作后，荷官将揭开自己的底牌。荷官必须在17点或以上时停牌；在16点或以下时要牌。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>13</span></div>
						<div className="col-xs-9 des"><span>如果你的点数比荷官的点数更接近21点，或荷官爆牌, 将判断玩家赢</span></div>						
					</li>					
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>14</span></div>
						<div className="col-xs-9 des"><span>如果你的牌面值与荷官总牌值相同时，则判断为平手。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>15</span></div>
						<div className="col-xs-9 des"><span>荷官回收已使用的牌</span></div>						
					</li>
				</div>					
				<div className="des">
					*注意：如在游戏过程中及玩家在没有爆牌的情况下，没有选择任何动作时，则默认停牌。
				</div>
				<div className="title">游戏玩法</div>				
				<div className="des">
					<p>本游戏以8副标准的52张扑克牌, 合共416张牌进行。牌值如下: </p>
					<br/>2到10的牌的价值是它们的面值。
					<br/>公牌 (J, Q 和 K) 的牌值是10。 
					<p>A 的牌值是1或11, 取其中有利于当前牌的值。请注意, 本游戏包含'软牌', A 的牌值是11。</p>
				</div>
				<div className="title">游戏规则:</div>				
				<div className="des2 clearfix">
					<p><strong>1.</strong> 用8副牌。</p>
					<p><strong>2.</strong> 荷官必须在17点或以上时停牌。</p>
					<p><strong>3.</strong> 可针对第一次发牌拿到的任意2张牌赌注加倍。</p>
					<p><strong>4.</strong> 可分拆首2张拿到的两张牌值相同的牌。</p>
					<p><strong>5.</strong> 最多只能分牌1次。</p>
					<p><strong>6.</strong> 如2张相同牌值的牌为A, 分牌后则只能再拿一张牌。</p>
					<p><strong>7.</strong> 分牌后不能加倍赌注。</p>
					<p><strong>8.</strong> 荷官拿到A时,提供保险选项让玩家可选择是否须要下保险注。</p>
					<p><strong>9.</strong> Blackjack 赔率 2:3。</p>
					<p><strong>10.</strong> 保险赔率 1:2。</p>					
					<p><strong>11.</strong> 荷官的总牌值与玩家相同时, 将判断为和局。</p>					
				</div>
				
				<div className="title">点数大小:</div>
				<div className="des clearfix">
					<p className="num-t">10、J、Q、K 的点数值为 10 点</p>
					<p className="num-c"><span className="ex1"></span></p>
				</div>
				<div className="des clearfix">
					<p className="num-t2">任何 2 至 9 的牌点值与其牌面的点值等相同 2 至 9 点</p>
					<p className="num-c"><span className="ex2"></span></p>
				</div>
				<div className="des clearfix">
					<p className="num-t2">A 点数为 1 或 11 点 (按玩家自己手牌决定)</p>
					<p className="num-c"><span className="ex3"></span></p>
				</div>
				<div className="title">牌值大小:</div>
				<div className="des3 clearfix">
					<p className="step">
						<span className="s-ico">Blackjack</span>
						<span className="s-des">首2张牌组成21点又称为 BJ</span>						
					</p>
					<p className="arrow"></p>
					<p className="step">
						<span className="s-ico">21 点</span>
						<span className="s-des">多于 2 张牌组成的 21 点或在分牌过程中拿到的普通 21 点</span>						
					</p>
					<p className="arrow"></p>
					<p className="step">
						<span className="s-ico">任何点数</span>
						<span className="s-des">如果你的点数比荷官的点数更接近 21 点，或者荷官爆牌则判定为玩家赢</span>						
					</p>
					<p className="arrow"></p>
					<p className="step">
						<span className="s-ico">和局 </span>
						<span className="s-des">荷官及玩家同时获得 BJ 或玩家与荷官总牌值相同时该局视为和局，初始注金及加注注金全部退回</span>						
					</p>
					<p className="arrow"></p>
					<p className="step">
						<span className="s-ico">爆牌</span>
						<span className="s-des">玩家手上所有牌点数加起来超过 21 点称为爆牌玩家输掉所有初始及加倍的金额</span>						
					</p>
				</div>		
				<div className="title">派彩 及 下注选择项目:</div>
				<div className="des3 clearfix">
					<div className="payout clearfix">
						<p className="p-ico">旁注</p>
						<p className="p-des">
							<strong>1.</strong> 进座玩家下底注外，同时可下其他位置的旁注，但不能在自己的位置下旁注。<br/>
							<strong>2.</strong> 旁注玩家(只能于已进座及已下注的进座玩家位置)进行旁注。<br/>
							<strong>3.</strong> 旁注玩家没有权利选择加牌、停牌、分牌，一切由进座玩家控制。<br/>
							<strong>4.</strong> 旁注玩家可于游戏设定旁注规则或于首次进入Blackjack下旁注时，系统将自动弹出设定对话窗，可让玩家预先设定旁注规则：<br/>
							{/* <img src="images/bj/ex.jpg"> */}
              <br/>
							<strong>5.</strong> 如进座玩家分牌变成2手牌后，如旁注没有足够资金于2手牌下注，则以荷官派发的第1手牌为主<br/>
							<strong>6.</strong> 当进座玩家选择加注时，旁注玩家可选择加注与否
						</p>
					</div>
					<div className="payout clearfix">
						<p className="p-ico">Blackjack</p>
						<p className="p-des2">赔率 2:3</p>
						<p className="ex4"></p>
					</div>
					<div className="payout clearfix">
						<p className="p-ico">21点</p>
						<p className="p-des2">赔率 1:1</p>
						<p className="ex5"></p>
					</div>
					<div className="payout clearfix">
						<p className="p-ico">保险</p>
						<p className="p-des3">荷官牌开出是 Blackjack,玩家便可获得保险金额赔率 1:2。</p>
					</div>
					<div className="payout clearfix">
						<p className="p-ico">底注</p>
						<p className="p-des3">玩家进座后, 点击下注的筹码, 再点击座位号, 确认游戏开始。</p>
					</div>
					<div className="payout clearfix">
						<p className="p-ico">完美对子</p>
						<p className="p-des4">以玩家首2张牌算</p>
						<p className="p-item">
							<span className="ex6"></span>
							<strong>完美对子</strong>
							<br/>闲家一对同色同花同点值
							<br/>赔率 1:25
						</p>
						<p className="p-item">
							<span className="ex7"></span>
							<strong>同色对子</strong>
							<br/>闲家一对同色同点值不同花
							<br/>赔率 1:12
						</p>
						<p className="p-item">
							<span className="ex8"></span>
							<strong>混合对子</strong>
							<br/>闲家一对不同色不同花同点值
							<br/>赔率 1:6
						</p>
					</div>
					<div className="payout clearfix">
						<p className="p-ico">21+3</p>
						<p className="p-des4">21+3 玩法：玩家首 2 张＋荷官 1 张</p>
						<p className="p-item col-xs-4">
							<span className="ex9"></span>
							<strong>同花三条</strong>
							<br/>(完全相同的三张牌)
							<br/>赔率 1:100
						</p>
						<p className="p-item col-xs-4">
							<span className="ex10"></span>
							<strong>同花顺</strong>
							<br/>(同花顺子，3 张同花顺序)
							<br/>赔率 1:40
						</p>
						<p className="p-item col-xs-4">
							<span className="ex11"></span>
							<strong>三条</strong>
							<br/>(三张相同牌值的非同花牌)
							<br/>赔率 1:30
						</p>
						<p className="p-item col-xs-4">
							<span className="ex12"></span>
							<strong>顺子</strong>
							<br/>
							(非同顺子，3 张不同花顺序，包含Q、K、A 牌型)
							<br/>赔率 1:10
						</p>
						<p className="p-item col-xs-4">
							<span className="ex13"></span>
							<strong>同花</strong>
							<br/>(3 张同一花色的牌)
							<br/>赔率 1:5
						</p>
					</div>
				</div>
				
				<div className="title">注意事项:</div>				
				<div className="des2 clearfix">
					<p><strong>1.</strong> 所有玩家必须先下底注才能于完美对子和21+3下注。</p>				
					<p><strong>2.</strong> 重复下注功能只能下注底注、完美对子和21+3，不能重复下注旁注。</p>				
					<p><strong>3.</strong> 若在该局游戏内所有玩家爆牌或Blackjack 时，荷官揭开暗牌并结束本局，无论荷官点数是否到达17点都不再补牌。</p>
					<p><strong>4.</strong> 桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
					<p><strong>5.</strong> 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫瞄，直到系统能完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
					<p><strong>6.</strong> 如遇结算错误，按照当期视频结果重新结算。</p>
					<p><strong>7.</strong> 如游戏过程中因游戏平台网络等故障造成未能正常完成牌局,系统将取消整局玩家下注并退回下注本金 (若玩家已经是BlackJack后出现系统故障,该玩家仍然按照2:3进行派彩)。</p>
				</div>				
			</div>
    </div>
  )
}

export default TwentyOne
