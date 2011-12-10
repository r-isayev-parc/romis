var Collision = function() {
	return {
		orient: this.orient,
		circle_intersect: this.circle_intersect 
	};
};
	
Collision.prototype = {
	
	// возвращает знак полуплоскости точки «c» относительно прямой (a1, a2).
	// Если точка «c» лежит на прямой, то Orient() возвращает 0.
	orient: function(a1, a2, c) {
		var temp = (a1.x - c.x)*(a2.y - c.y) - (a1.y - c.y)*(a2.x - c.x);
		
		//$('#console').html(temp);
		if (temp <= 0) {
			if (temp = 0) {
				return 0;
			} else {
				return -1;
			}
		} else {
			return 1;
		}	
	},
	
	// возвращает true если окружности c центрами в с1 и с2 и
	// радиусами r1 и r2 пересекаюстя, иначе - false			
	circle_intersect: function(c1, r1, c2, r2) {
		//$('#console').html(c1.x + ' ' + c1.y + ' ' + r1 + ' / ' + c2.x + ' ' + c2.y + ' ' + r2);
		return Math.sqrt((c1.x - c2.x)*(c1.x - c2.x) + (c1.y - c2.y)*(c1.y - c2.y)) <= r1 + r2;
	}
	
};

