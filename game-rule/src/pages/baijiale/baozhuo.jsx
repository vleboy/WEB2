import React from 'react'
const Baozhuo = () => {
    return (
        <div>
            <div className="banner baozhuo clearfix">
                <li className="title">包桌百家乐</li>
                <li className="des">VIP Baccarat</li>
                <li className="baozhuo_bar"></li>
                <li className="intro"><strong>包桌</strong>後可自行<strong>控制游戏节奏</strong>，尽享<strong>更换荷官</strong>丶<strong>飞牌</strong>及<strong>换靴</strong>等优越功能 成就更高级及自主的娱乐享受。</li>
                <li className="cap baozhuo_cap"></li>
            </div>
            <div className="content clearfix">
                <div className="baozhuo_title">下注模式:</div>
                <div className="des baozhuo_des1 row">
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo1"></p>
                        <p><strong>1.</strong> 包桌百家乐有旁注，进桌下注进入包桌三种方式；</p>
                    </li>
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo2"></p>
                        <p><strong>2.</strong> 当桌台没玩家，人数为0时<br/>玩家只能选择进入包桌成为桌主。</p>
                    </li>
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo3"></p>
                        <p><strong>3.</strong> 当桌台人数已满（7人）时<br/>玩家只能选择旁注。</p>
                    </li>
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo4"></p>
                        <p><strong>4.</strong> 当桌台还有座位时<br/>玩家可以选择进桌下注或者旁注。</p>
                    </li>
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo5"></p>
                        <p><strong>5.</strong> 若包桌桌主退出游戏厅<br/>其他玩家也会自动退出。</p>
                    </li>						
                </div>
                
                <div className="baozhuo_title">下注限红:</div>
                <div className="des2 row">
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo6"></p>
                        <p><strong>进入包桌</strong>/<strong>进桌下注</strong>：下注限红是游戏桌台定义的限红<br/>不受个人限红的限制。</p>
                    </li>
                    <li className="col-lg-6 col-xs-12">
                        <p className="baozhuo7"></p>
                        <p><strong>旁注</strong>：下注限红是玩家的个人限红<br/>与对应不同玩法限红的交集；</p>
                    </li>					
                </div>				
                
                <div className="baozhuo_title">桌主的特别权限:</div>				
                <div className="baozhuo_table clearfix">
                    <li className="col-xs-3"><span>翻牌</span></li>
                    <li className="col-xs-3"><div className="t1"></div></li>
                    <li className="col-xs-6"><span>在庄/闲下注之后，可以直接翻开庄或者闲家牌；</span></li>
                    
                    <li className="col-xs-3"><span>飞牌</span></li>
                    <li className="col-xs-3"><div className="t2"></div></li>
                    <li className="col-xs-6"><span>未下注的情况下直接开牌;</span></li>
                    
                    <li className="col-xs-3"><span>设定包桌</span></li>
                    <li className="col-xs-3"><div className="t3"></div></li>
                    <li className="col-xs-6"><span>包桌玩家可以设置"是否咪牌","是否竖向咪牌" 以及"是否设置密码"；</span></li>
                    
                    <li className="col-xs-3"><span>更换荷官</span></li>
                    <li className="col-xs-3"><div className="t4"></div></li>
                    <li className="col-xs-6"><span>更换当前荷官；</span></li>
                    
                    <li className="col-xs-3"><span>更换牌靴</span></li>
                    <li className="col-xs-3"><div className="t5"></div></li>
                    <li className="col-xs-6"><span>若该靴满30局，玩家可以选择换靴；</span></li>
                </div>	
                <div className="baozhuo_title">注意事项:</div>				
                <div className="baozhuo_des">
                    <p><strong>1.</strong> 当每一靴牌进入<strong>第31局或以后</strong>，玩家将不得投注大小。</p>
                    <p><strong>2.</strong> 桌台限红是本游戏桌台主要玩法的最小丶最大玩法限红。玩家在每个玩法的可押注限额是玩法限红与玩家个人限红的交集。如需调节个人限红，请联系网站客服。</p>
                    <p><strong>3.</strong> 荷官发牌时，偶有系统无法判读状况时，此时荷官将重新扫描，直到系统能够完整判读(如遇故障因素将注销所有相关注单/派彩)。</p>
                    <p><strong>4.</strong> 如遇结算错误，按照当期视频结果重新结算。</p>
                </div>
            </div>
        </div>
    )
}
export default Baozhuo