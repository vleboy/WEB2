import React from 'react'
import ex2 from '../imgs/niu_ex2.jpg'
import ex1 from '../imgs/niu_ex1.jpg'
const NiuNiu = () => {
  return (
    <div>
      <div className="niu_banner clearfix">
				<li className="title">牛牛</li>
				<li className="des">Bull Bull</li>
				<li className="niu_bar"></li>
				<li className="intro"><strong>牛牛</strong> 又名斗牛，是一款流行于广东、广西、湖南以及江浙一带的传统棋牌游戏。其中一家为庄家，其余为闲家，发完牌后马上开牌比牌，所有闲家与庄家一一进行比较确定输赢。游戏节奏紧凑刺激，规则简单。</li>
				<li className="niu_cap">
        {/* <img src="images/niuniu/pic.jpg" className="img-responsive"> */}
        </li>
			</div>
			<div className="content niu_content clearfix">				
				<div className="title">如何胜出</div>				
				<div className="des">
					牛牛中将根据头牌决定的顺序发四份牌 庄家、闲1、闲2、闲3，玩家可押注1~3家闲胜的「平倍」丶「翻倍」，以及对应庄家胜闲1～3的「平倍」丶「翻倍」。若押注任何一家闲家并且所押闲家牌型大於庄家，则玩家获胜；若押注庄胜其中一家闲家并且庄家牌型大於该闲家的牌型，则玩家获胜： 
				  <br/>
					<br/><strong>平倍：</strong>闲家与庄家平倍博弈，派彩不受牌型影响，按平倍赔率计算
					<br/><strong>翻倍：</strong>闲家与庄家翻倍博弈，派彩根据胜方牌型，按翻倍赔率计算
					<br/>比牌的牌值大小，见游戏规则中的说明
				</div>
				<div className="title">操作及下注指南:</div>
				<div className="rules">
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>游戏开始，荷官从牌靴中抽出头牌，以头牌的点数决定发牌顺序，<br/>并按照顺序发出每家5张牌，发完一家再发下一家。</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>荷官发牌同时玩家点击下注的筹码再点击桌上的任何一块投注区域 <br/>（闲1/2/3的"平倍"丶 "翻倍"， 庄胜闲1/2/3的"平倍"丶 "翻倍"）</span></div>						
					</li>
					<li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>玩家投注结束，荷官按照庄丶闲1丶闲2丶闲3的顺序开牌。</span></div>						
					</li>
                    <li className="r-bg clearfix">
						<div className="col-xs-3 num"><span>4</span></div>
						<div className="col-xs-9 des"><span>开牌结束决定输赢。</span></div>						
					</li>
				</div>
				<div className="niu_des3">注意：玩家在 "翻倍" 中下注时，该玩家的可用余额必须高于或等于下注额度的5倍，详细请看"注意事项"。</div>
				<div className="title">游戏玩法</div>				
				<div className="des">
					游戏使用扑克牌中52张牌（不含鬼牌），每局每家派发5张牌，先从5张牌中找出3张可成10或10的倍数组合，剩馀2张牌相加，如遇点数相加超过10点则减去10点，为该局之点数，与庄家比点数大小决定胜负。
				  <br/>
					<p>你有以下几种下注选择：	</p>	
					<p><strong>『闲一』：</strong>平倍丶翻倍。</p>
					<p><strong>『闲二』：</strong>平倍丶翻倍。</p>
					<p><strong>『闲三』：</strong>平倍丶翻倍。</p>	
					<p><strong>『庄一』：</strong>平倍丶翻倍。（注：庄赢闲一）</p>
					<p><strong>『庄二』：</strong>平倍丶翻倍。（注：庄赢闲二）</p>
					<p><strong>『庄三』：</strong>平倍丶翻倍。（注：庄赢闲三）</p>
					<p>注意：於"翻倍"中下注时, 玩家的馀额必须高於或等於投注额度的5倍 , 详情请看 '补充说明'</p>
					<p>
            <img src={ex2} className="img-responsive" alt='a'/>
            </p>
				</div>
				<div className="title">发牌顺序</div>				
				<div className="des clearfix">
					<span className="col-xs-12">1. 头牌：荷官每局开始会先开'头牌'，依据头牌点数(从庄家方位逆时针方向算起)决定开牌位置。</span>
          <br/>
					<span className="col-xs-12">
          <img src={ex1} className="img-responsive" alt='a'/>
          </span>
					<span className="col-xs-12"><br/>2. 根据头牌的点数(A=1点, 2 至 K = 2 至13点)，对4进行除余。</span>
				</div>
				<div className="niu_table clearfix">
					<span className="tniu">头牌</span>
					<span className="tniu">发牌顺序</span>
					<span className="cniu"><strong>A、5、9、K</strong></span>
					<span className="cniu">庄，闲1，闲2，闲3</span>
					<span className="cniu"><strong>2、6、10</strong></span>
					<span className="cniu">闲1，闲2，闲3，庄</span>
					<span className="cniu"><strong>3、7、J</strong></span>
					<span className="cniu">闲2，闲3，庄，闲1</span>
					<span className="cniu"><strong>4、8、Q</strong></span>
					<span className="cniu">闲3，庄，闲1，闲2</span>
					<span className="sub">按上方表列顺序，每家发5张再轮到下一家</span>
				</div>
				<div className="title">牌型</div>
				<div className="des clearfix">
					<strong>5公</strong>（5张J/Q/K） > <strong>牛牛</strong> > <strong>牛9</strong> > <strong>牛8</strong> > <strong>牛7</strong> > <strong>牛6</strong> > <strong>牛5</strong> > <strong>牛4</strong> > <strong>牛3</strong> > <strong>牛2</strong> > <strong>牛1</strong> > <strong>无牛</strong>
				</div>
				<div className="niu_table2 clearfix">
					<span className="cniu"><p className="txt1">5公 (5张 J、Q、K)</p></span>
					<span className="cniu"><div className="t-01"></div></span>
					<span className="cniu"><p className="txt2">由5张JQK组成</p></span>
					<span className="cniu"><p className="txt1">牛牛</p></span>
					<span className="cniu"><div className="t-02"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为10或20</p></span>
					<span className="cniu"><p className="txt1">牛9</p></span>
					<span className="cniu"><div className="t-03"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为9或19</p></span>
					<span className="cniu"><p className="txt1">牛8</p></span>
					<span className="cniu"><div className="t-04"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为8或18</p></span>
					<span className="cniu"><p className="txt1">牛7</p></span>
					<span className="cniu"><div className="t-05"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为7或17</p></span>
					<span className="cniu"><p className="txt1">牛6</p></span>
					<span className="cniu"><div className="t-06"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为6或16</p></span>
					<span className="cniu"><p className="txt1">牛5</p></span>
					<span className="cniu"><div className="t-07"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为5或15</p></span>
					<span className="cniu"><p className="txt1">牛4</p></span>
					<span className="cniu"><div className="t-08"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为4或14</p></span>
					<span className="cniu"><p className="txt1">牛3</p></span>
					<span className="cniu"><div className="t-09"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为3或13</p></span>
					<span className="cniu"><p className="txt1">牛2</p></span>
					<span className="cniu"><div className="t-10"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为2或12</p></span>
					<span className="cniu"><p className="txt1">牛1</p></span>
					<span className="cniu"><div className="t-11"></div></span>
					<span className="cniu"><p className="txt2">3张10的倍数组合，剩余2张相加为1或11</p></span>
					<span className="cniu"><p className="txt1">无牛</p></span>
					<span className="cniu"><div className="t-12"></div></span>
					<span className="cniu"><p className="txt2">五张牌中没有任意三张牌点数之和为10的整数倍。例如: 4、10、9、4、8。</p></span>					
				</div>
				<div className="title">大小比较</div>				
				<div className="des clearfix">每个闲家都与庄家比较大小确定输赢，在比较过程中，先比牌型，再比牌值，最后比较花色。</div>
				<div className="niu_table3 clearfix">
					<span className="tniu1">牌型</span>
					<span className="tniu2">说明</span>
					<span className="cniu"><strong>牌型</strong></span>
					<span className="cniu2"><strong>J、Q、K等于10点</strong>，<strong>A等于1点</strong>，其余依据牌面显示点数；  <br/><strong>5公</strong>(5张J、Q、K) > <strong>牛牛</strong> > <strong>牛9</strong> > <strong>牛8</strong> > <strong>牛7</strong> > <strong>牛6</strong> > <strong>牛5</strong> > <strong>牛4</strong> > <strong>牛3</strong> > <strong>牛2</strong> > <strong>牛1</strong> > <strong>无牛</strong></span>
					<span className="cniu"><strong>牌值大小<br/>点数大小</strong></span>
					<span className="cniu2"><strong>K</strong> > <strong>Q</strong> > <strong>J</strong> > <strong>10</strong> > <strong>9</strong> > <strong>8</strong> > <strong>7</strong> > <strong>6</strong> > <strong>5</strong> > <strong>4</strong> > <strong>3</strong> > <strong>2</strong> > <strong>A</strong><br/><strong>13</strong> > <strong>12</strong> > <strong>11</strong> > <strong>10</strong> > <strong>9</strong> > <strong>8</strong> > <strong>7</strong> > <strong>6</strong> > <strong>5</strong> > <strong>4</strong> > <strong>3</strong> > <strong>2</strong> > <strong>1</strong>	</span>
					<span className="cniu"><strong>花色大小</strong></span>
					<span className="cniu2">
						<p className="name">黑桃</p>
						<p className="ico01"></p>
						<p className="arrow2">></p>
						<p className="name">红桃</p>
						<p className="ico02"></p>
						<p className="arrow2">></p>
						<p className="name">梅花</p>
						<p className="ico03"></p>
						<p className="arrow2">></p>
						<p className="name">方块</p>
						<p className="ico04"></p>
					</span>
					<span className="sub">庄闲同为牛8，则从双方最大的牌开始比较；最大的牌同为K，则继续比较花色示例中，闲1黑桃K＞庄梅花K，闲1赢</span>
				</div>
				<div className="title">派彩赔率</div>
				<div className="des clearfix">3家闲的派彩赔率相同</div>
				<div className="niu_table2 clearfix">
					<span className="tniu2">闲(庄)家赢赔率</span>
					<span className="cniu2"><strong>闲(庄)家牌型</strong></span>
					<span className="cniu2"><strong>翻倍赔率</strong></span>
					<span className="cniu2"><strong>平倍赔率</strong></span>
					<span className="cniu2">5公</span>
					<span className="cniu2"><strong>1 : 4.75</strong></span>
					<span className="cniu2"><strong>1 : 0.95</strong></span>
					<span className="cniu2">牛牛</span>
					<span className="cniu2"><strong>1 : 2.85</strong></span>
					<span className="cniu2"><strong>1 : 0.95</strong></span>
					<span className="cniu2">牛9 - 牛7</span>
					<span className="cniu2"><strong>1 : 1.90</strong></span>
					<span className="cniu2"><strong>1 : 0.95</strong></span>
					<span className="cniu2">一般牌型</span>
					<span className="cniu2"><strong>1 : 0.95</strong></span>
					<span className="cniu2"><strong>1 : 0.95</strong></span>
				</div>
				<div className="niu_table2 clearfix">
					<span className="tniu2">闲(庄)家输赔率</span>
					<span className="cniu2"><strong>庄(闲)家牌型</strong></span>
					<span className="cniu2"><strong>翻倍赔率</strong></span>
					<span className="cniu2"><strong>平倍赔率</strong></span>
					<span className="cniu2">5公</span>
					<span className="cniu2"><strong>1 : 5</strong></span>
					<span className="cniu2"><strong>1 : 1</strong></span>
					<span className="cniu2">牛牛</span>
					<span className="cniu2"><strong>1 : 3</strong></span>
					<span className="cniu2"><strong>1 : 1</strong></span>
					<span className="cniu2">牛9 - 牛7</span>
					<span className="cniu2"><strong>1 : 2</strong></span>
					<span className="cniu2"><strong>1 : 1</strong></span>
					<span className="cniu2">一般牌型</span>
					<span className="cniu2"><strong>1 : 1</strong></span>
					<span className="cniu2"><strong>1 : 1</strong></span>
				</div>
				<div className="title">补充说明</div>
				<div className="des clearfix">
					玩家在 "翻倍” 中下注时，该玩家的可用余额必须高于或等于下注额度的5倍，在 "平倍" 中下注时没有此限制。 
					<br/>"翻倍" 投注与派彩举例：
				</div>
				
				<div className="niu_table clearfix">
					<span className="tniu2">例1</span>
					<span className="cniu2">押注对像</span>
					<span className="cniu3">闲1</span>
					<span className="cniu2">投注玩法</span>
					<span className="cniu3">翻倍</span>
					<span className="cniu2">投注额度</span>
					<span className="cniu3">扣除500（游戏投注区显示"100（预400）"）</span>
					<span className="c4">比牌结果</span>
					<span className="c5">
						<aside className="col-lg-6 col-xs-12">
							<figure>庄家牌：牛7</figure>
							<figcaption><div className="m-03"></div></figcaption>
						</aside>
						<aside className="col-lg-6 col-xs-12">
							<figure>闲1牌：牛5</figure>
							<figcaption><div className="m-02"></div></figcaption>							
						</aside>
					</span>
					<span className="cniu2">派彩</span>
					<span className="cniu3">退回300（庄家牌牛7，闲家输赔率为2倍，闲1输100x2=200）</span>					
				</div>
				<div className="niu_table clearfix">
					<span className="tniu2">例2</span>
					<span className="cniu2">押注对像</span>
					<span className="cniu3">闲1</span>
					<span className="cniu2">投注玩法</span>
					<span className="cniu3">翻倍</span>
					<span className="cniu2">投注额度</span>
					<span className="cniu3">扣除500（游戏投注区显示"100（预400）"）</span>
					<span className="c4">比牌结果</span>
					<span className="c5">
						<aside className="col-lg-6 col-xs-12">
							<figure>庄家牌：牛5</figure>
							<figcaption><div className="m-02"></div></figcaption>
						</aside>
						<aside className="col-lg-6 col-xs-12">
							<figure>闲1牌：牛8</figure>
							<figcaption><div className="m-01"></div></figcaption>							
						</aside>
					</span>					
					<span className="cniu2">派彩</span>
					<span className="cniu3">690（闲家牛8赢的赔率为1.90，加上扣除的500，共690）</span>					
				</div>
				<div className="des2 clearfix">
				<strong>1. </strong>桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。
				<br/><strong>2. </strong>如遇结算错误，按照当期视频结果重新结算。</div>				
			</div>
    </div>
  )
}

export default NiuNiu
