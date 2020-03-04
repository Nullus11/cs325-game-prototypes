"use strict";

function make_mainmenu_game_state(game)
{
    var enterText;
    var machine;
    var scale = 1.35;
    var music;
    function preload()
    {
        this.load.audio('music','assets/music.mp3');//https://www.youtube.com/watch?v=uZmtKrpYLL0
        this.load.image('machine','assets/machine.png');//https://thumbs.dreamstime.com/b/gaming-arcade-machine-blank-screen-your-design-d-rend-extreme-closeup-rendering-127186470.jpg
    }
    function create ()
    {
        music = this.sound.add('music');
        music.play({volume:.5,loop:true});
        machine = this.add.image(200,200,'machine').setScale(scale);
        machine.setDepth(0);
        enterText =this.add.text(110,200,"Press Enter To Start",{fontSize: '16px', fill: 'white'});
        this.time.addEvent({delay:1000,loop:true,callback:function(){
            enterText.setColor("black");
            this.time.addEvent({delay:500,callback:function(){
                enterText.setColor("white");
            },callbackScope:this});
        },callbackScope:this});

        
        this.input.keyboard.on('keydown-' + 'ENTER',function(){
            enterText.setVisible(false);
            this.time.addEvent({delay:50,loop:true,callback:function(){
                scale = scale + .05;
                machine.setScale(scale);
            },callbackScope:this});
            this.time.addEvent({delay:2000,callback:function(){
                this.scene.switch("game");
            },callbackScope:this});
        
        
        },this);
        
    }
    return {preload: preload, create: create};
}
function make_gameover_game_state(game)
{
    var enterText;
    var gameover;
    var machine;
    var scale = 2.5;
    var scale2 = 1.5;
    function preload ()
    {
        this.load.image('machine','assets/machine.png');//https://thumbs.dreamstime.com/b/gaming-arcade-machine-blank-screen-your-design-d-rend-extreme-closeup-rendering-127186470.jpg
        this.load.image('gameover','assets/gameover.png');//https://cdn.weasyl.com/~tokoyami/submissions/1624479/59e26bb8a08663384cc409703949a1baf09de06cfddd4601c5bf96ae2222d1c8/tokoyami-game-over-transparent-f2u.png
    }
    function create ()
    {
        machine = this.add.sprite(200,200,'machine').setScale(scale);
        gameover = this.add.sprite(200,225,'gameover').setScale(scale2);
        this.time.addEvent({delay:50,callback:function(){
            scale = scale - .05;
            scale2 = scale2 -.05;
            machine.setScale(scale);
            gameover.setScale(scale2);
        },callbackScope:this,repeat:20});
        
        
    }
    return {preload: preload,create: create};
}

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
    var alpha1 = 0;
    var music;
    var lasersound;
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

        this.load.audio('lasersound','assets/lasersound.mp3');//https://www.soundfishing.eu/sound/laser-gun
    }
    function create ()
    {

        lasersound = this.sound.add('lasersound');
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
        hit = this.add.image(target.x,300,'hit').setScale(10);
        hit.setDepth(3);
        hit.setVisible(false);
        
        space.setAlpha(alpha1);
        space1.setAlpha(alpha1);
        space2.setAlpha(alpha1);
        target.setAlpha(alpha1);
        cockpit.setAlpha(alpha1);

        this.time.addEvent({delay:50,callback:function(){
            alpha1 = alpha1 +.1;
            space.setAlpha(alpha1);
            space1.setAlpha(alpha1);
            space2.setAlpha(alpha1);
            target.setAlpha(alpha1);
            cockpit.setAlpha(alpha1);

        },callbackScope:this,repeat:10});


        rocks = this.add.group();
        bullets = this.add.group();
    
        target.body.debuShowVelocity = false;
        target.body.debugShowBody = false;
        myCam = this.cameras.main;
        this.cameras.main.startFollow(target);
    
         this.input.keyboard.on('keydown-' + 'SPACE', shoot,this);
        this.time.addEvent({delay:2000,loop:true,callback:createRock,callbackScope:this});
    
        this.input.keyboard.on('keydown-' + 'Q',function(){
            this.time.addEvent({delay:50,callback:function(){
                alpha1 = alpha1 -.1;
                space.setAlpha(alpha1);
                space1.setAlpha(alpha1);
                space2.setAlpha(alpha1);
                target.setAlpha(alpha1);
                cockpit.setAlpha(alpha1);
    
            },callbackScope:this,repeat:10});
            this.time.addEvent({delay:1000,callback:function(){
                this.scene.switch("gameover");
            },callbackScope:this});
        },this);
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
                                rock.setVisible(false);
                                rock1.setVisible(false);
                                rock2.setVisible(false);
                                this.time.addEvent({delay:50,callback:function(){
                                    alpha1 = alpha1 -.1;
                                    space.setAlpha(alpha1);
                                    space1.setAlpha(alpha1);
                                    space2.setAlpha(alpha1);
                                    target.setAlpha(alpha1);
                                    cockpit.setAlpha(alpha1);
                        
                                },callbackScope:this,repeat:10});
                                this.time.addEvent({delay:1000,callback:function(){
                                    this.scene.switch("gameover");
                                },callbackScope:this});

    
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
    
            lasersound.play({volume:1});
            this.time.addEvent({delay:50,callback: function()
                {
                    bullet.destroy();
                },callbackScope:this});
        }
    }

    return { preload: preload, create: create, update: update,createRock: createRock,explode: explode, shoot: shoot};
}

  

window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    var config = {
        type: Phaser.AUTO,
        width: 400,
        height: 400,
        parent: 'game',
        physics: {
            default: 'arcade'
    
        }
    };

    var game = new Phaser.Game(config);
    
    
    game.scene.add("main",make_mainmenu_game_state(game));
    game.scene.add("game",make_main_game_state(game));
    game.scene.add("gameover",make_gameover_game_state(game));
    game.scene.start("main");
    
};
