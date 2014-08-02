
//drag function
var drag = d3.behavior.drag()
             .on('dragstart', function() { player.style('fill', 'blue'); })
             .on('drag', function() { player.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { player.style('fill', 'black'); });

//circle object data
var circleData = [];

for(var i = 0; i < 10; i++){
  var circleObj = {};
  circleObj.x = Math.random()*600;
  circleObj.y = Math.random()*600;
  circleObj.r = 10;
  circleObj.color = "red";
  circleData.push(circleObj);
}

//player data
var playerData = {};
playerData.x = 300;
playerData.y = 300;
playerData.r = 10;

var svgContainer = d3.select("body").append("svg")
                                    .attr("width",600)
                                    .attr("height",600)
                                    .attr("class", "box");


var circles = svgContainer.selectAll("circle")
                          .data(circleData)
                          .enter()
                          .append("circle")
                          .attr("cx", function (d) { return d.x; })
                          .attr("cy", function (d) { return d.y; })
                          .attr("r", function (d) { return d.r; })
                          .style("fill", function (d) { return d.color; });

var player = svgContainer.append("circle")
                         .data([playerData])
                         .attr("cx", function (d) { return d.x; })
                         .attr("cy", function (d) { return d.y; })
                         .attr("r", function (d) { return d.r; })
                         .call(drag);



var move = function(){
  circles.transition()
         .duration(2000)
         .attr("cx", function () { return Math.random()*600; })
         .attr("cy", function () { return Math.random()*600; });

};
setInterval(function(){move();}, 2000);

