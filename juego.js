var nave;
var balas;
var tiempoEntreBalas = 400;
var tiempo = 0;
var malos;
var timer;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var fondoJuego

var Juego={
	preload: function () {
		juego.load.image('nave','img/nave4.png');
		juego.load.image('laser','img/laser2.png');
		juego.load.image('malo','img/alin2.png');
		juego.load.image('bg','img/space.png');
		juego.load.audio('colision','audio/explosion.mp3');
		juego.load.audio('laser','audio/laser.mp3');
	},

	create: function(){
		fondoJuego = juego.add.tileSprite(0,0,400,540,'bg');
		juego.physics.startSystem(Phaser.Physics.ARCADE);

		cursores=juego.input.keyboard.createCursorKeys();

		nave = juego.add.sprite(juego.width/2,485,'nave');
		juego.physics.arcade.enable(nave);
		nave.body.collideWorldBounds= true;
		nave.anchor.setTo(0.5);
		juego.physics.arcade.enable(nave,true);

		balas=juego.add.group();
		balas.enableBody=true;
		balas.physicsBodyType=Phaser.Physics.ARCADE;
		balas.createMultiple(20,'laser');
		balas.setAll('anchor.x',0.5);
		balas.setAll('anchor.y',0.5);
		balas.setAll('outOfBoundsKill',true);
		balas.setAll('checkWorldBounds',true);

		malos=juego.add.group();
		malos.enableBody=true;
		malos.physicsBodyType=Phaser.Physics.ARCADE;
		malos.createMultiple(30,'malo');
		malos.setAll('anchor.x',0.5);
		malos.setAll('anchor.y',0.5);
		malos.setAll('outOfBoundsKill',true);
		malos.setAll('checkWorldBounds',true);

		timer = juego.time.events.loop(2000,this.crearEnemigo,this);

		puntos = 0;
		juego.add.text(20,20,"Puntos: ",{font:"14px Arial", fill:"#FFF"});
		txtPuntos = juego.add.text(80,20,"0",{font:"14px Arial",fill:"#FFF"});

		vidas = 3;
		juego.add.text(310,20,"Vidas:",{font:"14px Arial", fill:"#FFF"});
		txtVidas = juego.add.text(360,20,"3",{font:"14px Arial",fill:"#FFF"});

		juego.add.text(0,525,"DIEGO ACHO",{font:"14px Arial", fill:"#FFF"});

	},

	update: function(){
		fondoJuego.tilePosition.y+=1;
		if (cursores.right.isDown) {
			nave.position.x+=3;
		}
		else if (cursores.left.isDown) {
			nave.position.x-=3;
		}

		nave.rotation = juego.physics.arcade.angleToPointer(nave) + Math.PI/2;
		if (juego.input.activePointer.isDown) {
			this.disparar();
		}

		juego.physics.arcade.overlap(balas,malos,colision,null,this);

		malos.forEachAlive(function(m){
			if (m.position.y > 520 && m.position.y < 521) {
					vidas -= 1;
					txtVidas.text = vidas;
				}
			});

			if (vidas ==0) {
				juego.state.start('Terminado');
			}
	},

	disparar: function(){
		if (juego.time.now > tiempo && balas.countDead() > 0) {
			tiempo = juego.time.now + tiempoEntreBalas;
			var bala = balas.getFirstDead();
			bala.anchor.setTo(0.5);
			bala.reset(nave.x, nave.y);
			bala.rotation = juego.physics.arcade.angleToPointer(bala) + Math.PI/2;
			juego.physics.arcade.moveToPointer(bala, 200);
			var sonido = juego.sound.add('laser');
			sonido.play();
		}
	},

	crearEnemigo: function(){
		var enem = malos.getFirstDead();
		var num = Math.floor(Math.random()*10 + 1);
		enem.reset(num*38,0);
		enem.anchor.setTo(0.5);
		enem.body.velocity.y = 100;
		enem.checkWorldBounds = true;
		enem.outOfBoundsKill = true;
	}

};

function colision(b,e){
	b.kill();
	if (e.kill()) {
		var sonidoColi = juego.sound.add('colision');
		sonidoColi.play();
	}
	puntos++;
	txtPuntos.text = puntos;
}