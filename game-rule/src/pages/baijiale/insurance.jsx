import React from 'react'
const Insurance =()=>{
    return (
        <div>
            <div className="ins_banner clearfix">
				<li className="title">保险百家乐</li>
				<li className="des">Insurance Baccarat</li>
				<li className="ins_bar"></li>
				<li className="intro"><strong>保险百家乐</strong>是近年最受玩家欢迎的一个新功能，顾名思义在游戏中加入保险元素，除了不影响百家乐游戏的结果外，同时亦能保障玩家不至于输掉所有的押注金额。</li>
				<li className="ins_cap"></li>
			</div>
			<div className="res_content clearfix">
				<div className="ins_title">操作及下注指南:</div>
				<div className="rules">
					<li className="r-bg orange clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>荷官开庄和闲首两张牌，任何一家首两牌为<strong>8或9点(天生赢家)</strong>，牌局就算结束,不再补牌,也不会触发保险。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>鼠标箭头移到投注区问号按钮时<br/>系统会自动弹出游戏规则及赔率。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>触发保险时，符合投保条件的用户默认自动弹出保险投注窗口（取消了自动弹出的用户可点击闪烁的保险区域）。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>4</span></div>
						<div className="col-xs-9 des"><span>玩家可直接在保险投注窗口选择<br/>已显示的筹码或自行输入总额再按确定按钮。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>5</span></div>
						<div className="col-xs-9 des"><span>点击投注窗口中的筹码进行投注一局<br/>中触发两次同类型保险时玩家只能投注一次。</span></div>						
					</li>					
				</div>				
				<div className="ins_title">游戏规则:</div>
				<div className="res_des">
					<li><strong>1.</strong> 每局游戏中，庄闲各有2个保险触发点。当牌面满足以下条件时，系统将触发保险下注。</li>
					<li><strong>2.</strong> 触发庄保险时，只有本局投注了庄的玩家有资格进行庄保险下注，闲保险同理。</li>
					<li><strong>3.</strong> 保险的限红根据玩家所下的庄或闲注丶触发保险时保险的赔率而定<br/>计算方式为：下限 = 1, 上限 = (玩家所下庄/闲注额 ÷ 赔率)。</li>
					<li><span className="txt">其中，赔率根据触发保险时的庄闲牌面而定，详见下方列表：</span></li>
				</div>
				<div className="res_des row">
					<div className="res_table clearfix col-xs-6">
						<div className="res_sub">庄保险</div>
						<div className="sub-des">庄保险 (闲补牌前)</div>	
						<li className="col-xs-4 t-title"><span>庄点数</span></li>
						<li className="col-xs-4 t-title"><span>闲点数</span></li>
						<li className="col-xs-4 t-title"><span>赔率(庄保险)</span></li>
						<li className="col-xs-4"><span>5</span></li>
						<li className="col-xs-4"><span>0-4</span></li>
						<li className="col-xs-4"><span><strong>1:2</strong></span></li>
						<li className="col-xs-4"><span>6</span></li>
						<li className="col-xs-4"><span>0-5</span></li>
						<li className="col-xs-4"><span><strong>1:3</strong></span></li>
						<li className="col-xs-4"><span>7</span></li>
						<li className="col-xs-4"><span>0-5</span></li>
						<li className="col-xs-4"><span><strong>1:4</strong></span></li>
					</div>

					<div className="res_table clearfix col-xs-6">
						<div className="res_sub"></div>
						<div className="sub-des">庄保险输赢规则 (闲补牌前)</div>						
						<li className="col-xs-4 t-title"><span>最後结果</span></li>
						<li className="col-xs-4 t-title"><span>投注庄保险<br/>结果</span></li>
						<li className="col-xs-4 t-title"><span>庄</span></li>									
						<li className="col-xs-4"><span>闲赢</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						<li className="col-xs-4"><span>输</span></li>							
						<li className="col-xs-4"><span>庄赢</span></li>
						<li className="col-xs-4"><span>输</span></li>
						<li className="col-xs-4"><span>赢</span></li>							
						<li className="col-xs-4"><span>和</span></li>
						<li className="col-xs-4"><span>和</span></li>
						<li className="col-xs-4"><span>和</span></li>							
					</div>
				</div>
				
				<div className="res_des row">
					<div className="res_table clearfix col-xs-6">
						<div className="res_sub"></div>
						<div className="sub-des">庄保险 (闲补牌后)</div>	
						<li className="col-xs-4 t-title"><span>庄点数<br/>(前2张牌)</span></li>
						<li className="col-xs-4 t-title"><span>闲点数</span></li>
						<li className="col-xs-4 t-title"><span>赔率(庄保险)</span></li>
						
						<li className="col-xs-4"><span>1</span></li>
						<li className="col-xs-4"><span>1</span></li>
						<li className="col-xs-4"><span><strong>1:7</strong></span></li>
						
						<li className="col-xs-4"><span>1-6</span></li>
						<li className="col-xs-4"><span>0</span></li>
						<li className="col-xs-4"><span><strong>1:9</strong></span></li>
						
						<li className="col-xs-4"><span>2-6</span></li>
						<li className="col-xs-4"><span>1</span></li>
						<li className="col-xs-4"><span><strong>1:8</strong></span></li>
						
						<li className="col-xs-4"><span>3-6</span></li>
						<li className="col-xs-4"><span>2</span></li>
						<li className="col-xs-4"><span><strong>1:4</strong></span></li>
						
						<li className="col-xs-4"><span>4</span></li>
						<li className="col-xs-4"><span>3</span></li>
						<li className="col-xs-4"><span><strong>1:2</strong></span></li>
					</div>

					<div className="res_table clearfix col-xs-6">
						<div className="res_sub"></div>
						<div className="sub-des">庄保险输赢规则 (闲补牌后)</div>
						
						<li className="col-xs-4 t-title"><span>最後结果</span></li>
						<li className="col-xs-4 t-title"><span>投注庄保险<br/>结果</span></li>						
						<li className="col-xs-4 t-title"><span>庄</span></li>				
						
						<li className="col-xs-4"><span>闲赢</span></li>
						<li className="col-xs-4"><span>赢</span></li>						
						<li className="col-xs-4"><span>输</span></li>
						
						<li className="col-xs-4"><span>庄赢</span></li>
						<li className="col-xs-4"><span>输</span></li>						
						<li className="col-xs-4"><span>赢</span></li>
						
						<li className="col-xs-4"><span>0点和</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						<li className="col-xs-4"><span>和</span></li>
						
						<li className="col-xs-4"><span>>=1点和</span></li>
						<li className="col-xs-4"><span>和</span></li>
						<li className="col-xs-4"><span>和</span></li>
					</div>
				</div>
				
				<div className="res_des row">
					<div className="res_table clearfix col-xs-6">
						<div className="res_sub">闲保险</div>
						<div className="sub-des">闲保险（闲补牌前）</div>	
						<li className="col-xs-4 t-title"><span>闲点数</span></li>
						<li className="col-xs-4 t-title"><span>庄点数</span></li>
						<li className="col-xs-4 t-title"><span>赔率(闲保险)</span></li>
						
						<li className="col-xs-4"><span>5</span></li>
						<li className="col-xs-4"><span>4</span></li>
						<li className="col-xs-4"><span><strong>1:2</strong></span></li>
						
						<li className="col-xs-4"><span>6</span></li>
						<li className="col-xs-4"><span>0-5</span></li>
						<li className="col-xs-4"><span><strong>1:3</strong></span></li>
						
						<li className="col-xs-4"><span>7</span></li>
						<li className="col-xs-4"><span>0-5</span></li>
						<li className="col-xs-4"><span><strong>1:4</strong></span></li>
					</div>

					<div className="res_table clearfix col-xs-6">
						<div className="res_sub"></div>
						<div className="sub-des">闲保险输赢规则（闲补牌前）</div>
						
						<li className="col-xs-4 t-title"><span>最後结果</span></li>
						<li className="col-xs-4 t-title"><span>投注闲保险<br/>结果</span></li>						
						<li className="col-xs-4 t-title"><span>闲</span></li>				
						
						<li className="col-xs-4"><span>庄赢</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						<li className="col-xs-4"><span>输</span></li>
						
						<li className="col-xs-4"><span>闲赢</span></li>
						<li className="col-xs-4"><span>输</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						
						<li className="col-xs-4"><span>和</span></li>
						<li className="col-xs-4"><span>和</span></li>
						<li className="col-xs-4"><span>和</span></li>
					</div>
				</div>
				
				<div className="res_des row">
					<div className="res_table clearfix col-xs-6">
						<div className="res_sub"></div>
						<div className="sub-des">闲保险输赢规则（闲补牌后）</div>	
						<li className="col-xs-4 t-title"><span>闲点数</span></li>
						<li className="col-xs-4 t-title"><span>庄点数<br/>(前2张牌)</span></li>
						<li className="col-xs-4 t-title"><span>赔率(闲保险)</span></li>
						
						<li className="col-xs-4"><span>5</span></li>
						<li className="col-xs-4"><span>0-4</span></li>
						<li className="col-xs-4"><span><strong>1:2</strong></span></li>
						
						<li className="col-xs-4"><span>6</span></li>
						<li className="col-xs-4"><span>0-5</span></li>
						<li className="col-xs-4"><span><strong>1:3</strong></span></li>
						
						<li className="col-xs-4"><span>7</span></li>
						<li className="col-xs-4"><span>0-6</span></li>
						<li className="col-xs-4"><span><strong>1:4</strong></span></li>
						
						<li className="col-xs-4"><span>8</span></li>
						<li className="col-xs-4"><span>0-6</span></li>
						<li className="col-xs-4"><span><strong>1:8</strong></span></li>
						
						<li className="col-xs-4"><span>9</span></li>
						<li className="col-xs-4"><span>0-6</span></li>
						<li className="col-xs-4"><span><strong>1:9</strong></span></li>						
					</div>

					<div className="res_table clearfix col-xs-6">
						<div className="res_sub"></div>
						<div className="sub-des">闲保险输赢规则（闲补牌后）</div>
						
						<li className="col-xs-4 t-title"><span>最後结果</span></li>
						<li className="col-xs-4 t-title"><span>投注闲保险<br/>结果</span></li>						
						<li className="col-xs-4 t-title"><span>闲</span></li>				
						
						<li className="col-xs-4"><span>庄赢</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						<li className="col-xs-4"><span>输</span></li>
						
						<li className="col-xs-4"><span>闲赢</span></li>
						<li className="col-xs-4"><span>输</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						
						<li className="col-xs-4"><span>9点和</span></li>
						<li className="col-xs-4"><span>赢</span></li>
						<li className="col-xs-4"><span>和</span></li>
						
						<li className="col-xs-4"><span> {'<='} 8点和</span></li>
						<li className="col-xs-4"><span>和</span></li>
						<li className="col-xs-4"><span>和</span></li>						
					</div>
				</div>				
				<div className="ins_title">注意事项:</div>
				<div className="res_des">
					<li><strong>1.</strong> 桌台限红是本游戏桌台主要玩法的最小丶最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。</li>
					<li><strong>2.</strong> 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</li>
					<li><strong>3.</strong> 若牌局出现异常，需取消局以维持公平性时，将退还该局所有玩法的下注；若异常不影响主玩法，则仅保险下注无效，退还保险下注。</li>
					<li><strong>4.</strong> 如遇结算错误，按照当期视频结果重新结算。</li>
					<li><strong>5.</strong> 当重新派彩时,保险玩法作退回本金处理,其他玩法作正常重新派彩结算。</li>					
				</div>					
			</div>
        </div>
    )
}
export default Insurance