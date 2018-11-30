import React from 'react'
const Pailu=()=>{
    return (
        <div>
            <div className="banner clearfix">
				<li className="title">牌路介绍</li>
				<li className="des">Road Map</li>
				<li className="bar"></li>
				<li className="intro"><strong>「路」</strong>的意思，是百家乐开牌的结果记录。</li>
			</div>
			<div className="content clearfix">
				<div className="title">
					<p>牌路介绍:</p>
					<p>
                        {/* <img src="images/b6/ex1.jpg" className="img-responsive"> */}
                        </p>
				</div>
				<div className="sub-title">1. 开牌结果的纪录</div>
				<div className="des2">红色珠为庄，蓝色珠为闲, 绿色珠为和，红点在珠的左上角代表庄对，蓝点在珠的右下角代表闲对，如果同时出现庄对和闲对，<span id="result_box" lang="zh-CN"><span title="則珠的左上角">则珠的左上角</span></span>和右下角标示红点和蓝点。</div>
				<div className="sub-title">2. 大路</div>
				<div className="des2">红圈为庄，蓝圈为闲, 庄一列, 闲一列, 序排列出, 如果和的话, 会用一条绿色斜线代表，如果之后连续出现和，便用绿色数字代替。</div>
				<div className="sub-title">3. 大眼路</div>
				<div className="des2">大眼路是根据大路延伸出来，从大路的第2列第2行开始分析出来，若那位置没有结果，则以大路的第3列第1行开始分析。</div>
				<div className="des3">
					<p>如下图:</p>
					<p className="ex2"></p>
					<p>先从座标1(第2列第2行)分析，若座标1无庄或闲，则以座标2(第3列第1行)开始分析。</p>
				</div>
				
				<div className="des row">
					<li className="col-xs-12"><span className="txt">● 大眼路画蓝圈规则:</span></li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>1.向下</p>
							<p className="ex3"></p>
							<p>以大路最新的结果，水平方式跟前一列作对比，如无结果，则于大眼路画蓝圈。</p>
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>2.换列</p>
							<p className="ex4"></p>
							<p>以大路最新的结果，如比对前一列与前二列结果位置是不齐整，则于大眼路画蓝圈。</p>							
						</div>
					</li>
					<li className="col-xs-12"><span className="txt">● 大眼路写法画红圈规则:</span></li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>1.向下</p>
							<p className="ex5"></p>
							<p>以大路最新的结果，水平方式跟前一列作对比，不论结果为庄或闲，则于大眼路画红圈。</p>
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p></p>
							<p className="ex6"></p>
							<p>以大路最新的结果，水平方式跟前一列作对比，如前一列的前二行或以上都无结果，则于大眼路画红圈。</p>							
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>2.换列</p>
							<p className="ex7"></p>
							<p>以大路最新的结果，如比对前一列与前二列结果位置是齐整，则于大眼路画红圈。</p>							
						</div>
					</li>
				</div>
				

				<div className="sub-title">4. 小路</div>
				<div className="des2">小路是根据大路延伸出来，从大路的第3列第2行开始分析出来，若那位置没有结果，则以大路的第4列第1行开始分析。</div>
				<div className="des3">
					<p>如下图:</p>
					<p className="ex8"></p>
					<p>先从座标1(第3列第2行)分析，若座标1无庄或闲，则以座标2(第4列第1行)开始分析。</p>
				</div>
				
				<div className="des row">
					<li className="col-xs-12"><span className="txt">● 小路写法画蓝圈规则:</span></li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>1.向下</p>
							<p className="ex9"></p>
							<p>以大路最新的结果，水平方式跟前二列作对比，如无结果，则于小眼路画蓝点。</p>
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>2.换列</p>
							<p className="ex10"></p>
							<p>以大路最新的结果，如比对前一列与前三列结果位置是不齐整，则于小路画蓝点。</p>							
						</div>
					</li>
					<li className="col-xs-12"><span className="txt">● 小路写法画红圈规则:</span></li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>1.向下</p>
							<p className="ex11"></p>
							<p>以大路最新的结果，水平方式跟前二列作对比，不论结果为庄或闲，则于大眼路画红点。</p>
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p></p>
							<p className="ex12"></p>
							<p>以大路最新的结果，水平方式跟前二列作对比，如前二列的前二行或以上都无结果，则于大眼路画红点。</p>							
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>2.换列</p>
							<p className="ex13"></p>
							<p>以大路最新的结果，如比对前一列与前三列结果位置是齐整，则于大眼路画红点。</p>							
						</div>
					</li>
				</div>
			
			
				<div className="sub-title">5. 小强路</div>
				<div className="des2">小路是根据大路延伸出来，从大路的第4列第2行开始分析出来，若那位置没有结果，则以大路的第5列第1行开始分析。</div>
				<div className="des3">
					<p>如下图:</p>
					<p className="ex14"></p>
					<p>先从座标1(第4列第2行)分析，若座标1无庄或闲，则以座标2(第5列第1行)开始分析。</p>
				</div>
				
				<div className="des row">
					<li className="col-xs-12"><span className="txt">● 小强路画蓝色斜线规则:</span></li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>1.向下</p>
							<p className="ex15"></p>
							<p>以大路最新的结果，水平方式跟前三列作对比，如无结果，则于大眼路画蓝色斜线。</p>
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>2.换列</p>
							<p className="ex16"></p>
							<p>以大路最新的结果，如比对前一列与前四列结果位置是不齐整，则于大眼路蓝色斜线。</p>							
						</div>
					</li>
					<li className="col-xs-12"><span className="txt">● 小强路画红色斜线规则:</span></li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>1.向下</p>
							<p className="ex17"></p>
							<p>以大路最新的结果，水平方式跟前三列作对比，不论结果为庄或闲，则于大眼路画红色斜线。 </p>
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p></p>
							<p className="ex18"></p>
							<p>以大路最新的结果，水平方式跟前三列作对比，如前三列的前二行或以上都无结果，则于大眼路画红色斜线。</p>							
						</div>
					</li>
					<li className="col-lg-6 col-xs-12">
						<div className="bg clearfix">
							<p>2.换列</p>
							<p className="ex19"></p>
							<p>以大路最新的结果，如比对前一列与前四列结果位置是齐整，则于大眼路画红色斜线。</p>							
						</div>
					</li>					
				</div>

				<div className="sub-title">6. 庄问路丶闲问路</div>
				<div className="des2">此功能是模拟下一局如果开庄或闲时，大路丶大眼路丶小路丶小强路的结果。令玩家更方便及快速地判断该如何投注下一局。</div>
				<div className="des3">
					<p>如下图:</p>
					<p>
                        {/* <img src="images/b6/ex20.jpg" className="img-responsive"> */}
                    </p>
					<p>模拟下一局开庄或闲的路</p>
				</div>
		
			</div>
        </div>
    )
}
export default Pailu