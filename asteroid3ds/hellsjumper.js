var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend:{
            createRock: createRock,
            explode: explode,
            shoot: shoot
        }
    }
};

new Phaser.Game(config);
var health = 10;
var score = 0;
var healthText;
var scoreText;
var rock1;
var rock2;
function preload ()
{
    this.physics.world.setBounds(0,0,1440,400);
    this.load.image('background','assets/background.png');//https://i.stack.imgur.com/WYuA2.jpg
    this.load.image('jumper','assets/images.png');
    this.load.image('jumper2','assets/jumper2.png');
    this.load.image('laser', 'assets/laser.png');//https://ya-webdesign.com/images250_/laser-sprite-png-6.png
    this.load.image('cockpit','assets/cockpit.png');
}
function create ()
{
    space = this.add.tileSprite(0,0,1440,500,'background');
    space1 = this.add.tileSprite(1440,0,1440,500,'background');
    space2 = this.add.tileSprite(-1440,0,1440,500,'background');
    space.setOrigin(0,0);
    space1.setOrigin(0,0);
    space2.setOrigin(0,0);
    target = this.physics.add.image(200,300,'jumper').setScale(.25);
    target.setVisible(false);
    cockpit = this.add.sprite(target.x,300,'cockpit');
    cockpit.setDepth(1);

    healthText = this.add.text(target.x-50,100,'Health: ' + health, {fontSize: '16px', fill: 'white'});
    healthText.setDepth(2);
    scoreText = this.add.text(target.x-50,116,'Score: ' + score, {fontSize: '16px', fill: 'white'});
    scoreText.setDepth(2);
    
    rocks = this.add.group();
    bullets = this.add.group();

    target.body.debuShowVelocity = false;
    target.body.debugShowBody = false;
    myCam = this.cameras.main;
    this.cameras.main.startFollow(target);

     this.input.keyboard.on('keydown-' + 'SPACE', shoot,this);
    this.time.addEvent({delay:2000,loop:true,callback:createRock,callbackScope:this});
}

function update ()
{

    cursor = this.input.keyboard.createCursorKeys();
    if(cursor.left.isDown)
    {
        target.x = target.x -10;
        cockpit.x = target.x;
        healthText.x = healthText.x - 10;
        scoreText.x = scoreText.x - 10;
    }

    if(cursor.right.isDown)
    {
        target.x = target.x + 10;
        cockpit.x = target.x;
        healthText.x = healthText.x + 10;
        scoreText.x = scoreText.x + 10;
    }

    if(target.x < 0)
    {
        target.x = 1440;
        healthText.x = target.x-50;
        scoreText.x = target.x-50;

        
    }
    if(target.x > 1440)
    {
        target.x = 0;
        healthText.x = target.x-50;
        scoreText.x = target.x-50;
    }

    
}
function createRock ()
{
    var xpos = Phaser.Math.Between(0,1440);
    var scale = .01;
    var close = 0;
    var rock = this.physics.add.image(xpos,300,'jumper2').setScale(scale);
    var rock1 = this.physics.add.image(xpos-1440,300,'jumper2').setScale(scale);
    var rock2 = this.physics.add.image(xpos + 1440,300,'jumper2').setScale(scale);
    
rock.body.debuShowVelocity = false;
rock1.body.debuShowVelocity = false;
rock2.body.debuShowVelocity = false;
rock.body.debugShowBody = false;
rock1.body.debugShowBody = false;
rock2.body.debugShowBody = false;


    this.time.addEvent({delay:100,callback: function()
    {

            scale = scale + .005;
            rock.setScale(scale);

                rock1.setScale(scale);
                rock2.setScale(scale);
   

            if(rock.active === true)
            {
                close = close + 1;
                if(close === 36)
                {
                    rock.setActive(false).setVisible(false);

                        rock1.setActive(false).setVisible(false);
                        rock2.setActive(false).setVisible(false);
      
                    health = health - 1;
                    healthText.setText('Health: '+ health);
                }
            }

        if(rock.active === false && rock1.active === true && rock2.active === true)
        {
            rock2.setActive(false).setVisible(false);
            rock1.setActive(false).setVisible(false);
        }
        
        
    },callbackScope: this, repeat: 36});

    rocks.add(rock);
 
}
function explode (bullet,rock)
{

    rock.setActive(false).setVisible(false);
    rock.destroy();
    score +=  100;
    scoreText.setText('Score: ' + score);

}
function shoot()
{

        var bullet = this.physics.add.sprite(target.x,target.y,'laser').setScale(.1);
        bullet.body.debuShowVelocity = false;
        bullet.body.debugShowBody = false;
        bullet.setDepth();
        this.physics.add.collider(bullet,rocks,explode);

        this.time.addEvent({delay:50,callback: function()
            {
                bullet.destroy();
            },callbackScope:this});
    
}
