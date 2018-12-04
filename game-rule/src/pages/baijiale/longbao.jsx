import React from 'react'
const Longbao =() =>{
    return (
        <div>
            <div className="banner longbao_banner clearfix">
				<li className="title">龙宝百家乐</li>
				<li className="des">Dragon Bonus Baccarat</li>
				<li className="longbao_bar"></li>
				<li className="intro"><strong>龙宝</strong>会根据所投注一方胜出对方点数的情况，赔率会有所不同，<strong>最高彩金为 30 倍</strong>，且所赢得彩金不抽水。若投注其中一方获胜，并且符合下列两种之一即可获得派彩；</li>
				<li className="longbao_cap"></li>
			</div>
			<div className="longbao_content clearfix">
				<div className="longbao_title">闲龙宝/庄龙宝规则</div>
				<div className="longbao_des">
					<p><strong>若投注其中一方获胜，并且符合下列两种之一即可获得派彩</strong></p>
					<p><strong>1.</strong> 所投注之胜方以(非例牌)，且超过对方四点以上。</p>
					<p><strong>2.</strong> 所投注之胜方两张牌相加为八点或九点(例牌)，可获得一倍彩金。</p>
					<p><strong>3.</strong> 所投注落败或平手或胜差於三点以下时，即丧失所押注彩金，但若双方皆为八点或九点(例牌)且双方平手时，则可取回所投注彩金。</p>
				</div>
				<div className="longbao_des">
					<li className="col-lg-6 col-xs-12">						
						<p className="name">非例牌</p>
						<p className="txt">. 头两张牌的点数总和并非8或9点。<br/>. 所有三张牌的情况亦属非例牌。</p>						
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="name">例牌</p>
						<p className="txt">. 头两张牌的点数总和为8或9点。</p>						
					</li>					
				</div>
						
				<div className="longbao_sub_title">赔率表:</div>						
				<div className="longbao_table clearfix">
					<li className="col-xs-6 t-title"><span>胜出情况</span></li>
					<li className="col-xs-6 t-title"><span>赔率</span></li>
					
					<li className="col-xs-6"><span>胜方以(非例牌)赢9点</span></li>
					<li className="col-xs-6"><span className="yellow">1：30</span></li>

					<li className="col-xs-6"><span>胜方以(非例牌)赢8点</span></li>
					<li className="col-xs-6"><span className="yellow">1：10</span></li>

					<li className="col-xs-6"><span>胜方以(非例牌)赢7点</span></li>
					<li className="col-xs-6"><span className="yellow">1：5</span></li>

					<li className="col-xs-6"><span>胜方以(非例牌)赢6点</span></li>
					<li className="col-xs-6"><span className="yellow">1：3</span></li>

					<li className="col-xs-6"><span>胜方以(非例牌)赢5点</span></li>
					<li className="col-xs-6"><span className="yellow">1：2</span></li>
					
					<li className="col-xs-6"><span>胜方以(非例牌)赢4点</span></li>
					<li className="col-xs-6"><span className="yellow">1：1</span></li>
					
					<li className="col-xs-6"><span>胜方以(例牌)赢出</span></li>
					<li className="col-xs-6"><span className="yellow">1：1</span></li>
					
					<li className="col-xs-6"><span>(例牌)和局</span></li>
					<li className="col-xs-6"><span className="yellow">退回下注</span></li>					
				</div>
							
				<div className="longbao_title">例牌举例说明:</div>
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>1</span></p><p className="title">胜方以(非例牌)赢9点</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家9点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex1a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家0点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex1b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注“闲龙宝”胜方以(非例牌)赢9点，派彩1:30 。</p></li>
				</div>

				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>2</span></p><p className="title">胜方以(非例牌)赢8点</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家9点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex2a"></p></li>
					<li className="col-lg-2 col-xs-3"><p className="player"><span>庄家1点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex2b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注"闲龙宝"胜方以(非例牌)赢8点，派彩1:10 。</p></li>
				</div>
				
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>3</span></p><p className="title">胜方以(非例牌)赢7点</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家9点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex3a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家2点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex3b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注"闲龙宝'胜方以(非例牌)赢7点，派彩1:5 。</p></li>
				</div>

				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>4</span></p><p className="title">胜方以(非例牌)赢6点</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家8点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex4a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家2点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex4b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注"闲龙宝"胜方以(非例牌)赢6点，派彩1:3 。</p></li>
				</div>
				
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>5</span></p><p className="title">胜方以(非例牌)赢5点</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家5点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex5a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家0点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex5b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注"闲龙宝"胜方以(非例牌)赢5点，派彩1:2 。</p></li>
				</div>
				
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>6</span></p><p className="title">胜方以(非例牌)赢4点</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家9点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex6a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家5点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex6b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注"闲龙宝"胜方以(非例牌)赢4点，派彩1:1 。</p></li>
				</div>
				
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>7</span></p><p className="title">胜方以(例牌)赢出</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家9点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex7a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家8点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex7b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 闲赢，下注"闲龙宝"胜方以(例牌)胜出，派彩1:1。</p></li>
				</div>
				
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>8</span></p><p className="title">(例牌)和局</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家8点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex8a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家8点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex8b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 和局，下注"庄丶闲龙宝"下注方以(例牌)和局，则退回下注金。</p></li>
				</div>
				
				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>9</span></p><p className="title">下注方以(非例牌)点数为3点或以下，输掉下注金</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家6点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex9a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家9点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex9b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 庄赢，下注"庄龙宝"下注方以(非例牌)点数为3点或以下，输掉下注金。</p></li>
				</div>

				<div className="longbao_des2">
					<li className="col-xs-12"><p className="num"><span>10</span></p><p className="title">下注方以(非例牌)和局输掉下注金</p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="banker"><span>闲家7点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex10a"></p></li>
					<li className="col-lg-2 col-md-3 col-xs-4"><p className="player"><span>庄家7点</span></p></li>
					<li className="col-lg-4 col-md-3 col-xs-8"><p className="ex10b"></p></li>
					<li className="col-xs-12"><p className="stxt">结果: 和局，下注"庄丶闲龙宝"下注方以(非例牌)和局，输掉下注金。</p></li>
				</div>
				<div className="longbao_title">注意事项:</div>				
				<div className="des3">
					<p><strong>1.</strong> 当每一靴牌进入<strong>第31局或以后</strong>，玩家将不得投注大小。</p>
					<p><strong>2.</strong> 桌台限红是本游戏桌台主要玩法的最小丶最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
					<p><strong>3.</strong> 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
					<p><strong>4.</strong> 如遇结算错误，按照当期视频结果重新结算。</p>
				</div>					
			</div>
        </div>
    )
}
export default Longbao