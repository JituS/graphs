var ld = require('lodash');

var graphs = {
	UndirectedGraph: function(){
		this._size = 0;
	},
	DirectedGraph: function(){
		this._size = 0;
	}
};

graphs.UndirectedGraph.prototype = {
	addVertex: function(vertex){
		this[vertex] = [];
	},
	addEdge: function(from, to){
		this[from].push(to);
		this[to].push(from);
		this._size++;
	},
	hasEdgeBetween: function(from, to){
		return this[from].indexOf(to) != -1;
	},
	order: function(){
		return Object.keys(this).length-1;
	},
	size: function(){
		return this._size;	
	},
	pathBetween: function(from, to, path){
		var path = path || [];
		if(from == to) return path.concat(from);
		for(var i = 0; i < this[from].length; i++) {
			if(path.indexOf(this[from][i]) == -1){
				var result=this.pathBetween(this[from][i], to, path.concat(from));
				if(result && result[result.length-1] == to){
					return result;
				}
			}
		};
		return [];
	},	
	farthestVertex: function(vertex){
		var distance = 0, farVertex;
		for(var i in this){
			var newDistance = this.pathBetween(vertex, i).length;
			if(newDistance > distance){
				distance = newDistance;
				farVertex = i;
			}
		};
		return farVertex;
	},
	allPaths: function(from, to, path, paths){
		var path = path || [];
		var paths = paths || [];
		if(from == to) return path.concat(from);
		for(var i = 0; i < this[from].length; i++) {
			if(path.indexOf(this[from][i]) == -1){
				var result=this.allPaths(this[from][i], to, path.concat(from), paths);
				if(result && result[result.length-1] == to){
					paths.push(result);
				}
			}
		};
		return paths;
	},	
};

graphs.DirectedGraph.prototype = {
	addVertex: function(vertex){
		this[vertex] = [];
	},
	addEdge: function(from, to){
		this[from].push(to);
		this._size++;
	},
	hasEdgeBetween: function(from, to){
		return this[from].indexOf(to) != -1;
	},
	order: function(){
		return Object.keys(this).length-1;
	},
	size: function(){
		return this._size;		
	},
	pathBetween: function(from, to, path){
		var path = path || [];
		if(from == to) return path.concat(from);
		for(var index in this[from]){
			if(path.indexOf(this[from][index]) == -1){
				var result = this.pathBetween(this[from][index], to, path.concat(from));
				if(result && result.indexOf(to) != -1) return result;
			};
		};
		return [];
	},
	farthestVertex: function(vertex){
		var distance = 0, farVertex;
		for(var i in this){
			var newDistance = this.pathBetween(vertex, i).length;
			if(newDistance > distance){
				distance = newDistance;
				farVertex = i;
			}
		};
		return farVertex;
	},
	allPaths: function(from, to, path, paths){
		var path = path || [];
		var paths = paths || [];
		if(from == to) return path.concat(from);
		for(var i = 0; i < this[from].length; i++) {
			if(path.indexOf(this[from][i]) == -1){
				var result=this.allPaths(this[from][i], to, path.concat(from), paths);
				if(result && result[result.length-1] == to){
					paths.push(result);
				}
			}
		};
		return paths;
	},	
};

module.exports = graphs;