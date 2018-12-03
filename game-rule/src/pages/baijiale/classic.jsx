import React from 'react'
import noComm from '../../imgs/nocomm.jpg'
const Classic = () => {
    return (
     <div>
                 <div className="banner clearfix">
                    <li className="title">传统百家乐</li>
                    <li className="des">Classic Baccarat</li>
                    <li className="bar"></li>
                    <li className="intro">除了深受玩家欢迎的<strong>传统百家乐</strong>外，<strong>Asia Gaming</strong>更设有极速百家乐及多台百家乐，给予玩家一种置身实地赌场的真实快感，保证让您享受实时而公平的游戏体验。</li>
                    <li className="cap"></li>
                </div>
                <div className="content clearfix">
                    <div className="title">如何胜出:</div>
                    <div className="des">百家乐中将发两份牌<strong>{'<<庄家>>'}</strong> 和 <strong>{'<<闲家>>'}</strong>，总数得9点或最接近9点的一家胜出。</div>
                    <div className="title">操作及下注指南:</div>
                    <div className="rules">
                        <li className="r-bg ">
                            <div className="col-xs-3 num"><span>1</span></div>
                            <div className="col-xs-9 des"><span>点击下注的筹码<br/>再点击桌上任意投注区下注</span></div>						
                        </li>
                        <li className="r-bg ">
                            <div className="col-xs-3 num"><span>2</span></div>
                            <div className="col-xs-9 des"><span><strong>闲家和庄家</strong>将获发两张牌加起来等于<strong>10作0点</strong>，总和<strong>超过9</strong>则只算总数中的个位。</span></div>						
                        </li>
                        <li className="r-bg ">
                            <div className="col-xs-3 num"><span>3</span></div>
                            <div className="col-xs-9 des"><span>任何一家拿到<strong>8点或9点（天生赢家）</strong>牌局就算结束不再补牌。</span></div>						
                        </li>
                        <li className="r-bg ">
                            <div className="col-xs-3 num"><span>4</span></div>
                            <div className="col-xs-9 des"><span>派出两张牌后如果任何一手牌的头两张牌的牌面为0至6将依照补牌规则多发一张牌，不可以任选补牌。</span></div>						
                        </li>
                        <li className="r-bg ">
                            <div className="col-xs-3 num"><span>5</span></div>
                            <div className="col-xs-9 des"><span>没有任何一手牌获得超过三张牌。</span></div>						
                        </li>					
                    </div>			
    
                    <div className="title">游戏玩法:</div>
                    <div className="des">本游戏采用8副牌<strong>（每副牌52张）</strong>来进行，游戏牌数合计<strong>416张</strong>。<strong>"闲家""庄家"</strong>各先派两张牌，以"闲家"先发，如第一轮未分出胜负需再按"牌例"发第二轮的牌，每方最多再发1张牌，谁最接近9点即为胜方，而相同点数即和局</div>
                    <div className="title">游戏规则:</div>
                    <div className="sub-title">1. 点数计算</div>
                    <div className="sub-content">
                        <li>2 至 9</li>
                        <li><p className="ex1"></p></li>
                        <li>点数: 根据其数值显示的点数</li>
                    </div>
                    <div className="sub-content">
                        <li>Ace</li>
                        <li><p className="ex2"></p></li>
                        <li>点数: 1</li>
                    </div>
                    <div className="sub-content">
                        <li>K或Q或J或10</li>
                        <li><p className="ex3"></p></li>
                        <li>点数: 0</li>					
                    </div>
                    <div className="des">*当任何一家头两张牌的点数总和为8或9，就称为(天生赢家)。<br/>*派出两张牌后，如果需要补牌，将依照博牌规则向需要补牌方多发一张牌</div>
                    <div className="sub-content">
                        <li>例子:</li>
                        <li><p className="ex4"></p></li>
                        {/* <li><p className="ex5"></p></li>				
                        <li><p className="ex6"></p></li> */}
                    </div>				
                    <div className="sub-title">2. 博牌规则</div>
                    <div className="table clearfix">
                        <li className="col-xs-2 t-title"><span>闲两牌<br/>合计点数</span></li>
                        <li className="col-xs-2 t-title"><span>(闲家)</span></li>
                        <li className="col-xs-2 t-title"><span>庄两牌<br/>合计点数</span></li>
                        <li className="col-xs-6 t-title"><span>(庄家)</span></li>
                        <li className="col-xs-2"><span>0</span></li>
                        <li className="col-xs-2"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>0</span></li>
                        <li className="col-xs-6"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>1</span></li>
                        <li className="col-xs-2"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>1</span></li>
                        <li className="col-xs-6"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>2</span></li>
                        <li className="col-xs-2"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>2</span></li>
                        <li className="col-xs-6"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>3</span></li>
                        <li className="col-xs-2"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>3</span></li>
                        <li className="col-xs-6"><span>若闲家博得第三张牌是8点，庄家不得博牌</span></li>
                        <li className="col-xs-2"><span>4</span></li>
                        <li className="col-xs-2"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>4</span></li>
                        <li className="col-xs-6"><span>若闲家博得第三张牌是0，1，8，9点， 庄家不得博牌</span></li>
                        <li className="col-xs-2"><span>5</span></li>
                        <li className="col-xs-2"><span>必须博牌</span></li>
                        <li className="col-xs-2"><span>5</span></li>
                        <li className="col-xs-6"><span>若闲家博得第三张牌是0，1，2，3，8，9点， 庄家不得博牌</span></li>
                        <li className="col-xs-2"><span>6</span></li>
                        <li className="col-xs-2"><span>不得博牌</span></li>
                        <li className="col-xs-2"><span>6</span></li>
                        <li className="col-xs-6"><span>若闲家博得第三张牌是6 或 7点，庄家必须博牌</span></li>
                        <li className="col-xs-2"><span>7</span></li>
                        <li className="col-xs-2"><span>不得博牌</span></li>
                        <li className="col-xs-2"><span>7</span></li>
                        <li className="col-xs-6"><span>不得博牌</span></li>
                        <li className="col-xs-2"><span>8</span></li>
                        <li className="col-xs-2"><span>例牌，即定胜负</span></li>
                        <li className="col-xs-2"><span>8</span></li>
                        <li className="col-xs-6"><span>例牌，即定胜负</span></li>
                        <li className="col-xs-2"><span>9</span></li>
                        <li className="col-xs-2"><span>例牌，即定胜负</span></li>
                        <li className="col-xs-2"><span>9</span></li>
                        <li className="col-xs-6"><span>例牌，即定胜负</span></li>
                    </div>
                    <div className="title">派彩赔率:</div>				
                    <div className="des">本游戏为玩家提供百家乐玩法和免佣百家乐玩法。这两种玩法的博牌规则一致，但投注庄的派彩方式有区别。其投注种类与派彩分别如下∶</div>
                    <div className="sub-title">百家乐:</div>
                    <div className="table2 clearfix">
                        <li className="col-xs-6 t-title2"><span>投注项目</span></li>
                        <li className="col-xs-6 t-title2"><span>赔率</span></li>
                        <li className="col-xs-6"><span>闲家</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：1 (开和局时退回下注金额)</span></li>
                        <li className="col-xs-6"><span>庄家</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：0.95 (开和局时退回下注金额)</span></li>
                        <li className="col-xs-6"><span>和局</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：8</span></li>
                        <li className="col-xs-6"><span>闲对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：11</span></li>
                        <li className="col-xs-6"><span>庄对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：11</span></li>
                        <li className="col-xs-6"><span>大</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：0.5</span></li>
                        <li className="col-xs-6"><span>小</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：1.5</span></li>
                        <li className="col-xs-6"><span>任意对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：5</span></li>
                        <li className="col-xs-6"><span>完美对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：25</span></li>
                    </div>
                    
                    <div className="sub-title">免佣百家乐:</div>
                    <div className="table2 clearfix">
                        <li className="col-xs-6 t-title"><span>投注项目</span></li>
                        <li className="col-xs-6 t-title"><span>赔率</span></li>
                        
                        <li className="col-xs-6"><span>闲家</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：1 (开和局时退回下注金额)</span></li>
                        
                        <li className="col-xs-6"><span>庄家</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：1 (如庄以6点取胜，则赔一半；开和局时退回下注金额)</span></li>
                        
                        <li className="col-xs-6"><span>和局</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：8</span></li>
                        
                        <li className="col-xs-6"><span>闲对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：11</span></li>
                        
                        <li className="col-xs-6"><span>庄对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：11</span></li>
                        
                        <li className="col-xs-6"><span>大</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：0.5</span></li>
    
                        <li className="col-xs-6"><span>小</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：1.5</span></li>
                        
                        <li className="col-xs-6"><span>超级六</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：12</span></li>
                        
                        <li className="col-xs-6"><span>任意对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：5</span></li>
                        
                        <li className="col-xs-6"><span>完美对子</span></li>
                        <li className="col-xs-6"><span className="yellow">1 ：25</span></li>
                        
                    </div>				
    
                    <div className="des2"><strong>大小、庄/闲对子</strong></div>
                    <div className="des2"><strong>1.</strong> <strong>大小</strong> ： 指根据当局所开之牌张数的总和为依据，<strong>4张牌为小，5张牌或6张牌为大</strong>。游戏中，若庄家及闲家各只发两张牌，合共4张牌，即押注<strong>“小”者为胜</strong>。相反，若庄、闲任一方有博牌，令总牌数为5或6张，即押注<strong>“大”者为胜</strong>。</div>
                    <div className="des2"><strong>2.</strong> <strong>庄/闲对子</strong> ： 指根据当局所开之牌的<strong>庄/闲前两张牌的牌面</strong>（数字或字母，不计花式）为依据，牌面相同为对子。游戏中，庄家前两张牌的牌面相同，为庄对子，即押注<strong>“庄对”</strong>者为胜。闲家前两张牌牌面相同，为闲对子，即押注<strong>“闲对”</strong>者为胜。</div>
                    <div className="des2"><strong>3.</strong> <strong>任意对子</strong> ： 指庄或闲的前两张牌的牌面(数字或英文字母，不计花式)为依据，游戏中，无论结果是庄对或闲对，即押注<strong>“任意对子”</strong>者为胜。</div>
                    <div className="des2"><strong>4.</strong> <strong>完美对子</strong> ： 指庄或闲的前两张牌的牌面，必须同花同色同数字或同英文字母为依据，游戏中，庄或闲家前两张牌的符合要求，即押注<strong>“完美对子”</strong>者为胜。</div>
                    <div className="des2"><strong>5.</strong> 完美对子及任意对子则随时开放。</div>
                    <div className="des2"><strong>6.</strong> <strong>超级六</strong> ： <br/>6.1 只限免佣时启动 
                    <img src={noComm} alt='oops'/>
                    <br/>6.2 庄家点数为 6 而且赢闲家。 </div>				
                    <div className="des2"><strong>7.</strong> 如玩家於超级6 和闲同时投注，不会视为对冲投注。 </div>			
                    <div className="des2"><strong>8.</strong> 起手牌: 即庄家及闲家的最初 2 张牌。</div>
                    <div className="title">注意事项:</div>				
                    <div className="des2">
                        <p><strong>1.</strong> 当每一靴牌进入<strong>第31局或以后</strong>，玩家将不得投注大小。</p>
                        <p><strong>2.</strong> 桌台限红是本游戏桌台主要玩法的最小、最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
                        <p><strong>3.</strong> 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫瞄，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
                        <p><strong>4.</strong> 如遇结算错误，按照当期视频结果重新结算。</p>
                        <p><strong>5.</strong> “超级六”仅开放于免佣百家乐，只有开启免佣，超级六投注区才生效。</p>
                    </div>
                </div>
     </div>
    )
  }
  
  export default Classic
  