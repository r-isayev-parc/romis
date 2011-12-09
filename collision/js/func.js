$(document).ready(function(){
	var CANVAS_WIDTH = 640,
		CANVAS_HEIGHT = 480,
		FPS = 30,
		canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>'),
		canvas = canvasElement.get(0).getContext('2d'),
		mouse = {
			x: 0,
			y: 0
		},
		collision = new Collision();
		
	canvasElement.appendTo('body');
	
	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);
	
	// определяем координаты мыши на канве
	canvasElement.bind('mousemove', function(e){
		var offset = $(this).offset();
		
		mouse.x = e.pageX - offset.left;
		mouse.y = e.pageY - offset.top;
	});

	// ---
	
	var player = {
		color: "#0066CC",
		offset: {
			x: 0,
			y: 0	
		},
		radius: 30,
		draw: function() {
			canvas.beginPath();
			canvas.fillStyle = this.color;
			canvas.arc(this.offset.x, this.offset.y, this.radius, 0, Math.PI*2, true);
			canvas.closePath();
			canvas.fill(); 	
		},
		update: function() {
			this.offset.x = mouse.x;
			this.offset.y = mouse.y;
		}
	};
	
	var staticObject = {
		color: "#A00",
		offset: {
			x: 300,
			y: 200	
		},
		radius: 40,
		draw: function() {
			canvas.beginPath();
			canvas.fillStyle = this.color;
			canvas.arc(this.offset.x, this.offset.y, this.radius, 0, Math.PI*2, true);
			canvas.closePath();
			canvas.fill(); 		
		},
		update: function() {
			/*this.offset.x = mouse.x;
			this.offset.y = mouse.y;*/
		}
	};
	
	var effect = {
		color: "#FFFFCC",
		display: false,
		draw: function() {
			if (this.display) {
				canvas.fillStyle = this.color;
				canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			}
		},
		update: function() {
			this.display = collision.circle_intersect(staticObject.offset, staticObject.radius, player.offset, player.radius);
		}
	};
	
	// --- 
	
	function update() {
		effect.update();
		staticObject.update();
		player.update();
	}
	
	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		effect.draw();
		staticObject.draw();
		player.draw();
	}
	
});