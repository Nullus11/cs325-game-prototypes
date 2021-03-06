"use strict";

function make_main_game_state(game)
{
    var health = 10;
    var score = 0;
    var healthText;
    var scoreText;
    var target;
    var hit;
    var space;
    var space1;
    var space2;
    var target;
    var cockpit;
    var gameover;
    var rocks;
    var bullets;
    var myCam;
    var cursor;
    function preload ()
    {
        this.physics.world.setBounds(0,0,1440,400);
        this.load.image('background','assets/background.png');//https://i.stack.imgur.com/WYuA2.jpg
        this.load.image('jumper','assets/images.png');
        this.load.image('jumper2','assets/cat1.png');//https://www.pngkey.com/png/full/3-33235_cat-png-transparent-image-flying-cat-transparent-background.png
        this.load.image('jumper3','assets/cat2.png');//https://www.seekpng.com/png/detail/95-953803_cat-flying-flyingcat-orangecat-orange-color-play-image.png
        this.load.image('jumper4','assets/cat3.png');//https://www.pngkit.com/png/detail/58-582723_cat-forty-one-flying-cat-png.png
        this.load.image('laser', 'assets/laser.png');//https://ya-webdesign.com/images250_/laser-sprite-png-6.png
        this.load.image('cockpit','assets/cockpit.png');//https://img.swcombine.com/ships/27/cockpit.gif
        this.load.image('gameover','assets/gameover.png');//https://cdn.weasyl.com/~tokoyami/submissions/1624479/59e26bb8a08663384cc409703949a1baf09de06cfddd4601c5bf96ae2222d1c8/tokoyami-game-over-transparent-f2u.png
        this.load.image('hit','assets/hit.png');//https://www.fellowshipbbc.org/wp-content/uploads/2013/05/Semitransparent-red-background-80-percent-opacity.png
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
        gameover = this.add.sprite(target.x-320,target.y-200,'gameover').setScale(.5);
        gameover.setOrigin(0,0);
        gameover.setDepth(3);
        gameover.setVisible(false);
        healthText = this.add.text(target.x-50,100,'Health: ' + health, {fontSize: '16px', fill: 'white'});
        healthText.setDepth(2);
        scoreText = this.add.text(target.x-50,116,'Score: ' + score, {fontSize: '16px', fill: 'white'});
        scoreText.setDepth(2);
        hit = this.add.image(target.x,300,'hit').setScale(10);
        hit.setDepth(3);
        hit.setVisible(false);
        
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
            gameover.x = gameover.x - 10;
        }
    
        if(cursor.right.isDown)
        {
            target.x = target.x + 10;
            cockpit.x = target.x;
            healthText.x = healthText.x + 10;
            scoreText.x = scoreText.x + 10;
            gameover.x = gameover.x + 10;
        }
    
        if(target.x < 0)
        {
            target.x = 1440;
            healthText.x = target.x-50;
            scoreText.x = target.x-50;
            gameover.x = target.x-320;
            
        }
        if(target.x > 1440)
        {
            target.x = 0;
            healthText.x = target.x-50;
            scoreText.x = target.x-50;
            gameover.x = target.x-320;
        }
    
        
    }
    function createRock ()
    {
        if(target.active === true)
        {
            var xpos = Phaser.Math.Between(0,1440);
            var scale = .01;
            var close = 0;
            var rock = this.physics.add.sprite(xpos,300,'jumper2').setScale(scale);
            var rock1 = this.physics.add.sprite(xpos-1440,300,'jumper2').setScale(scale);
            var rock2 = this.physics.add.sprite(xpos + 1440,300,'jumper2').setScale(scale);
            var random = Phaser.Math.Between(1,3);
            if(random === 1)
            {
                rock.setTexture('jumper2');
                rock2.setTexture('jumper2');
                rock1.setTexture('jumper2');
            }
            if(random === 2)
            {
                rock.setTexture('jumper3');
                rock2.setTexture('jumper3');
                rock1.setTexture('jumper3');
            }
            if(random === 3)
            {
                rock.setTexture('jumper4');
                rock2.setTexture('jumper4');
                rock1.setTexture('jumper4');
            }
            var rotate = 0;
            this.time.addEvent({delay:10,loop:true, callback:function(){
                rotate = rotate + 1;
                rock.angle =rotate;
                rock1.angle =rotate;
                rock2.angle =rotate;
            },callbackScope:this});


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


                            hit.setPosition(target.x,300);
                            hit.setVisible(true);
                            var alpha = 1;
                            if(target.active === true)
                            {
                                this.time.addEvent({delay:50,callback: function()
                                {
                                    //hit.setVisible(false);
                                    hit.setAlpha(alpha);
                                    alpha = alpha - .1;
                                },callbackScope: this,repeat: 10});
                            }
                            if(health > 0)
                                health = health - 1;
                            
                            if(health === 0)
                            {
                                target.setActive(false);
                                gameover.setVisible(true);
    
                            }
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
        if(target.active === true)
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
    }

    return { preload: preload, create: create, update: update,createRock: createRock,explode: explode, shoot: shoot};
};


