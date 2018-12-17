import React from 'react'
const douniu =()=>{
    return(
        <div>
        <div className="dou_banner clearfix">
				<li className="title">斗牛</li>
				<li className="des">Bullfight</li>
				<li className="dou_bar"></li>
				<li className="intro">斗牛是在全国广泛流传的一种民间游戏，又称百人牛牛。一家为庄家，其余为闲家，发牌后即开牌比牌，庄家与闲家一一比牌，牌型大的即赢。在这个游戏里，玩家可以投注红牛或黑牛赢，以及双方的特殊牌型。</li>
				<li className="dou_cap">
                {/* <img src="../lib/images/bullfight/pic_zh.jpg" className="img-responsive"> */}
                </li>
			</div>
			<div className="dou_content clearfix">				
				<div className="dou_title">如何胜出</div>				
				<div className="dou_des">比较“红牛”与“黑牛”的牌型大小，牌型较大的一方赢，牌型小的一方则输，牌型相同即为和局，特殊牌型投注区押中两方任一牌型即赢。</div>
				<div className="dou_title">操作及下注指南</div>
				<div className="dou_rule">
					<li className="dou_bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>开始投注时，玩家点击下注的筹码再点击桌上的任何一块投注区域进行投注</span></div>						
					</li>
                    
					<li className="dou_bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>在玩家投注时，荷官给“红牛”和“黑牛”两家各发五张面向下的牌，即暗牌</span></div>						
					</li>
					<li className="dou_bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>投注倒计时结束后，荷官开始扫描两家的牌</span></div>						
					</li>
                    <li className="dou_bg clearfix">
						<div className="col-xs-3 num"><span>4</span></div>
						<div className="col-xs-9 des"><span>比较“红牛”和“黑牛”的牌型大小，即决定输赢</span></div>						
					</li>
                    
				</div>
               
				{/* <div className="des3">注意：玩家在 "翻倍" 中下注时，该玩家的可用余额必须高于或等于下注额度的5倍，详细请看"注意事项"。</div> */}
                
				<div className="dou_title">游戏玩法</div>				
				<div className="dou_des">
					<ul>
                   		 <li>游戏使用一副去掉大、小王的52张扑克牌，每局每家派发5张牌，比较牌型大小决定胜负。</li><br/>
				 		 <li>红黑胜负和：</li>
                             比较红黑两家的牌型大小决定胜负，如果“红牛”与“黑牛”的牌型一致，则为“和”，不再比较具体牌值和花色，将会退回玩家投注“红牛”和“黑牛”的下注筹码，投注牌型的输赢则和两家的比牌结果无关<br/>
                             例如：红牛为牛三，黑牛也为牛三，即为和局，投注牌型“牛三”为赢
                         <br/><br/>
                   		 <li>牛一，牛二……牛牛，银牛/金牛/炸弹/五小牛：</li>
                             只要红黑两家任意一家出现指定牌型即算赢
						 <br/><br/>
                         <li>双牛牛：</li>
                             红黑两家都为牛牛牌型
                         <br/><br/>
                         <li>注意：</li>
                             同时下注“红牛”和“黑牛”算作对冲玩法
                    </ul>
				</div>
				
				<div className="dou_title">牌型</div>
				
			  <div className="dou_table clearfix">
					<span className="d1"><p className="txt1">5小牛</p></span>
					<span className="d1"><div className="d-01"></div></span>
					<span className="d1"><p className="txt2">每张牌都小于5<br/>且所有牌加起來小於或等於10</p></span>
                    
					<span className="d1"><p className="txt1">炸弹</p></span>
					<span className="d1"><div className="d-02"></div></span>
					<span className="d1"><p className="txt2">5张牌里有4张相同点数的牌</p></span>
                    
					<span className="d1"><p className="txt1">金牛</p></span>
					<span className="d1"><div className="d-03"></div></span>
					<span className="d1"><p className="txt2">5张牌都为10以上的牌不包括10</p></span>
                    
					<span className="d1"><p className="txt1">银牛</p></span>
					<span className="d1"><div className="d-04"></div></span>
					<span className="d1"><p className="txt2">5张牌都为10及以上的牌至少包括1张10</p></span>
                    
					<span className="d1"><p className="txt1">牛牛</p></span>
					<span className="d1"><div className="d-05"></div></span>
					<span className="d1"><p className="txt2">任意3张牌之和为10的倍数<br/>其余2张之和也为10的倍数</p></span>
                    
					<span className="d1"><p className="txt1">牛9</p></span>
					<span className="d1"><div className="d-06"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为9或19</p></span>
                    
					<span className="d1"><p className="txt1">牛8</p></span>
					<span className="d1"><div className="d-07"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为8或18</p></span>
                    
					<span className="d1"><p className="txt1">牛7</p></span>
					<span className="d1"><div className="d-08"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为7或17</p></span>
                    
					<span className="d1"><p className="txt1">牛6</p></span>
					<span className="d1"><div className="d-09"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为6或16</p></span>
                    
					<span className="d1"><p className="txt1">牛5</p></span>
					<span className="d1"><div className="d-10"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为5或15</p></span>
                    
					<span className="d1"><p className="txt1">牛4</p></span>
					<span className="d1"><div className="d-11"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为4或14</p></span>
                    
                    <span className="d1"><p className="txt1">牛3</p></span>
					<span className="d1"><div className="d-12"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为3或13</p></span>
                    
                    <span className="d1"><p className="txt1">牛2</p></span>
					<span className="d1"><div className="d-13"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为2或12</p></span>
                    
                    <span className="d1"><p className="txt1">牛1</p></span>
					<span className="d1"><div className="d-14"></div></span>
					<span className="d1"><p className="txt2">3张10的倍数组合<br/>剩余2张相加为1或11</p></span>
                    
					<span className="d1"><p className="txt1">无牛</p></span>
					<span className="d1"><div className="d-15"></div></span>
					<span className="d1"><p className="txt2">五张牌中没有任意三张牌<br/>点数之和为10的整数倍</p></span>					
			  </div>
				<div className="dou_title">大小比较</div>				

                     
				<br/><br/>
                <center>  
                五小牛>炸弹>金牛>银牛>牛牛>牛九>牛八>牛七>牛六>牛五>牛四>牛三>牛二>牛一>无牛
                </center>
                <br/><br/>

                
				<div className="dou_title">赔率</div>
				<div className="dou_table1 clearfix">
					<span className="dou_t1">牌型</span>
					<span className="dou_t2">赔率</span>
                    <span className="d1">黑牛</span>
					<span className="d2"><strong>1 : 0.95</strong></span>
					<span className="d1">红牛</span>
					<span className="d2"><strong>1 : 0.95</strong></span>                    
					<span className="d1">和</span>	
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛一</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛二</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛三</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛四</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛五</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛六</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛七</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛八</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛九</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">牛牛</span>
					<span className="d2"><strong>1 : 5</strong></span>
					<span className="d1">双牛牛</span>
					<span className="d2"><strong>1 : 100</strong></span>
					<span className="d1">银牛/金牛/炸弹/五小牛</span>
					<span className="d2"><strong>1 : 120</strong></span>
					
					
				</div>
				
				<div className="dou_title">注意事项</div>		
				
			  <div className="des2 clearfix">
				<strong>1. </strong>桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。<br/>
	            <strong>2. </strong>荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能完整判读（如遇故障因素将注销所有相关注单/派彩）。<br/>
	            <strong>3. </strong>如遇结算错误，按照当期视频结果重新结算。<br/>
                <strong>4. </strong>如游戏过程中因游戏平台网络等故障造成未能正常完成牌局,系统将取消整局玩家下注并退回下注本金。<br/>
                
              </div>				
              
			</div>
        </div>
    )
}
export default douniu