MY.require("scripts/maps/map-1.js");

MY.Map = function () {};

MY.Map.prototype.init = function () {
	this.map = MY.Maps.Map1;
	
	this.nodeWidth = 32;
	this.nodeHeight = 32;
	this.width = this.map.map.length * this.nodeWidth;
	this.height = this.map.map[0].length * this.nodeHeight;
	
	this.initTerrains();
	this.initNodes();
	this.initResources();
};

MY.Map.prototype.initTerrains = function () {
	var terrain1 = new MY.Terrain();
	terrain1.init("rgb(255, 255, 255)", 0);
	
	var terrain2 = new MY.Terrain();
	terrain2.init("rgb(0, 0, 0)", 10);
	
	this.terrains = [
		terrain1,
		terrain2
	];
};

MY.Map.prototype.initNodes = function () {
	var i,
		j,
		l,
		m;
	this.nodes = [];
	for (i = 0, l = this.map.map.length; i < l; i += 1) {
		this.nodes[i] = [];
		for (j = 0, m = this.map.map[i].length; j < m; j += 1) {
			var node = new MY.Node();
			node.init(this.terrains[this.map.map[i][j]], i, j, this.nodeWidth, this.nodeHeight);
			this.nodes[i][j] = node;
		}
	}
	for (i = 0, l = this.nodes.length; i < l; i += 1) {
		for (j = 0, m = this.nodes[i].length; j < m; j += 1) {
			this.nodes[i][j].update(this);
		}
	}
};

MY.Map.prototype.initResources = function () {
	this.resources = [];
	for (var i = 0, l = this.map.resources.length; i < l; i += 1) {
		var resource = new MY.Resource();
		resource.init(this.nodes[this.map.resources[i][0]][this.map.resources[i][1]], this.map.resources[i][2]);
		this.resources[i] = resource;
	}
};

MY.Map.prototype.render = function (context, viewport) {
	var i,
		l;
	
	for (i = viewport.minRow; i < viewport.maxRow; i += 1) {
		for (var j = viewport.minCol; j < viewport.maxCol; j += 1) {
			this.nodes[i][j].render(context, viewport);
		}
	}
	
	for (i = 0, l = this.resources.length; i < l; i += 1) {
		this.resources[i].render(context, viewport);
	}
};

MY.Map.prototype.getNodeByRowCol = function (row, col) {
	if (row !== undefined && col !== undefined && row >= 0 && row < this.nodes.length && col >= 0 && col < this.nodes[row].length) {
		return this.nodes[row][col];
	} else {
		return null;
	}
};

MY.Map.prototype.getGrid = function () {
	var grid = [];
	for (var i = 0, l = this.nodes.length; i < l; i += 1) {
		grid[i] = [];
		for (var j = 0, m = this.nodes[i].length; j < m; j += 1) {
			grid[i][j] = this.nodes[i][j].getCost();
		}
	}
	return grid;
};