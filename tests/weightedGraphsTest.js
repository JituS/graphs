var graphs=require('../lib/weightedGraph');
var assert=require('chai').assert;
var ld=require('lodash');


var denseGraph=function() {
	var g=new graphs.WeightedGraph();
	var vertices=['A','B','C','D','E'];

	vertices.forEach(function(vertex){
		g.addVertex(vertex);
	});

	for (var i = 0; i < (vertices.length-1); i++) {
		var from=vertices[i];
		for (var j = i+1; j < vertices.length; j++) {
			var e1=new graphs.Edge("e1",vertices[j],from,Math.floor(Math.random()*10));
			g.addEdge(e1);
		}
	}
	return g;
}

describe("shortest path",function(){
	 it("should choose the only path when only one path exists",function(){
	 	var g=new graphs.WeightedGraph();
	 	g.addVertex('A');
	 	g.addVertex('B');

	 	var e1=new graphs.Edge("e1",'A','B',1);

	 	g.addEdge(e1);

	 	var path=g.shortestPath('A','B');
	 	assert.equal(1,path.length);
	 	assert.deepEqual(e1,path[0]);
	 });

	it("should choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');
		g.addVertex('D');
		g.addVertex('E');
		g.addVertex('F');
		g.addVertex('G');
		g.addVertex('H');
		g.addVertex('I');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e1",'C','F',1);
		var e4=new graphs.Edge("e1",'F','I',20);
		var e5=new graphs.Edge("e1",'I','H',1);
		var e6=new graphs.Edge("e1",'H','G',3);
		var e7=new graphs.Edge("e1",'G','D',4);
		var e8=new graphs.Edge("e1",'D','A',5);
		var e9=new graphs.Edge("e1",'A','E',6);
		var e10=new graphs.Edge("e1",'E','B',6);
		var e11=new graphs.Edge("e1",'E','F',1);
		var e12=new graphs.Edge("e1",'E','H',1);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);
		g.addEdge(e4);
		g.addEdge(e5);
		g.addEdge(e6);
		g.addEdge(e7);
		g.addEdge(e8);
		g.addEdge(e9);
		g.addEdge(e10);
		g.addEdge(e11);
		g.addEdge(e12);

		var path=g.shortestPath('F','I');
	 });
	it("ould choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');
		g.addVertex('D');
		g.addVertex('E');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','D',2);
		var e3=new graphs.Edge("e1",'D','E',1);
		var e4=new graphs.Edge("e1",'E','C',1);
		var e5=new graphs.Edge("e1",'C','A',10);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);
		g.addEdge(e4);
		g.addEdge(e5);

		var path=g.shortestPath('B','C');
	 });

	 it("should choose the path with least weight when more than one path exists",function(){
	 	var g=new graphs.WeightedGraph();
	 	g.addVertex('A');
	 	g.addVertex('B');
	 	g.addVertex('C');

	 	var e1=new graphs.Edge("e1",'A','B',1);
	 	var e2=new graphs.Edge("e2",'B','C',1);
	 	var e3=new graphs.Edge("e1",'A','C',1);
	 	g.addEdge(e1);
	 	g.addEdge(e2);
	 	g.addEdge(e3);

	 	var path=g.shortestPath('A','C');
	 	assert.equal(1,path.length);
	 	assert.deepEqual(e3,path[0]);
	 });

	it("should choose the path with least weight when more than one path exists even if the path has more vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e1",'A','C',3);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(2,path.length);
		assert.deepEqual(e1,path[0]);
		assert.deepEqual(e2,path[1]);
	});

	 it("should choose the path with least weight when multiple edges exist between two vertices",function(){
	 	var g=new graphs.WeightedGraph();
	 	g.addVertex('A');
	 	g.addVertex('B');

	 	var e1=new graphs.Edge("e1",'A','B',1);
	 	var e2=new graphs.Edge("e2",'A','B',2);
	 	g.addEdge(e1);
	 	g.addEdge(e2);

	 	var path=g.shortestPath('A','B');
	 	assert.equal(1,path.length);
	 	assert.deepEqual(e1,path[0]);
	 });

});
