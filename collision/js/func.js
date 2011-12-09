$(document).ready(function(){
	var CANVAS_WIDTH = 640,
		CANVAS_HEIGHT = 480,
		FPS = 30,
		canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>'),
		canvas = canvasElement.get(0).getContext('2d'),
		mouse = {
			x: 0,
			y: 0
		};
		
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
		x: 220,
		y: 270,
		offsetX: -16,
		offsetY: -16, 
		width: 32,
		height: 32,
		draw: function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x + this.offsetX, this.y + this.offsetY, this.width, this.height);
		},
		update: function() {
			this.x = mouse.x;
			this.y = mouse.y;
		}
	};
	
	var staticObject = {
		color: "#A00",
		x: 220,
		y: 270,
		offsetX: -32,
		offsetY: -32, 
		width: 64,
		height: 64,
		draw: function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x + this.offsetX, this.y + this.offsetY, this.width, this.height);
		},
		update: function() {
			/*this.x = mouse.x;
			this.y = mouse.y;*/
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
			this.display = mouse.x > 100 && mouse.x < CANVAS_WIDTH - 100;
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