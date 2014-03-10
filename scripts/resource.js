MY.Resource = function () {};

MY.Resource.prototype.init = function (node, cash) {
	this.nodes = [node];
	this.cash = cash;
	this.x = node.x;
	this.y = node.y;
	this.width = 32;
	this.height = 32;
	
	node.object = this;
};

MY.Resource.prototype.render = function (context, viewport) {
	context.fillStyle = this.cash > 0 ? "rgb(255, 255, 0)" : "rgba(255, 255, 0, 0.5)";
	context.fillRect(this.x - viewport.x, this.y - viewport.y, this.width, this.height);
};

MY.Resource.prototype.removeCash = function (cash) {
	this.cash -= cash;
};