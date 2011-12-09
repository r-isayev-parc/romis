var Collision = function() {
	return {
		circle_intersect: this.circle_intersect 
	};
};
	
Collision.prototype = {
			
	// ���������� true ���� ���������� c �������� � �1 � �2 �
	// ��������� r1 � r2 ������������, ����� - false
	circle_intersect: function(c1, r1, c2, r2) {
		//$('#console').html(c1.x + ' ' + c1.y + ' ' + r1 + ' / ' + c2.x + ' ' + c2.y + ' ' + r2);
		return Math.sqrt((c1.x - c2.x)*(c1.x - c2.x) + (c1.y - c2.y)*(c1.y - c2.y)) <= r1 + r2;
	}
	
};

