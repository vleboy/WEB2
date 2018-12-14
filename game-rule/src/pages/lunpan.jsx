import React from 'react'
const Lunpan =()=>{
    return(
        <div>
        <div className="lun_banner clearfix">
				<li className="title">轮盘</li>
				<li className="des">Roulette</li>
				<li className="lun_bar"></li>
				<li className="lun_intro"><strong>AG</strong>拥有画面最逼真的<strong>真人轮盘游戏</strong>。透过实时传递的现场画面，加上令人目不暇给的轮盘丶荷官熟练而专业的技巧，都为玩家缔造一个公平公正的博彩游戏。本游戏是采用国际标准的单零轮盘，单零轮盘上共有37 个细长沟道。其中一个绿色沟道的数字编号为0，另外36个沟道分别编号为1 至36，一半是红色一半是黑色。 玩家可以买单一数字或赌桌上的数字组合。</li>
				<li className="lun_cap"></li>
			</div>
			<div className="lun_content clearfix">
				<div className="lun_title">如何胜出:</div>
				<div className="des">下注结束后，荷官会把轮盘向一个方向转动，然后把象牙制滚球抛到轮盘的外侧，让滚球在轮盘内转动多周后慢慢停下来，并降落在其中一个细沟内为该局结果。</div>
				<div className="lun_title">操作及下注指南:</div>
				<div className="rules">
					<li className="pan-bg clearfix">
						<div className="col-xs-3 num"><span>1</span></div>
						<div className="col-xs-9 des"><span>开始新局后，即开始下注倒数计时，请玩家<br/>在桌面不同的方格内或方格的边界上押放筹码。</span></div>						
					</li>
					<li className="pan-bg clearfix">
						<div className="col-xs-3 num"><span>2</span></div>
						<div className="col-xs-9 des"><span>倒数结束前由荷官<br/>转动轮盘并抛出滚球。</span></div>						
					</li>
					<li className="pan-bg clearfix">
						<div className="col-xs-3 num"><span>3</span></div>
						<div className="col-xs-9 des"><span>由荷官输入结果数字<br/>同时玩家画面显示结果。</span></div>						
					</li>					
				</div>
			</div>
			<div className="lun_content clearfix">			
				<div className="lun_title">游戏规则:</div>
				<div className="des">筹码放在划有不同投注项目的方格的赌桌上<br/>你可以下注在任何的方格，但要在下注时限之内押注。</div>
				
				<div className="lun_title">派彩赔率:</div>
				<div className="des">轮盘的投注方式有 12个种类，各项投注类型与派彩赔率如下:</div>
				
				<div className="lun_table clearfix">
					<li className="col-xs-2 t-title"><span>投注项目</span></li>
					<li className="col-xs-2 t-title"><span>赔率</span></li>					
					<li className="col-xs-8 t-title"><span>说明</span></li>
					
					<li className="col-xs-2"><span>直接注</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：35</span></li>
					<li className="col-xs-8"><span>1个号码<br/>（投注包括 0在内的任意一个数位。下注时将筹码放到那个数位的中心）</span></li>					

					<li className="col-xs-2"><span>分注</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：17</span></li>
					<li className="col-xs-8"><span>2个号码<br/>（投注于两个号码之间的格线上 。如2和3）</span></li>					

					<li className="col-xs-2"><span>街注</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：11</span></li>
					<li className="col-xs-8"><span>3个一行的数<br/>（投注三个号码。将筹码押在轮盘桌上有三个数位那一行右侧的那条边线上）</span></li>					
					
					<li className="col-xs-2"><span>三数</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：11</span></li>
					<li className="col-xs-8"><span>0,1,2（投注于 0, 1, 2交接区域）或0,2,3（投注于0, 2, 3的交接区域）</span></li>					

					<li className="col-xs-2"><span>角注</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：8</span></li>
					<li className="col-xs-8"><span>4个数交叉（将筹码放到四个数位方框交叉的那个角区）</span></li>					

					<li className="col-xs-2"><span>四个号码</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：8</span></li>
					<li className="col-xs-8"><span>0,1,2,3（将筹码放到 0和3交线的右侧以下注数位 0, 1, 2 和3）</span></li>					
					
					<li className="col-xs-2"><span>线注</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：5</span></li>
					<li className="col-xs-8"><span>两行相交的顶部<br/>（将筹码下注到两行相交的最顶部的交点处（虚拟桌右侧），6个数字）</span></li>					
					
					<li className="col-xs-2"><span>列注</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：2</span></li>
					<li className="col-xs-8"><span>每列12个号码<br/>（桌上每列数位底部都有带‘第*列 ' 字样的方框，12个号码，不含零）</span></li>					

					<li className="col-xs-2"><span>下注一打</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：2</span></li>
					<li className="col-xs-8"><span>将筹码下到有 "第一打"，"第二打"和"第三打"字样的赌区以同时下注 12个数位。 (分别为1-12丶13-24及25-36)</span></li>					
					
					<li className="col-xs-2"><span>红色/黑色</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：1</span></li>
					<li className="col-xs-8"><span>投注开奖号码为红色或黑色。若开0则通杀</span></li>					

					<li className="col-xs-2"><span>双数/单数</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：1</span></li>
					<li className="col-xs-8"><span>投注开奖号码为单数或双数。若开0则通杀</span></li>					

					<li className="col-xs-2"><span>大/小</span></li>
					<li className="col-xs-2"><span className="yellow">1 ：1</span></li>
					<li className="col-xs-8"><span>小（1-18）；大（19-36）；若开0则通杀</span></li>					
				</div>
				
				<div className="lun_title">我的投注:</div>
				<div className="des2" style={{textAlign:'center'}}>玩家可保存4个最喜欢的投注方式并在赌桌上一键投注。</div>
				<div className="clearfix">
					<div className="rules">
						<li className="pan-bg clearfix">
							<div className="col-xs-3 num"><span>1</span></div>
							<div className="col-xs-9 des"><span>保存“我的投注” 先在桌上投注，然后点选“我的投注”来打开相应的面版。点选添加，并输入投注方式的名称。</span></div>
						</li>
						<li className="pan-bg clearfix">
							<div className="col-xs-3 num"><span>2</span></div>
							<div className="col-xs-9 des"><span>使用“我的投注” 先按 '我的投注' 点击您已保存的投注。</span></div>
						</li>
						<li className="pan-bg clearfix">
							<div className="col-xs-3 num"><span>3</span></div>
							<div className="col-xs-9 des"><span>编辑“我的投注” 名称  按 '修改' 图标。</span></div>
						</li>
						<li className="pan-bg clearfix">
							<div className="col-xs-3 num"><span>4</span></div>
							<div className="col-xs-9 des"><span>删除“我的投注” 按 '删除' 删除已保存的投注方式。</span></div>
						</li>
						<li className="pan-bg clearfix">
							<div className="col-xs-3 num"><span>5</span></div>
							<div className="col-xs-9 des"><span>关闭“我的投注”面版，按 'X' 图标。</span></div>
						</li>						
					</div>
				</div>
				
				<div className="lun_title">邻注:</div>
				<div className="lun_des2">投注法式轮盘上该号码及左邻与右邻各2个的号码。例如：点选法式投注数字 7 ，则投注号码为：18, 29, 7, 28, 12。</div>				
				
				<div className="lun_title">法式下注:</div>
				<div className="lun_des2">
					<li><strong>法式下注：</strong>以椭圆形画出轮盘上的分区（号码丶颜色），而后根据玩法不同分隔为4个分区（轮盘下角注丶轮上孤注丶零旁注上角丶轮上零旁），法式下注提供5种投注种类</li>
					<li><strong>投注方式：</strong>使用筹码点击“法式下注”的椭圆形轮盘对应的玩法，轮盘投注桌上显示每个玩法投注的筹码，点击确定时将所选玩法提交下单。</li>
				</div>				
					
				<div className="lun_table clearfix">
					<li className="col-xs-2 t-title"><span>投注种类</span></li>
					<li className="col-xs-2 t-title"><span>注数</span></li>					
					<li className="col-xs-8 t-title"><span>投注号位</span></li>
					
					<li className="col-xs-2"><span>轮上零旁</span></li>
					<li className="col-xs-2"><span>4</span></li>					
					<li className="col-xs-8"><span>0/3；12/15；32/35；26</span></li>

					<li className="col-xs-2"><span>零旁注上角</span></li>
					<li className="col-xs-2"><span>9</span></li>					
					<li className="col-xs-8"><span>4/7；12/15；18/21；19/22；32/35 ---- <strong>一注</strong><br/>0/2/3 --- <strong>两注</strong><br/>25/26/28/29 ---- <strong>两注</strong></span></li>

					<li className="col-xs-2"><span>轮上孤注</span></li>
					<li className="col-xs-2"><span>5</span></li>					
					<li className="col-xs-8"><span>6/9；14/17；17/20；31/34；1</span></li>
					
					<li className="col-xs-2"><span>轮盘下角注</span></li>
					<li className="col-xs-2"><span>6</span></li>					
					<li className="col-xs-8"><span>5/8；10/11；13/16；23/24；27/30；33/36</span></li>

					<li className="col-xs-2"><span>相邻投注</span></li>
					<li className="col-xs-2"><span>5</span></li>					
					<li className="col-xs-8"><span>投注轮盘上该号码及左邻与右邻各两个号码（一共5个号码）。 例如：选中18，则投注号码为：7；9；22；18；29；</span></li>				
			
				</div>
			</div>
        </div>
    )
}
export default Lunpan