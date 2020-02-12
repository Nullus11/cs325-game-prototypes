var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1200,
    height: 1600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
                    player: null,
                    healthpoints: null,
                    reticle: null,
                    moveKeys: null,
                    playerBullets: null,
                    enemyBullets: null,
                    time: 0,
                }
    }
};

var game = new Phaser.Game(config);

var life = 10;
var lifeText;
var score = 0;
var scoreText;
var games = 'GAME OVER';
var gameOver;



var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'dick');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});
var enemy;
var player;
var isTrue = false;
var x =500;
function preload ()
{
    // Load in images and sprites
    this.load.spritesheet('dickbutt', 'assets/dickbutt.png', //https://images-na.ssl-images-amazon.com/images/I/41QD6RBYQNL._AC_SY450_.jpg
        { frameWidth: 1000, frameHeight: 800 }
    );
    this.load.image('dick', 'assets/dick.png');
    this.load.image('reticle', 'assets/reticle.png');
    this.load.image('sky', 'assets/sky.png'); //https://image.shutterstock.com/image-vector/mountain-forest-meadow-landscape-260nw-691272007.jpg
    this.load.image('potato', 'assets/potato.png'); //https://www.google.com/search?q=rape+potato&tbm=isch&ved=2ahUKEwi61eDHucznAhUBNd8KHdpZCm4Q2-cCegQIABAA&oq=rape+potato&gs_l=img.3...4401.4540..4803...0.0..0.149.149.0j1......0....1..gws-wiz-img.Ck0x62roI1U&ei=8ClEXrqdN4Hq_Abas6nwBg&bih=746&biw=682#imgrc=9hI8cSBBiB9jPM
    this.load.audio('music','assets/dickbutt.mp3'); //https://www.youtube.com/watch?v=AmYrTp-JdnY
}

function create ()
{
    // Set world bounds
    this.physics.world.setBounds(0, 0, 1200, 1600);

    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
  

    var valuex = Phaser.Math.Between(10, 1190);
  
    // Add background player, enemy, reticle, healthpoint sprites
    music = this.sound.add('music');
    background = this.add.image(600, 800, 'sky');
    player = this.physics.add.sprite(600, 1500, 'dickbutt');
    enemy = this.physics.add.sprite(valuex, 0, 'potato');
    reticle = this.physics.add.sprite(800, 700, 'reticle');
    lifeText = this.add.text(16,16, 'Life: 10', {fontSize: '64px', fill: '#000'});
    gameOver = this.add.text(250,800, 'GAME OVER', {fontSize: '128px', fill: '#000'});
    gameOver.setActive(false).setVisible(false);
    scoreText = this.add.text(16,64, 'Score: ' + score, {fontSize: '64px', fill: '#000'});

    // Set image/sprite properties
    background.setOrigin(0.5, 0.5).setDisplaySize(1200, 1600);
    player.setOrigin(0.5, 0.5).setDisplaySize(200, 300).setCollideWorldBounds(true).setDrag(500, 500);
    enemy.setOrigin(0.5, 0.5).setDisplaySize(300, 200).setCollideWorldBounds(true);
    reticle.setOrigin(0.5, 0.5).setDisplaySize(50, 50).setCollideWorldBounds(true);
    x = x+50;
    enemy.setGravityY(x);
    // Set sprite variables
    enemy.health = 1;
    player.health = 10;

    music.play({volume:.3,loop: true});
    

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
 

        // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);

        if (bullet.active === true && player.active === true)
        {
            bullet.fire(player, reticle);
            this.physics.add.collider(enemy, bullet, enemyHitCallback);
        }
    }, this);

    // Pointer lock will only work after mousedown
    
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when Q or escape (by default) is pressed.
    this.input.keyboard.on('keydown_Q', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            reticle.x += pointer.movementX;
            reticle.y += pointer.movementY;
        }
    }, this);



}

function enemyHitCallback(enemy, bullet)
{
    // Reduce health of enemy
    if (bullet.active === true && enemy.active === true)
    {
        enemy.health = enemy.health - 1;
        console.log("Enemy hp: ", enemy.health);

        // Kill enemy if health <= 0
        if (enemy.health <= 0)
        {
           enemy.destroy();
            score = score + 10;
            scoreText.setText('Score: '+ score);
           isTrue = true;
           
        }

        bullet.destroy();
    }

}




// Ensures reticle does not move offscreen
function constrainReticle(reticle)
{
    var distX = reticle.x-player.x; // X distance between player & reticle
    var distY = reticle.y-player.y; // Y distance between player & reticle

    // Ensures reticle cannot be moved offscreen (player follow)
    if (distX > 1600)
        reticle.x = player.x+1600;
    else if (distX < -1600)
        reticle.x = player.x-1600;

    if (distY > 1600)
        reticle.y = player.y+1600;
    else if (distY < -1600)
        reticle.y = player.y-1600;
}

function update (time, delta)
{
   reticle.setDepth(1);
if(isTrue === true && player.active === true)
{
    var valuex = Phaser.Math.Between(0, 1200);
    enemy = this.physics.add.sprite(valuex, 0, 'potato');
    enemy.setOrigin(0.5, 0.5).setDisplaySize(300, 200).setCollideWorldBounds(true);
    enemy.setGravityY(x);
    x=x+50;
    // Set sprite variables
    enemy.health = 1;

    isTrue = false;
}


if(enemy.y >= 1285 && enemy.active === true && player.active === true)
{
    
    enemy.destroy();
    loseLife(player);
    isTrue = true;
    
}

        // Rotates player to face towards reticle
    player.rotation = Phaser.Math.Angle.Between(player.x, player.y, reticle.x, reticle.y);

    

    //Make reticle move with player
    reticle.body.velocity.x = player.body.velocity.x;
    reticle.body.velocity.y = player.body.velocity.y;

   

    // Constrain position of constrainReticle
    constrainReticle(reticle);


    

}
function loseLife(player)
{
    player.health = player.health - 1;
    life -= 1;
    lifeText.setText('Life: ' + life);
    
    if(player.health <= 0)
    {
        player.setActive(false).setVisible(false);
        gameOver.setActive(true).setVisible(true);
        isTrue = false;
    }
    
}

