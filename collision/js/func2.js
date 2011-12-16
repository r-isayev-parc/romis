function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function(){
	var CANVAS_WIDTH = 1200,
		CANVAS_HEIGHT = 700,
		FPS = 30,
		canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>'),
		canvas = canvasElement.get(0).getContext('2d'),
		mouse = {
			x: 0,
			y: 0
		}
		collision = new Collision();
		
	canvasElement.appendTo('body');
	
	var FPS_Counter = 0,
		current_FPS = 0;
	
	setInterval(function() {
		update();
		render();
		FPS_Counter++;
	}, 1000/FPS);	
	
	// расчет реального FPS
	setInterval(function() {
		current_FPS = FPS_Counter;
		FPS_Counter = 0;
	}, 1000);
	
	// определяем координаты мыши на канве
	canvasElement.bind('mousemove', function(e){
		var offset = $(this).offset();
		
		mouse.x = e.pageX - offset.left;
		mouse.y = e.pageY - offset.top;
	});

	// ---
	
	var player = {
		color: "#0066CC",
		position: {
			x: 0,
			y: 0	
		},
		radius: 5,
		draw: function() {
			canvas.beginPath();
			canvas.fillStyle = this.color;
			canvas.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
			canvas.stroke();
			canvas.fill(); 
			canvas.closePath();
		},
		update: function() {
			this.position.x = mouse.x;
			this.position.y = mouse.y;
		}
	};
	
	var StaticObject = function(x, y){
		this.position = {};
		this.position.x = x;
		this.position.y = y;
		this.color = '#' + ((Math.random() * 0x1000000) | 0).toString(16);
		this.is_collision = false;
	}
	
	StaticObject.prototype = {
		radius: 10,
		draw: function() {			
			canvas.beginPath();
			canvas.fillStyle = this.color;
			canvas.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
			canvas.stroke();
			canvas.fill(); 
			canvas.closePath();
		},
		update: function() {
			/*this.position.x = mouse.x;
			this.position.y = mouse.y;*/
		}
	};
	
	var effect = {
		color: 'lavender',
		current_color: 0,
		display: false,
		draw: function() {
			if (this.display) {
				canvas.fillStyle = this.color;
				canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			}
		},
		update: function() {
			for(var i = 0; i < stOBJcount; i++) {
				this.display = collision.circle_intersect(stOBJ[i].position, stOBJ[i].radius, player.position, player.radius);
				stOBJ[i].is_collision = this.display;
				if (this.display) {
					return true;
				}
			}
		}
	};
	
	// --- 

	var stOBJ = [],
		stOBJcount = 1000,
		newx, newy;
	
	for(var i = 0; i < stOBJcount; i++) {
		newx = getRandomInt(10, CANVAS_WIDTH - 10);
		newy = getRandomInt(10, CANVAS_HEIGHT - 10);
		stOBJ[i] = new StaticObject(newx, newy);
		stOBJ[i].draw();
	}
	
	function update() {
		effect.update();
		for(var i = 0; i < stOBJcount; i++) {
			stOBJ[i].update();
		}
		player.update();
	}
	
	function render() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		effect.draw();
		for(var i = 0; i < stOBJcount; i++) {
			if (stOBJ[i].is_collision) {
				stOBJ[i].draw();
			}
		}
		player.draw();
		
		// выводим FPS
		canvas.fillStyle = '#000';
		canvas.font = '12px courier-new';
		canvas.textBaseline = 'top';
		canvas.fillText('fps: ' + current_FPS, 5, 5);
	}
	
});