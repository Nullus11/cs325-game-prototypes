"use strict";

function make_mainmenu_game_state(game)
{
    var enterText;
    var machine;
    var scale = 1.35;
    function preload()
    {
       
        this.load.image('machine','assets/machine.png');//https://thumbs.dreamstime.com/b/gaming-arcade-machine-blank-screen-your-design-d-rend-extreme-closeup-rendering-127186470.jpg
    }
    function create ()
    {

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
    var youwin;
    var machine;
    var scale = 2.5;
    var scale2 = 1.5;
    function preload ()
    {
        this.load.image('machine','assets/machine.png');//https://thumbs.dreamstime.com/b/gaming-arcade-machine-blank-screen-your-design-d-rend-extreme-closeup-rendering-127186470.jpg
        this.load.image('youwin','assets/youwin.png');//https://www.vectorstock.com/royalty-free-vector/video-game-pixelated-3d-font-8-bit-pixel-art-old-vector-20684953
    }
    function create ()
    {
        machine = this.add.sprite(200,200,'machine').setScale(scale);
        youwin = this.add.sprite(200,175,'youwin').setScale(scale2);
        this.time.addEvent({delay:50,callback:function(){
            scale = scale - .05;
            scale2 = scale2 -.05;
            machine.setScale(scale);
            youwin.setScale(scale2);
        },callbackScope:this,repeat:20});
        
        
    }
    return {preload: preload,create: create};
}

function make_main_game_state(game)
{
   var chicken;
   var chickenScale= 0.25;
   var cluck;
   var spawn = false;
   var pointer;
   var light;
   var bedroom;
    function preload ()
    {
      this.load.image('chicken','assets/chicken.png');
      this.load.image('blackcock','assets/blackcock.png');
      this.load.audio('cluck','assets/cluck.mp3');
      this.load.image('light','assets/light.png');
      this.load.image('bedroom','assets/bedroom.jpg');//https://pallabipal.files.wordpress.com/2011/12/background.jpg
    
    }
    function create ()
    {
        cluck = this.sound.add('cluck');
        chicken = this.add.sprite(200,200,'blackcock').setScale(chickenScale); 
        //chicken.setInteractive();
        chicken.setOrigin(0.5,0.5);
       //this.input.on('gameobjectdown',function(){
        pointer = this.input.activePointer;
        this.input.on('pointerdown', function(){
            if(Math.abs(chicken.x-pointer.x) < (chickenScale * 100) && Math.abs(chicken.y-pointer.y) < (chickenScale * 100))
            {
           
                cluck.stop();
                chicken.setDepth(1);
                chicken.setTexture('chicken');
                spawn = true;
                chickenScale = chickenScale - .05;
            }
        });

  

        //});
        bedroom = this.add.image(200,200,'bedroom');
       

        light = this.add.sprite(600,600,'light').setScale(.5);
        this.time.addEvent({delay:1000,loop: true,callback: function(){
            if(spawn === false)
            {
                var volumx = 1 - (.005*(Phaser.Math.Difference(chicken.x,pointer.x)));
                var volumy = 1 - (.005*(Phaser.Math.Difference(chicken.y,pointer.y)));
                var volum = volumx+volumy;

                cluck.play({volume: volum});
            }
        },callbackScope:this});



    this.input.keyboard.on('keydown-' + 'ENTER',function(){
                chicken.setTexture('chicken');
            });


   
             
 

    }
    
    function update ()
    {
        light.x = pointer.x;
        light.y = pointer.y;
        if(chickenScale - 0.05 < 0)
        {
            this.scene.switch("gameover");
        }
        if(spawn === true)
        {

            this.time.addEvent({delay:2000,callback: function(){
                chicken.setDepth(0);
                chicken.setTexture('blackcock');
    
                var rx = Phaser.Math.Between(10,390);
                var ry = Phaser.Math.Between(10,390);
                chicken.x= rx;
                chicken.y = ry;
 
                   
                chicken.setScale(chickenScale);
                spawn = false;
            },callbackScope:this});
        }

       
    }



    return { preload: preload, create: create, update: update};
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
