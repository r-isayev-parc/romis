var Collision = function() {
	return {
		circle_intersect: this.circle_intersect 
	};
};
	
Collision.prototype = {
			
	// возвращает true если окружности c центрами в с1 и с2 и
	// радиусами r1 и r2 пересекаюстя, иначе - false
	circle_intersect: function(c1, r1, c2, r2) {
		//$('#console').html(c1.x + ' ' + c1.y + ' ' + r1 + ' / ' + c2.x + ' ' + c2.y + ' ' + r2);
		return Math.sqrt((c1.x - c2.x)*(c1.x - c2.x) + (c1.y - c2.y)*(c1.y - c2.y)) <= r1 + r2;
	}
	
};

