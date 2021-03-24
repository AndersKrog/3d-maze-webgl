// camerakontrol

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 400;

const TILE_SIZE = 64;

const map_height = 400;
const map_width = 400;

class Level{
	constructor(){}
	grid_width = 16;
	grid_height = 12;

	grid = [
		[1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
		[1, 0, 1, 3, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
		[1, 0, 3, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];
	gridToWalls(){
		for (let x = 0; x < this.grid_width; x++){
			for (let y = 0; y < this.grid_height; y++){
				// kun hvis der er en væg
				if (this.grid[y][x] != 0){

					// punkterne skal skaleres i forhold til map

					// omsæt grid til punkter til vægge
					let x1 = TILE_SIZE * x; 	// højre 
					let x2 = TILE_SIZE * (x+1);	// venstre
					let y1 = TILE_SIZE * y;	// top
					let y2 = TILE_SIZE * (y+1);// bund
					// tilfældig farve til væggene
					let c = random(255);
					
				}
			}
		}
	}
	hasWallAt(x,y){
		if (x < 0 || x > map_width || y < 0 || y > map_height){
			return true;
		}
		var mapGridIndexX = Math.floor(x/TILE_SIZE);
		var mapGridIndexY = Math.floor(y/TILE_SIZE);
		
		return this.grid[mapGridIndexY][mapGridIndexX];
	}
}

class Player{
	constructor(){
		this.pos = createVector(map_width/2,0,map_height/2);
		this.rotationAngle = 0
		this.rotationDelta = 0;	// change in rotation per update
		this.moveSpeed = 4.0;
		this.turnDirection = 0;	//-1:left, 1:right
		this.rotationSpeed = 3 * (Math.PI/180);	//degrees per frame
		this.walkDirection = 0;	//-1:backwards, 1:forwards
		}		
	update(){
		this.rotationDelta = this.turnDirection*this.rotationSpeed;
		this.rotationAngle += this.rotationDelta;
		
		camera.pan(-this.rotationDelta);		
		
		var moveStep = this.walkDirection*this.moveSpeed;

		camera.move(0,0,-moveStep);
	
/*
		if (moveStep != 0 || this.rotationDelta != 0){
		console.log("XYZ: " + camera.eyeX + ", " + camera.eyeY + ", " + camera.eyeZ);	
		console.log("CENTERXYZ: " + camera.centerX + ", " + camera.centerY + ", " + camera.centerZ);	
		}
*/
		var newX = this.pos.x + Math.cos(this.rotationAngle) * moveStep;
		var newZ = this.pos.z + Math.sin(this.rotationAngle) * moveStep;
		
		this.pos.x = newX;
		this.pos.z = newZ;
	
		//this.pos.set(x,y);
	}
}

function keyPressed(){
	if (keyCode == UP_ARROW){
	player.walkDirection = 1;	
	} else if (keyCode == DOWN_ARROW){
	player.walkDirection = -1;	
	} else if (keyCode == RIGHT_ARROW){
	player.turnDirection = 1;
	} else if (keyCode == LEFT_ARROW){
	player.turnDirection = -1;
	}
}
function keyReleased(){
	if (keyCode == UP_ARROW){
	player.walkDirection = 0;	
	} else if (keyCode == DOWN_ARROW){
	player.walkDirection = 0;	
	} else if (keyCode == RIGHT_ARROW){
	player.turnDirection = 0;
	} else if (keyCode == LEFT_ARROW){
	player.turnDirection = 0;
	}
}


let angle = 0;

function setup() {
  createCanvas(400, 300, WEBGL);


camera = createCamera() ;

player = new Player();

level = new Level();
	
camera.setPosition(0.25 * level.grid_width * TILE_SIZE, 0, 0.5 * level.grid_height*TILE_SIZE);
camera.pan(Math.PI);


}


function draw() {

	player.update();

  background(175);


 ambientLight(0, 0, 255);

	//let x = map(mouseX,0,width, -200,0)


	// der er en udfordring med globale vs lokale coordinater her:

	//camera.pan(player.rotationDelta);

	//camera.setPosition(player.pos.x,player.pos.y,player.pos.z);




	//camera(x,0,(height/2)/tan(PI/6),0,0,0,0,1,0);
/*
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 255);
  //translate(0, 0, mouseX);
  //rotateX(angle);
  //rotateY(angle * 0.3);
  //rotateZ(angle * 1.2);
  normalMaterial();
  box(150, 150);
*/

	for (let x = 0; x < level.grid_width; x++){
		for (let y = 0; y < level.grid_height; y++){
			if (level.grid[y][x] != 0){
				push();
				translate(x*TILE_SIZE, 0, y*TILE_SIZE);
				noStroke();
				fill(0, 0, 255);
				normalMaterial();
				box(TILE_SIZE, TILE_SIZE);
				pop();
			}
		}
	}

	push();
	ambientMaterial(125);			
	translate(0.5 * level.grid_width * TILE_SIZE, 0.5 * TILE_SIZE, 0.5 * level.grid_height*TILE_SIZE);
	rotateX(PI/2);
	plane(level.grid_width * TILE_SIZE,level.grid_height*TILE_SIZE);
	pop();

  angle += 0.07;
}
