
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
                          .attr("class", "enemies")
                          .style("fill", function (d) { return d.color; });

var player = svgContainer.append("circle")
                         .data([playerData])
                         .attr("cx", function (d) { return d.x; })
                         .attr("cy", function (d) { return d.y; })
                         .attr("r", function (d) { return d.r; })
                         .call(drag);



var move = function(elements){
  elements.transition()
         .duration(2000)
         .attr("cx", function () { return Math.random()*600; })
         .attr("cy", function () { return Math.random()*600; })
         .each("end", function(){ move(d3.select(this)); });

};
move(circles);

//scoreboard
var score = 0;
var bestScore = 0;
var scoreTicker = function(){
  score = score+1;
  bestScore = Math.max(score, bestScore);
  d3.select(".scoreboard .high span").text(bestScore);
  d3.select(".scoreboard .current span").text(score);
};
setInterval(scoreTicker, 250);



//set collision count and prevCollision
var prevCollision = false;
var collisionCount = 0;
//collision detected
var detectCollision = function(){
  var collision = false;

  circles.each( function(){
    var enemy = d3.select(this);
    var a = player.attr("cx") - enemy.attr("cx");
    var b = player.attr("cy") - enemy.attr("cy");
    var c = Math.sqrt(a*a + b*b);
    if( c < 20){
      collision = true;
    }
  });

  if(collision){
    if(prevCollision !== collision){
      collisionCount = collisionCount+1;
      d3.select(".scoreboard .collisions span").text(collisionCount);
      score = 0;
    }
  }

  prevCollision = collision;

};

d3.timer(detectCollision);


















