var juego = new Phaser.Game(550,600, Phaser.CANVAS,'bloque_juego');
var fondoJuego;
var nave;
var cursores;
var balas;
var tiempoBala=0;
var botonDisparo;
var enemigos;
var texto;
var style;
var musicaFondo;

var estadoPrincipal={
	preload: function(){
		juego.load.image('fondo','img/espacio.png');
		juego.load.image('personaje','img/nave.png');
		juego.load.image('laser','img/laser2.png');
		juego.load.image('enemigo','img/en2.png');
		juego.load.image('enemigo2','img/en1.png');
		juego.load.image('enemigo3','img/en3.png');
		juego.load.image('enemigo4','img/en4.png');
		juego.load.image('enemigo5','img/en5.png');
		juego.load.audio('snd','audio/disparo.mp3');
		juego.load.audio('colision','audio/colision.mp3');
		juego.load.audio('musica','audio/musicafondo.mp3');
	},

	create: function(){
		fondoJuego = juego.add.tileSprite(0,0,550,600,'fondo');

		musicaFondo = juego.sound.add('musica');

		nave = juego.add.sprite(juego.width/2,550,'personaje');
		nave.anchor.setTo(0.5);

		cursores=juego.input.keyboard.createCursorKeys();
		botonDisparo=juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		juego.physics.arcade.enable(nave);
		nave.body.collideWorldBounds= true;

		balas=juego.add.group();
		balas.enableBody=true;
		balas.physicsBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(20,'laser');
		balas.setAll('anchor.x',0.5);
		balas.setAll('anchor.y',3);
		balas.setAll('outOfBoundsKill',true);
		balas.setAll('checkWorldBounds',true);

		texto = juego.add.text(0,525,"DIEGO ACHO ",{font:"20px Arial", fill:"#000000", align:"center"});

		enemigos=juego.add.group();
		enemigos.enableBody=true;
		enemigos.physicsBodyType=Phaser.Physics.ARCADE;
	

		enemigos2=juego.add.group();
		enemigos2.enableBody=true;
		enemigos2.physicsBodyType=Phaser.Physics.ARCADE;
		enemigos2.createMultiple(30,'enemig2');
		enemigos2.setAll('anchor.x',0.5);
		enemigos2.setAll('anchor.y',0.5);
		enemigos2.setAll('outOfBoundsKill',true);
		enemigos2.setAll('checkWorldBounds',true);

		enemigos3=juego.add.group();
		enemigos3.enableBody=true;
		enemigos3.physicsBodyType=Phaser.Physics.ARCADE;
		enemigos3.createMultiple(30,'enemigo3');
		enemigos3.setAll('anchor.x',0.5);
		enemigos3.setAll('anchor.y',0.5);
		enemigos3.setAll('outOfBoundsKill',true);
		enemigos3.setAll('checkWorldBounds',true);

		enemigos4=juego.add.group();
		enemigos4.enableBody=true;
		enemigos4.physicsBodyType=Phaser.Physics.ARCADE;
		enemigos4.createMultiple(30,'enemigo4');
		enemigos4.setAll('anchor.x',0.5);
		enemigos4.setAll('anchor.y',0.5);
		enemigos4.setAll('outOfBoundsKill',true);
		enemigos4.setAll('checkWorldBounds',true);

		enemigos5=juego.add.group();
		enemigos5.enableBody=true;
		enemigos5.physicsBodyType=Phaser.Physics.ARCADE;

		for (var y = 0; y < 1; y++) {
			for (var x = 0; x < 8; x++) {
				var enemigo5 = enemigos5.create(x*60,y*30,'enemigo');
				enemigo5.anchor.setTo(0.5)
			}
		}

		for (var y = 0; y < 1; y++) {
			for (var x = 0; x < 8; x++) {
				var enemigo = enemigos.create(x*60,y*30,'enemigo5');
				enemigo.anchor.setTo(0.5)
			}
		}
		for (var y = 0; y < 1; y++) {
			for (var x = 0; x < 8; x++) {
				var enemigo2 = enemigos2.create(x*60,y*120,'enemigo2');
				enemigo2.anchor.setTo(0.5)
			}
		}

		for (var y = 0; y < 1; y++) {
			for (var x = 0; x < 8; x++) {
				var enemigo3 = enemigos3.create(x*60,y*120,'enemigo3');
				enemigo3.anchor.setTo(0.5)
			}
		}

		for (var y = 0; y < 1; y++) {
			for (var x = 0; x < 8; x++) {
				var enemigo4 = enemigos4.create(x*60,y*120,'enemigo4');
				enemigo4.anchor.setTo(0.5)
			}
		}

		enemigos.x=50;
		enemigos.y=65;

		enemigos2.x=50;
		enemigos2.y=95;

		enemigos3.x=50;
		enemigos3.y=125;

		enemigos4.x=50;
		enemigos4.y=155;

		enemigos5.x=50;
		enemigos5.y=30;

		var animacion=juego.add.tween(enemigos).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);
		var animacion=juego.add.tween(enemigos2).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);
		var animacion=juego.add.tween(enemigos3).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);
		var animacion=juego.add.tween(enemigos4).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);
		var animacion=juego.add.tween(enemigos5).to({x:100},1000,Phaser.Easing.Linear.None,true,0,1000,true);

		musicaFondo.loop = true;
		musicaFondo.play();


	},

	update:function(){
		if (cursores.right.isDown) {
			nave.position.x+=3;
		}
		else if (cursores.left.isDown) {
			nave.position.x-=3;
		}

		var bala;
		if (botonDisparo.isDown) {
			if (juego.time.now > tiempoBala) {
				bala=balas.getFirstExists(false);
				var sonido = juego.sound.add('snd');
				sonido.play();
			}
			if (bala) {
				bala.reset(nave.x, nave.y);
				bala.body.velocity.y=-300;
				tiempoBala=juego.time.now +100;
			}
		}

		juego.physics.arcade.overlap(balas,enemigos,colision,null,this);
		juego.physics.arcade.overlap(balas,enemigos2,colision,null,this);
		juego.physics.arcade.overlap(balas,enemigos3,colision,null,this);
		juego.physics.arcade.overlap(balas,enemigos4,colision,null,this);
		juego.physics.arcade.overlap(balas,enemigos5,colision,null,this);
		
	}

};

function colision(bala,enemigo){
	bala.kill();
	if (enemigo.kill()) {
		var sonidoColi = juego.sound.add('colision');
		sonidoColi.play();
	}
}

function colision2(bala,enemigo2){
	bala.kill();
	if (enemigo2.kill()) {
		var sonidoColi = juego.sound.add('colision');
		sonidoColi.play();
	}
}

function colision3(bala,enemigo3){
	bala.kill();
	if (enemigo3.kill()) {
		var sonidoColi = juego.sound.add('colision');
		sonidoColi.play();
	}
}
function colision4(bala,enemigo4){
	bala.kill();
	if (enemigo4.kill()) {
		var sonidoColi = juego.sound.add('colision');
		sonidoColi.play();
	}
}
function colision5(bala,enemigo5){
	bala.kill();
	if (enemigo5.kill()) {
		var sonidoColi = juego.sound.add('colision');
		sonidoColi.play();
	}
}

juego.state.add('principal',estadoPrincipal);
juego.state.start('principal');