window.onload=function(){
	const url="https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
	d3.json(url,function(data){
			const timeFormat=d3.time.format("%M:%S"),margin={left:50,top:130,right:150,bottom:80},
						width=700,height=700;
			const x=d3.time.scale()
											.domain([+timeFormat.parse(data[34].Time)+10*1000,timeFormat.parse(data[0].Time)])
											.range([0,width]);
			const y=d3.scale.linear()
											.domain([data[0].Place,data[data.length-1].Place+2])
											.rangeRound([0,height]);
			const chart=d3.select(".chart")
											.attr("width",width+margin.left+margin.right)
											.attr("height",height+margin.top+margin.bottom)
										.append("g")
											.attr("transform","translate("+margin.left+","+margin.top+")");
			const circles=chart.selectAll("circle")
													.data(data)
													.enter()
												.append("circle")											
													.attr("class",function(d){if(d.Doping.length==0){return "dot clean";}else{return "dot"}})
													.attr("cx",function(d){return x(timeFormat.parse(d.Time));})
													.attr("cy",function(d,i){return y(i+1)})
													.attr("r",5)
													.on("mouseover",function(d){
														d3.select(this).transition()
																						.delay(10)
																						.style("stroke","#555");
														
														d3.select("#info")
																.append("p")
																	.html("Name:"+d.Name+"<br />"+"Place:"+d.Place+"<br />"+"Time:"+d.Time+"<br />"+"<br />"+d.Doping);	
														d3.select("#info")
																	.style("padding","5px 10px 10px 10px");	
														
													})
													.on("mouseout",function(){
														d3.select(this).transition()
																						.delay(10)
																						.style("stroke","#999");
														//d3.select(".hint").remove();
														d3.select("#info").selectAll("p").remove();
														d3.select("#info")
																	.style("padding","0");
													});
			const names=chart.selectAll("pname")
													.data(data)
													.enter()
												.append("text")
													.attr("x",function(d){return x(timeFormat.parse(d.Time))+15;})
													.attr("y",function(d,i){return y(i+1)+5})
													.text(function(d){return d.Name});
			//add chart title
			chart.append("text")
										.attr("transform","translate("+(width/2+margin.left)+","+(-margin.top/2)+")")
										.attr("text-anchor","middle")
										.attr("class","ctitle")
										.text("Doping in Professional Bicycle Racing");
			chart.append("text")
										.attr("transform","translate("+(width/2+margin.left)+",-20)")
										.attr("text-anchor","middle")
										.attr("class","byline")
										.text("35 Fastest times up Alpe d'Huez");
			//add x axis
			const xaxis=d3.svg.axis()
													.scale(x)
													.orient("bottom")
													//.tickValues([timeFormat.parse(data[data.length-1].Time),timeFormat.parse(data[21].Time),timeFormat.parse(data[12].Time),timeFormat.parse(data[5].Time),timeFormat.parse(data[2].Time),timeFormat.parse(data[0].Time)])
													.ticks(8)
													.tickFormat(timeFormat);
			chart.append("g")
						.attr("class","x axis")
						.attr("transform","translate(0,"+height+")")
						.call(xaxis);
			
			//add y axis
			const yaxis=d3.svg.axis()
													.scale(y)
													.orient("left")
													.ticks(8);
			chart.append("g")
							.attr("class","y axis")
							.attr("transform","translate(0,0)")
							.call(yaxis)
						.append("text")
							.attr("y",20)
							.attr("transform","rotate(-90)")
							.attr("text-anchor","end")
							.text("Ranking");	
			//add explanation
			chart.append("circle")
							.attr("class","dot")
							.attr("cx",100)
							.attr("cy",50)
							.attr("r",5);
			chart.append("text")
							.attr("class","explanation")
							.attr("x",110)
							.attr("y",55)
							.text("Riders with doping allegations");				
			chart.append("circle")
							.attr("class","dot clean")
							.attr("cx",100)
							.attr("cy",70)
							.attr("r",5);	
			chart.append("text")
							.attr("class","explanation")
							.attr("x",110)
							.attr("y",75)
							.text("No doping allegations");		
	});
}