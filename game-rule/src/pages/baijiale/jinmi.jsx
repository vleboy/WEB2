import React from 'react'
const Jinmi=()=>{
    return(
        <div>
            <div className="banner clearfix">
				<li className="title">竞咪百家乐</li>
				<li className="des">BID Baccarat</li>
				<li className="bar"></li>
				<li className="intro">首创<strong>竞咪互动百家乐</strong>新玩法，<strong>投注额最高者享咪牌权利</strong>，牌桌上会清楚显示<strong>所有筹码</strong>，玩家拥有置身於实体赌场一样的真实座位体验。<br/><br/><strong>"等我"</strong>功能让您掌控牌局节奏；玩家可以<strong>即时和俏丽主播互动</strong>，边聊天边下注，创造实地赌场无可比拟的升级体验。</li>
				<li className="cap"></li>
			</div>
			<div className="content clearfix">
				<div className="title">下注模式:</div>
				<div className="des">
					<li className="col-lg-6 col-xs-12">
						<p className="ex1"></p>
						<p><strong>1.</strong> 竞咪（LED）百家乐有 <strong>旁观下注</strong> <br/>和 <strong>进桌下注</strong> 两种方式；</p>
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="ex2"></p>
						<p><strong>2.</strong> 当桌台为空<strong>（人数为0）</strong>时，玩家只能选择 <strong>进桌下注</strong> 进桌下注有最低VIP 额度, 低于此额度的只能选择 <strong>旁注</strong>；</p>
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="ex3"></p>
						<p><strong>3.</strong> 当桌台人数已满<strong>（7人）</strong>时，玩家只能选择<strong>旁观下注</strong><br/>旁观下注玩家所在桌台。</p>
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="ex4"></p>
						<p><strong>4.</strong> 其他情况玩家可以自由选择<br/> <strong>旁注</strong> 或者  <strong>进桌下注</strong></p>
					</li>
				</div>
				
				<div className="title">下注限红:</div>
				<div className="des2">
					<li className="col-lg-6 col-xs-12">
						<p className="ex5"></p>
						<p><strong>进桌下注：</strong>下注限红是游戏桌台定义的限红，不受个人限红的限制；</p>
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="ex6"></p>
						<p><strong>旁注：</strong>下注限红是玩家的个人限红与对应不同玩法限红的交集</p>
					</li>					
				</div>				
				
				<div className="title">咪牌:</div>
				<div className="des3">
					<p>
                        {/* <img src="images/b3/t6.jpg" className="img-responsive"/> */}
                    </p>			
					<p><strong>1.</strong>  只有<strong>"进桌下注"</strong>的玩家才有咪牌资格；</p>
					<p><strong>2.</strong> 不同玩家下注<strong>庄/闲</strong>，下注金额多的玩家获得对应庄/闲的咪牌资格；</p>
					<p><strong>3.</strong> 不同玩家下注<strong>庄/闲</strong>相同的金额，先下注成功的玩家拥有咪庄/闲家牌的资格；</p>
					<p><strong>4.</strong> 同一玩家，如果一局中下注庄和闲的金额一样，那么默认该玩家咪闲家牌；<strong>（前提：其他玩家没有下注庄/闲，或者下注金额没有高于这一玩家）</strong></p>
				</div>
				<div className="title">其他功能:</div>
				<div className="table clearfix">
					<li className="col-xs-3"><span>等我</span></li>
					<li className="col-lg-3 col-xs-3"><span><div className="t1"></div></span></li>
					<li className="col-xs-6"><span>在下注倒计时内，玩家可以点击“等我”按键，请求荷官延长下注时间；</span></li>
					
					<li className="col-xs-3"><span>开牌</span></li>
					<li className="col-lg-3 col-xs-3"><span><div className="t2"></div></span></li>
					<li className="col-xs-6">
						<span>
							<p><strong>1.</strong>  只有进座下注的玩家才有开牌的权限;</p>
							<p><strong>2.</strong>  当玩家点击"开牌"申请荷官开牌时,荷官会根据桌面上玩家投注情况决定是否直接开牌或提示其他玩家继续下注;</p>
						</span>
					</li>					
					<li className="col-xs-3"><span>打赏</span></li>
					<li className="col-lg-3 col-xs-3"><span><div className="t3"></div></span></li>
					<li className="col-xs-6"><span>玩家随时可给予自己最喜爱的主播小费，奖励主播的热情服务及章显出客人的身份</span></li>
					
					<li className="col-xs-3"><span>与主播进行聊天</span></li>
					<li className="col-lg-3 col-xs-3"><span><div className="t4"></div></span></li>
					<li className="col-xs-6">
						<span>
							<p><strong>1.</strong>  左边的是主播照片</p>
							<p><strong>2.</strong>  右边的是发牌荷官照片</p>
							<p><strong>3.</strong>  下面显示的是主播语言</p>							
						</span>
					</li>
				</div>
				<div className="title">如何与主播进行文字讯息聊天:</div>
				<div className="des">
					<li className="col-xs-12">
						<p className="c1"></p>
						<p><strong>1.</strong> 聊天区设于游戏画面的右下</p>
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="c2"></p>
						<p><strong>2.</strong> 按(
                            {/* <img src="images/b3/sm_icon.jpg"> */}
                            ) 备有多款表情符号，让聊天增加乐趣。</p>
					</li>
					<li className="col-lg-6 col-xs-12">
						<p className="c3"></p>
						<p><strong>3.</strong> 或者按（
                        {/* <img src="images/b3/arrow_icon.jpg"> */}
                        ）可直接使用预设快捷聊天语句。</p>
					</li>
				</div>
			</div>
			<div className="content clearfix">				
				<div className="title">注意事项:</div>				
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

export default Jinmi