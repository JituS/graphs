var graphs = {};
var ld = require('lodash');
graphs.WeightedGraph = function(){
};

graphs.Edge = function(edgeName,from, to, weight){
	var edge = {edgeName:edgeName, from: from, to: to, weight: weight};
	return edge;
};

graphs.WeightedGraph.prototype = {
	addVertex: function(vertex){
		this[vertex] = [];
	},
	addEdge: function(edge){
		var vertexFrom = edge.from;
		var vertexTo = edge.to;
		this[vertexFrom].push({edgeName:edge.edgeName,from: vertexFrom, to:edge.to, weight:edge.weight});
		this[vertexTo].push({edgeName:edge.edgeName,from:vertexTo, to:edge.from, weight:edge.weight});
	},
	allPaths: function(from, to, path, paths){
		var path = path || [];
		var paths = paths || [];
		if(from == to) return path.concat(from);
		for(var i = 0; i < this[from].length; i++) {
			if(path.indexOf(this[from][i].to) == -1){
				var result=this.allPaths(this[from][i].to, to, path.concat(from), paths);
				if(result && result[result.length-1] == to){
					paths.push(result);
				}
			}
		};
		return paths;
	},
	shortestPath: function(from, to){
		var size = Object.keys(this);
		var pre= {}, h={};
		var distance = {};
		for(var i = 0; i < size.length; i++){
			distance[size[i]] = Infinity;
		};
		distance[from] = 0;
		while(size.length > 0){
			var minimal = size.reduce(function(pv, cv){
				if(distance[pv] > distance[cv]) return cv;
				return pv;
			});
			if(minimal == to) break;	
			size.splice(size.indexOf(minimal), 1);
			var neighbous = this[minimal].filter(function(each){
				return each.to;
			});
			neighbous = neighbous.map(function(each){
				return each.to;
			});
			for(var i = 0; i < neighbous.length; i++){
				var v = neighbous[i];
				var d = distance[minimal] + findWeight(this, minimal, v);
				if(distance[v] >= d){
					distance[v] = d;
					pre[v] = minimal;
				}	
			};
		};
		var pathBetween = function(from, to, pre, path){
			var path = path || [];
			if(from == to) return path.concat(from);
			for(var i = 0; i < pre[from].length; i++) {
				if(path.indexOf(pre[from][i]) == -1){
					var result=pathBetween(pre[from][i], to, pre, path.concat(from));
					if(result && result[result.length-1] == to){
						return result;
					}
				}
			};
			return [];
		}
		var path = pathBetween(to, from, pre).reverse(), realPath = [];
		for(var i = 0; i < path.length-1; i++){
			var edge = findEdge(this,path[i], path[i+1])
			realPath.push(edge);
		};
		return realPath;
	}
}

var findEdge = function(graph, from, to){
	for(var i = 0; i < graph[from].length; i++){
		if(graph[from][i].to == to) return graph[from][i];
	};
}

var findWeight = function(graph, min, v){
	for(var i = 0; i < graph[min].length; i++){
		if(graph[min][i].to == v) return graph[min][i].weight;
	};
};

module.exports = graphs;
