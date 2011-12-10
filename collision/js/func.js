$(document).ready(function(){
	var CANVAS_WIDTH = 1200,
		CANVAS_HEIGHT = 900,
		FPS = 30,
		canvasElement = $('<canvas width="' + CANVAS_WIDTH + '" height="' + CANVAS_HEIGHT + '"></canvas>'),
		canvas = canvasElement.get(0).getContext('2d'),
		mouse = {
			x: 0,
			y: 0
		},
		scene = ['default', 'orient', 'test'],
		current_scene_index = 0,
		collision = new Collision();
		
	canvasElement.appendTo('body');
	
	setInterval(function() {
		update();
		render();
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
		position: {
			x: 0,
			y: 0	
		},
		offset: {
			x: -30,
			y: -30	
		},
		width: 60,
		height: 60,
		radius: 30,
		draw: function() {
			canvas.beginPath();
			canvas.fillStyle = this.color;
			switch (scene[current_scene_index]) {
				case 'orient':
					canvas.arc(this.position.x + this.offset.x, this.position.y + this.offset.y, 1, 0, Math.PI*2, true);
					break
				case 'test':
					canvas.fillRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.width, this.height);
					break
				default:
					canvas.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
			}	
			canvas.stroke();
			canvas.fill(); 
			canvas.closePath();
		},
		update: function() {
			this.position.x = mouse.x;
			this.position.y = mouse.y;
		}
	};
	
	var staticObject = {
		color: "#A00",
		position: {
			x: 300,
			y: 200	
		},
		radius: 40,
		offset: {
			x: -40,
			y: -40	
		},
		width: 80,
		height: 80,
		draw: function() {			
			canvas.beginPath();
			canvas.fillStyle = this.color;
			switch (scene[current_scene_index]) {
				case 'orient':
					canvas.lineWidth = 1;					
					canvas.moveTo(this.position.x + this.offset.x, this.position.y + this.offset.y); // перемещаемся к координатам (x,y)
					canvas.lineTo(this.position.x + this.offset.x + this.width, this.position.y + this.offset.y + this.height);				
					break
				case 'test':
					canvas.fillRect(this.position.x + this.offset.x, this.position.y + this.offset.y, this.width, this.height);
					break
				default:
					canvas.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
			}
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
		color: ['PaleGreen', '#FFFFCC', 'lavender'],
		current_color: 0,
		display: false,
		draw: function() {
			if (this.display) {
				canvas.fillStyle = this.color[this.current_color];
				canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			}
		},
		update: function() {
			switch (scene[current_scene_index]) {
				case 'orient':
					var a = {
						x: staticObject.position.x + staticObject.offset.x,
						y: staticObject.position.y + staticObject.offset.y
					},
					b = {
						x: staticObject.position.x + staticObject.offset.x + staticObject.width,
						y: staticObject.position.y + staticObject.offset.y	+ staticObject.height				
					},
					c = {
						x: player.position.x + player.offset.x,
						y: player.position.y + player.offset.y
					},
					orient = collision.orient(a, b, c);	
					
					this.current_color = orient < 0 ? 2 : orient;				
					this.display = true;					
					break
				case 'test':
					//
					break
				default:
					this.display = collision.circle_intersect(staticObject.position, staticObject.radius, player.position, player.radius);
			}
		}
	};
	
	// --- 
	
	function update() {
		effect.update();
		staticObject.update();
		player.update();
	}
	
	function render() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		effect.draw();
		staticObject.draw();
		player.draw();
		
		// выводим название сцены
		canvas.fillStyle = '#000';
		canvas.font = '12px courier-new';
		canvas.textBaseline = 'top';
		canvas.fillText (scene[current_scene_index], 5, 5);
	}
	
	// смена сцен по клику
	$('canvas:first').click(function() {
		if (current_scene_index < scene.length - 1) {
			current_scene_index++
		} else {
			current_scene_index = 0;
		}
	});
	
});