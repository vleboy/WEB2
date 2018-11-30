import React from 'react'
const douniu =()=>{
    return(
        <div>
            <div className="banner clearfix">
				<li className="title">炸金花</li>
				<li className="des">Win Three Cards</li>
				<li className="bar"></li>
				<li className="intro">炸金花（诈金花）是在全国广泛流传的一种民间游戏，又称赢三张，使用一副去掉大、小王的共52张扑克牌。玩家以手中的三张牌比大小，玩法简单、易懂。在这个游戏里，玩家可以投注龙或凤，以及其他特殊牌型。</li>
				<li className="cap">
                {/* <img src="images/zhajinhua/pic.jpg" className="img-responsive"> */}
                </li>
			</div>
			<div className="content clearfix">				
				<div className="title">如何胜出</div>				
				<div className="des">比较“龙”与“凤”的牌型大小，牌型较大的一方赢，牌型小的一方则输，押中赢的一方或其牌型即赢。</div>
				<div className="title">操作及下注指南:</div>
				<div className="rules">
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>开始投注时，玩家点击下注的筹码再点击桌上的任何一块投注区域（龙/凤/对8以上/同花/顺子/豹子/同花顺）</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>在玩家投注时，荷官给“龙”和“凤”两家各发三张面向下的牌，即暗牌</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>投注倒计时结束后，荷官开始扫描两家的牌</span></div>						
					</li>
                    <li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>4</span></div>
						<div className="col-xs-9 des"><span>比较“龙”和“凤”的牌型大小，即决定输赢</span></div>						
					</li>
				</div>
				{/* <div className="des3">注意：玩家在 "翻倍" 中下注时，该玩家的可用余额必须高于或等于下注额度的5倍，详细请看"注意事项"。</div> */}
				<div className="title">游戏玩法</div>				
				<div className="des">
					游戏使用一副去掉大、小王的52张扑克牌，每局每家派发3张牌，先比较牌型大小，如牌型一致再按从大到小的顺序比较牌值大小，决定胜负。如果“龙”与“凤”的三张牌大小完全一致，则为“和局”，退回玩家所有下注筹码。
				  <br/>
					<p>你有以下几种下注选择：	</p>	
					<p><strong>龙</strong></p>
					<p><strong>凤</strong></p>
					<p><strong>对8以上 （对9-对A，顺子，同花，同花顺，豹子）</strong></p>	
					<p><strong>顺子</strong></p>
					<p><strong>同花</strong></p>
					<p><strong>同花顺</strong></p>
					<p><strong>豹子</strong></p>
				  <p style={{textAlign:'left'}}>注意：同时下注“龙”和“凤”算作对冲玩法
                  {/* <img src="images/zhajinhua/ex2.jpg" className="img-responsive"> */}
                  </p>
					<p>&nbsp;</p>
				</div>
				
				<div className="title">牌型</div>
				
			  <div className="table2 clearfix">
					<span className="c1"><p className="txt1">豹子杀手</p></span>
					<span className="c1"><p className="txt2">三张非同花的2、3、5牌</p></span>
					<span className="c1"><div className="t-01"></div></span>
					<span className="c1"><p className="txt1">豹 子</p></span>
					<span className="c1"><p className="txt2">三张点数相同的牌</p></span>
					<span className="c1"><div className="t-02"></div></span>
					<span className="c1"><p className="txt1">同花顺</p></span>
					<span className="c1"><p className="txt2">花色相同的顺子牌</p></span>
					<span className="c1"><div className="t-03"></div></span>
					<span className="c1"><p className="txt1">同花</p></span>
					<span className="c1"><p className="txt2">花色相同的牌</p></span>
					<span className="c1"><div className="t-04"></div></span>
					<span className="c1"><p className="txt1">顺子</p></span>
					<span className="c1"><p className="txt2">顺子牌</p></span>
					<span className="c1"><div className="t-05"></div></span>
					<span className="c1"><p className="txt1">对子</p></span>
					<span className="c1"><p className="txt2">两张点相同的牌</p></span>
					<span className="c1"><div className="t-06"></div></span>
					<span className="c1"><p className="txt1">散牌</p></span>		
					<span className="c1"><p className="txt2">三张牌不组成任何类型的牌</p></span>
					<span className="c1"><div></div></span>
				</div>
				<div className="title">大小比较</div>				
                       
				<div className="table3 clearfix">
                    <span className="c1"></span><span className="c2 more"><strong>牌值大小</strong><br/><strong>A</strong> > <strong>K</strong> > <strong>Q</strong> > <strong>J</strong> > <strong>10</strong> > <strong>9</strong> > <strong>8</strong> > <strong>7</strong> > <strong>6</strong> > <strong>5</strong> > <strong>4</strong> > <strong>3</strong> > <strong>2</strong> ,<strong>各花色不分大小</strong><br/>
                    {/* <p className="t-07"></p>
                    <img src="images/zhajinhua/flash.png" width="90%"> */}
                    </span>
	                <span className="c1"></span><span className="c2 less"><strong>豹 子     >     同花顺    >     同花   >   順 子   >   对 子    >    散 牌</strong></span>
					<span className="c1"></span><span className="c2 less"><strong>豹子杀手   >   豹子</strong><br/>当豹子牌和豹子杀手牌同时存在时，豹子杀手牌比豹子牌大;</span>
					<span className="c1"></span><span className="c2 less"><strong>散 牌     >    豹子杀手</strong><br/>在没有豹子牌型的情况下，豹子杀手是最小的散牌牌型;</span>
					<span className="c1"></span><span className="c2"><strong>对子牌型</strong><br/>如果两家都是对子牌即比对子的点数大小，两对对子的点数相同时再比单牌的点数大小；</span>
					<span className="c1"></span><span className="c2"><strong>豹子、同花、散牌牌型</strong><br/>比最大那张牌的点数，如最大牌的点数相同则比第二大的牌以此类推</span>
					<span className="c1"></span><p className="c2 more"><strong>同花顺，顺子</strong><br/>按照顺序比点数：AKQ> KQJ> ......> 432> 32A<br/>

                    <span className="c3">
                   	 {/* <img src="images/zhajinhua/flash2.png" width="90%"> */}
                     {/* <span className="t-08"></span> > <span className="t-09"></span> > …… > <span className="t-10"></span> > <span className="t-11"></span> */}
                    </span>
                    
                    </p>
                    <br/><br/>
					<span className="des">（注意：只有在同花顺和顺子牌型中，A可作为最大或最小的牌，其余牌型中A为最大的单牌）</span>
				</div>
				<div className="title">赔率</div>
				<div className="table4 clearfix">
					<span className="t1">玩法</span>
					<span className="t2">賠率</span>
                    <span className="c1">龙</span>
					<span className="c2"><strong>1 : 0.95</strong></span>
					<span className="c1">凤</span>
					<span className="c2"><strong>1 : 0.95</strong></span>                    
					<span className="c1">对8以上 （对9-对A，顺子，同花，同花顺，豹子）</span>	
					<span className="c2"><strong>1 : 2</strong></span>
					<span className="c1">顺子</span>
					<span className="c2"><strong>1 : 7</strong></span>
					<span className="c1">同花</span>
					<span className="c2"><strong>1 : 8</strong></span>
					<span className="c1">同花顺</span>
					<span className="c2"><strong>1 : 100</strong></span>
					<span className="c1">豹子</span>
					<span className="c2"><strong>1 : 120</strong></span>
					
				</div>
				<div className="des2 clearfix">注意：玩家下注以上玩法时,只有赢的一方以该牌型获胜才算<br/>
				如:<br/>
				 <strong>1. </strong>玩家下注顺子,龙以顺子赢了则按顺子的赔率派彩<br/>
				  <strong>2. </strong>玩家下注顺子,牌局结果为龙顺子 凤同花,则玩家下的顺子玩法派彩为输<br/> 
				</div>
				
				
				
				<div className="title">注意事项</div>		
				
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