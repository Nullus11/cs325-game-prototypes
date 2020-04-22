"use strict";

function make_mainmenu_game_state(game)
{
    var enterText;
    var machine;
    var scale = 1.35*1.5;
    function preload()
    {
       
        this.load.image('machine','assets/machine.png');//https://thumbs.dreamstime.com/b/gaming-arcade-machine-blank-screen-your-design-d-rend-extreme-closeup-rendering-127186470.jpg
    }
    function create ()
    {

        machine = this.add.image(200*1.5,200*1.5,'machine').setScale(scale);
        machine.setDepth(0);
        enterText =this.add.text(150*1.5,200*1.5,"Press Enter To Start",{fontSize: '16px', fill: 'white'});
        this.time.addEvent({delay:1000,loop:true,callback:function(){
            enterText.setColor("black");
            this.time.addEvent({delay:500,callback:function(){
                enterText.setColor("white");
            },callbackScope:this});
        },callbackScope:this});

        
        this.input.keyboard.on('keydown-' + 'ENTER',function(){
            enterText.setVisible(false);
            this.time.addEvent({delay:50,loop:true,callback:function(){
                scale = scale + (.05*1.5);
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
    var scale = 2.5*1.5;
    var scale2 = 1.5*1.5;
    function preload ()
    {
        this.load.image('machine','assets/machine.png');//https://thumbs.dreamstime.com/b/gaming-arcade-machine-blank-screen-your-design-d-rend-extreme-closeup-rendering-127186470.jpg
        this.load.image('youwin','assets/youwin.png');//https://www.vectorstock.com/royalty-free-vector/video-game-pixelated-3d-font-8-bit-pixel-art-old-vector-20684953
    }
    function create ()
    {
        machine = this.add.sprite(200*1.5,200*1.5,'machine').setScale(scale);
        youwin = this.add.sprite(200*1.5,175*1.5,'youwin').setScale(scale2);
        this.time.addEvent({delay:50,callback:function(){
            scale = scale - (.05*1.5);
            scale2 = scale2 -(.05*1.5);
            machine.setScale(scale);
            youwin.setScale(scale2);
        },callbackScope:this,repeat:20});
        
        
    }
    return {preload: preload,create: create};
}

function make_main_game_state(game)
{
   var level = 1;
   var floor = 1;
   var wave = 0;
   var next = false;
   var death = false;
   var turn = 1;
   var play = 0;
   var background;
   var scoretext;
   var maxfloortext;
   var leveltext;
   var eptext;
   var ep=0;
   var pointer;
   var maxfloor = 1;
   var attackerult = 25;
   var defenderult = 20;
   var healerult = 10;
   var spot1health;
   var spot2health;
   var spot3health;
   var spot4health;
   var spot5health;
   var spot6health;

   var spot1ult;
   var spot2ult;
   var spot3ult;
   var spot4ult;
   var spot5ult;
   var spot6ult;

   var spot1;
   var spot2;
   var spot3;
   var spot4;
   var spot5;
   var spot6;

   var spot2text;
   var spot3text;
   var spot4text;
   var spot5text;
   var spot6text;

   var enemy1;
   var enemy2;
   var enemy3;
   var enemy4;
   var enemy5;
   var enemy6;

   var empty1;
   var empty2;
   var empty3;
   var empty4;
   var empty5;
   var empty6;

    function preload ()
    {
        this.load.image('attacker','assets/attaker.png');
        this.load.image('defender','assets/defender.png');
        this.load.image('healer','assets/healer.png');
        this.load.image('goblin','assets/goblin.png');
        this.load.image('orc','assets/orc.png');
        this.load.image('dragon','assets/dragon.png');
        this.load.image('empty','assets/empty.png');
        this.load.image('background','assets/back.jpg');
    }
    function create ()
    {
        background = this.add.sprite(350,350,'background').setScale(2);
        scoretext = this.add.text(280,550,'Floor: ' + floor, {fontSize: '24px',fill:'#000'});
        maxfloortext = this.add.text(20,550,'High Floor: ' + maxfloor,{fontSize: '24px',fill:'#000'});
        leveltext = this.add.text(445,550,'Level: ' + level,{fontSize: '24px',fill:'#000'});
        eptext = this.add.text(445,580,'EXP: ' + ep,{fontSize: '16px',fill:'#000'});


        spot2text = this.add.text(25*1.5,80*1.5,'Unlock at \nFloor 10', {fontSize: '15px',fill:'#fff'});
        empty2 = this.add.sprite(50*1.5,90*1.5,'empty').setScale(.1*1.5);
        spot2 = this.add.sprite(50*1.5,90*1.5,'defender').setScale(.1*1.5);
        spot2.setVisible(false);
        spot2.health = 0;
        spot2.maxhealth = 0;
        spot2.ult = 0;
        spot2health = this.add.text(20*1.5,125*1.5,'HP: ' + spot2.health + '/ '+ spot2.maxhealth, {fontSize: '16px',fill:'#000'});
        spot2ult = this.add.text(20*1.5,135*1.5,'Ult 2: ' + spot2.ult, {fontSize: '16px',fill:'#000'});
        spot2.alive = 0;
        
        empty1 = this.add.sprite(125*1.5,90*1.5,'empty').setScale(.1*1.5);
        spot1 = this.add.sprite(125*1.5,90*1.5,'attacker').setScale(.1*1.5);
        spot1.setVisible(false);
        spot1.alive = 0;
        spot1.health = 0;
        spot1.maxhealth = 0;
        spot1.ult =0;
        spot1health = this.add.text(95*1.5,125*1.5,'HP: ' + spot1.health + '/ '+ spot1.maxhealth, {fontSize: '16px',fill:'#000'});
        spot1ult = this.add.text(95*1.5,135*1.5,'Ult 1: ' + spot1.ult, {fontSize: '16px',fill:'#000'});


        spot4text = this.add.text(25*1.5,180*1.5,'Unlock at \nFloor 15', {fontSize: '15px',fill:'#fff'});
        empty4 = this.add.sprite(50*1.5,190*1.5,'empty').setScale(.1*1.5);
        spot4 = this.add.sprite(50*1.5,190*1.5,'healer').setScale(.1*1.5);
        spot4.setVisible(false);
        spot4.alive = 0;
        spot4.health = 0;
        spot4.maxhealth = 0;
        spot4.ult = 0;
        spot4health = this.add.text(20*1.5,225*1.5,'HP: ' + spot4.health + '/ '+ spot4.maxhealth, {fontSize: '16px',fill:'#000'});
        spot4ult = this.add.text(20*1.5,235*1.5,'Ult 4: ' + spot4.ult, {fontSize: '16px',fill:'#000'});

        spot3text = this.add.text(100*1.5,180*1.5,'Unlock at \nFloor 2', {fontSize: '15px',fill:'#fff'});
        empty3 = this.add.sprite(125*1.5,190*1.5,'empty').setScale(.1*1.5);
        spot3 = this.add.sprite(125*1.5,190*1.5,'attacker').setScale(.1*1.5);
        spot3.setVisible(false);
        spot3.alive = 0;
        spot3.health = 0;
        spot3.maxhealth = 0;
        spot3.ult = 0;
        spot3health = this.add.text(95*1.5,225*1.5,'HP: ' + spot3.health + '/ '+ spot3.maxhealth, {fontSize: '16px',fill:'#000'});
        spot3ult = this.add.text(95*1.5,235*1.5,'Ult 3: ' + spot3.ult, {fontSize: '16px',fill:'#000'});

        spot6text = this.add.text(25*1.5,280*1.5,'Unlock at \nFloor 25', {fontSize: '15px',fill:'#fff'});
        empty6 = this.add.sprite(50*1.5,290*1.5,'empty').setScale(.1*1.5);
        spot6 = this.add.sprite(50*1.5,290*1.5,'defender').setScale(.1*1.5);
        spot6.setVisible(false);
        spot6.alive = 0;
        spot6.health = 0;
        spot6.maxhealth = 0;
        spot6.ult = 0;
        spot6health = this.add.text(20*1.5,325*1.5,'HP: ' + spot6.health + '/ '+ spot6.maxhealth, {fontSize: '16px',fill:'#000'});
        spot6ult = this.add.text(20*1.5,335*1.5,'Ult 6: ' + spot6.ult, {fontSize: '16px',fill:'#000'});

        spot5text = this.add.text(100*1.5,280*1.5,'Unlock at \nFloor 5', {fontSize: '15px',fill:'#fff'});
        empty5 = this.add.sprite(125*1.5,290*1.5,'empty').setScale(.1*1.5);
        spot5 = this.add.sprite(125*1.5,290*1.5,'attacker').setScale(.1*1.5);
        spot5.setVisible(false);
        spot5.alive = 0;
        spot5.health = 0;
        spot5.maxhealth = 0;
        spot5.ult =0;
        spot5health = this.add.text(95*1.5,325*1.5,'HP: ' + spot5.health + '/ '+ spot5.maxhealth, {fontSize: '16px',fill:'#000'});
        spot5ult = this.add.text(95*1.5,335*1.5,'Ult 5: ' + spot5.ult, {fontSize: '16px',fill:'#000'});

        var choice = 0;
        this.input.keyboard.on('keydown-' + 'H',function(){
            choice = 1;
        },this);
        this.input.keyboard.on('keydown-' + 'A',function(){
            choice = 2;
        },this);
        this.input.keyboard.on('keydown-' + 'D',function(){
                choice = 3;
        },this);

        this.input.keyboard.on('keydown-' + 'ONE',function(){
            if(spot1.ult === 100)
            {
                if(spot1.class === 1)
                {
                    if(spot2.inplay ===1 && spot2.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                    }
                    else if(spot3.inplay ===1 && spot3.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                    }
                    else if(spot5.inplay ===1 && spot5.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                    }
                    else if(spot4.inplay ===1 && spot4.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                    }
                    else if(spot6.inplay ===1 && spot6.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
                    }
                }
                if(spot1.class === 2)
                {
                    this.time.addEvent({delay:1000,callback:attackenemy(spot1),callbackScope:this});
                }
                if(spot1.class === 3)
                {
                    spot1.health = spot1.health * 2;
                    spot2.health = spot2.health * 2;
                    spot3.health = spot3.health * 2;
                    spot4.health = spot4.health * 2;
                    spot5.health = spot5.health * 2;
                    spot6.health = spot6.health * 2;
                    spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
                    spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
                    spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
                    spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
                    spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
                    spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
                }
                spot1.ult = 0;
            }
        },this);
        this.input.keyboard.on('keydown-' + 'TWO',function(){
            if(spot2.ult === 100)
            {
                if(spot2.class === 1)
                {
                    if(spot1.inplay ===1 && spot1.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                    }
                    else if(spot3.inplay ===1 && spot3.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                    }
                    else if(spot5.inplay ===1 && spot5.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                    }
                    else if(spot4.inplay ===1 && spot4.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                    }
                    else if(spot6.inplay ===1 && spot6.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
                    }
                }
                if(spot2.class === 2)
                {
                    this.time.addEvent({delay:1000,callback:attackenemy(spot2),callbackScope:this});
                }
                if(spot2.class === 3)
                {
                    spot1.health = spot1.health * 2;
                    spot2.health = spot2.health * 2;
                    spot3.health = spot3.health * 2;
                    spot4.health = spot4.health * 2;
                    spot5.health = spot5.health * 2;
                    spot6.health = spot6.health * 2;
                    spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
                    spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
                    spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
                    spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
                    spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
                    spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
                }
                spot2.ult = 0;
            }
        },this);
        this.input.keyboard.on('keydown-' + 'THREE',function(){
            if(spot3.ult === 100)
            {
                if(spot3.class === 1)
                {
                    if(spot2.inplay ===1 && spot2.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                    }
                    else if(spot1.inplay ===1 && spot1.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                    }
                    else if(spot5.inplay ===1 && spot5.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                    }
                    else if(spot4.inplay ===1 && spot4.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                    }
                    else if(spot6.inplay ===1 && spot6.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
                    }
                }
                if(spot3.class === 2)
                {
                    this.time.addEvent({delay:1000,callback:attackenemy(spot3),callbackScope:this});
                }
                if(spot3.class === 3)
                {
                    spot1.health = spot1.health * 2;
                    spot2.health = spot2.health * 2;
                    spot3.health = spot3.health * 2;
                    spot4.health = spot4.health * 2;
                    spot5.health = spot5.health * 2;
                    spot6.health = spot6.health * 2;
                    spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
                    spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
                    spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
                    spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
                    spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
                    spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
                } 
                spot3.ult = 0;
            }
        },this);
        this.input.keyboard.on('keydown-' + 'FOUR',function(){
            if(spot4.ult === 100)
            {
                if(spot4.class === 1)
                {
                    if(spot2.inplay ===1 && spot2.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                    }
                    else if(spot3.inplay ===1 && spot3.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                    }
                    else if(spot5.inplay ===1 && spot5.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                    }
                    else if(spot1.inplay ===1 && spot1.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                    }
                    else if(spot6.inplay ===1 && spot6.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
                    }
                }
                if(spot4.class === 2)
                {
                    this.time.addEvent({delay:1000,callback:attackenemy(spot1),callbackScope:this});
                }
                if(spot4.class === 3)
                {
                    spot1.health = spot1.health * 2;
                    spot2.health = spot2.health * 2;
                    spot3.health = spot3.health * 2;
                    spot4.health = spot4.health * 2;
                    spot5.health = spot5.health * 2;
                    spot6.health = spot6.health * 2;
                    spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
                    spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
                    spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
                    spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
                    spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
                    spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
                }
                spot4.ult = 0;
            }
        },this);
        this.input.keyboard.on('keydown-' + 'FIVE',function(){
            if(spot5.ult === 100)
            {
                if(spot5.class === 1)
                {
                    if(spot2.inplay ===1 && spot2.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                    }
                    else if(spot3.inplay ===1 && spot3.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                    }
                    else if(spot1.inplay ===1 && spot1.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                    }
                    else if(spot4.inplay ===1 && spot4.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                    }
                    else if(spot6.inplay ===1 && spot6.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
                    }
                }
                if(spot5.class === 2)
                {
                    this.time.addEvent({delay:1000,callback:attackenemy(spot1),callbackScope:this});
                }
                if(spot5.class === 3)
                {
                    spot1.health = spot1.health * 2;
                    spot2.health = spot2.health * 2;
                    spot3.health = spot3.health * 2;
                    spot4.health = spot4.health * 2;
                    spot5.health = spot5.health * 2;
                    spot6.health = spot6.health * 2;
                    spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
                    spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
                    spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
                    spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
                    spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
                    spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
                }
                spot5.ult = 0;
            }
        },this);
        this.input.keyboard.on('keydown-' + 'SIX',function(){
            if(spot6.ult === 100)
            {
                if(spot6.class === 1)
                {
                    if(spot2.inplay ===1 && spot2.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                    }
                    else if(spot3.inplay ===1 && spot3.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                    }
                    else if(spot5.inplay ===1 && spot5.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                    }
                    else if(spot4.inplay ===1 && spot4.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                    }
                    else if(spot1.inplay ===1 && spot1.alive === 0)
                    {
                        this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                    }
                }
                if(spot6.class === 2)
                {
                    this.time.addEvent({delay:1000,callback:attackenemy(spot6),callbackScope:this});
                }
                if(spot6.class === 3)
                {
                    spot1.health = spot1.health * 2;
                    spot2.health = spot2.health * 2;
                    spot3.health = spot3.health * 2;
                    spot4.health = spot4.health * 2;
                    spot5.health = spot5.health * 2;
                    spot6.health = spot6.health * 2;
                    spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
                    spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
                    spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
                    spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
                    spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
                    spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
                }
                spot6.ult = 0;
            }
        },this);
        
        pointer = this.input.activePointer;
   
                this.input.on('pointerdown' ,function(){
                    if(Math.abs(empty1.x - pointer.x) < 50 && Math.abs(empty1.y - pointer.y) < 50 && choice === 1)
                    {
                        this.time.addEvent({delay:0,callback:createhealer(spot1),callbackScope:this});
                    }
                    if(Math.abs(empty1.x - pointer.x) < 50 && Math.abs(empty1.y - pointer.y) < 50 && choice === 2)
                    {
                        this.time.addEvent({delay:0,callback:createattacker(spot1),callbackScope:this});
                    }
                    if(Math.abs(empty1.x - pointer.x) < 50 && Math.abs(empty1.y - pointer.y) < 50 && choice === 3)
                    {
                        this.time.addEvent({delay:0,callback:createdefender(spot1),callbackScope:this});
                    }

            if(maxfloor >= 10)
            {
                    
                    if(Math.abs(empty2.x - pointer.x) < 50 && Math.abs(empty2.y - pointer.y) < 50 && choice === 1)
                    {
                        this.time.addEvent({delay:0,callback:createhealer(spot2),callbackScope:this});
                    }
                    if(Math.abs(empty2.x - pointer.x) < 50 && Math.abs(empty2.y - pointer.y) < 50 && choice === 2)
                    {
                        this.time.addEvent({delay:0,callback:createattacker(spot2),callbackScope:this});
                    }
                    if(Math.abs(empty2.x - pointer.x) < 50 && Math.abs(empty2.y - pointer.y) < 50 && choice === 3)
                    {
                        this.time.addEvent({delay:0,callback:createdefender(spot2),callbackScope:this});
                    }
            }
            if(maxfloor >= 2)
            {
                    if(Math.abs(empty3.x - pointer.x) < 50 && Math.abs(empty3.y - pointer.y) < 50 && choice === 1)
                    {
                        this.time.addEvent({delay:0,callback:createhealer(spot3),callbackScope:this});
                    }
                    if(Math.abs(empty3.x - pointer.x) < 50 && Math.abs(empty3.y - pointer.y) < 50 && choice === 2)
                    {
                        this.time.addEvent({delay:0,callback:createattacker(spot3),callbackScope:this});
                    }
                    if(Math.abs(empty3.x - pointer.x) < 50 && Math.abs(empty3.y - pointer.y) < 50 && choice === 3)
                    {
                        this.time.addEvent({delay:0,callback:createdefender(spot3),callbackScope:this});
                    }
            }
            if(maxfloor >= 15)
            {
                    if(Math.abs(empty4.x - pointer.x) < 50 && Math.abs(empty4.y - pointer.y) < 50 && choice === 1)
                    {
                        this.time.addEvent({delay:0,callback:createhealer(spot4),callbackScope:this});
                    }
                    if(Math.abs(empty4.x - pointer.x) < 50 && Math.abs(empty4.y - pointer.y) < 50 && choice === 2)
                    {
                        this.time.addEvent({delay:0,callback:createattacker(spot4),callbackScope:this});
                    }
                    if(Math.abs(empty4.x - pointer.x) < 50 && Math.abs(empty4.y - pointer.y) < 50 && choice === 3)
                    {
                        this.time.addEvent({delay:0,callback:createdefender(spot4),callbackScope:this});
                    }
            }
            if(maxfloor >= 5)
            {
                    if(Math.abs(empty5.x - pointer.x) < 50 && Math.abs(empty5.y - pointer.y) < 50 && choice === 1)
                    {
                        this.time.addEvent({delay:0,callback:createhealer(spot5),callbackScope:this});
                    }
                    if(Math.abs(empty5.x - pointer.x) < 50 && Math.abs(empty5.y - pointer.y) < 50 && choice === 2)
                    {
                        this.time.addEvent({delay:0,callback:createattacker(spot5),callbackScope:this});
                    }
                    if(Math.abs(empty5.x - pointer.x) < 50 && Math.abs(empty5.y - pointer.y) < 50 && choice === 3)
                    {
                        this.time.addEvent({delay:0,callback:createdefender(spot5),callbackScope:this});
                    }
            }
            if(maxfloor >= 25)
            {
                    if(Math.abs(empty6.x - pointer.x) < 50 && Math.abs(empty6.y - pointer.y) < 50 && choice === 1)
                    {
                        this.time.addEvent({delay:0,callback:createhealer(spot6),callbackScope:this});
                    }
                    if(Math.abs(empty6.x - pointer.x) < 50 && Math.abs(empty6.y - pointer.y) < 50 && choice === 2)
                    {
                        this.time.addEvent({delay:0,callback:createattacker(spot6),callbackScope:this});
                    }
                    if(Math.abs(empty6.x - pointer.x) < 50 && Math.abs(empty6.y - pointer.y) < 50 && choice === 3)
                    {
                        this.time.addEvent({delay:0,callback:createdefender(spot6),callbackScope:this});
                    }
                }
                    choice = 0;
                    floor = 1;

                        turn = 1;
                        if(spot1.inplay ===1)
                            this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                        if(spot2.inplay ===1)
                            this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                        if(spot3.inplay ===1)
                            this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                        if(spot4.inplay ===1)
                            this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                        if(spot5.inplay ===1)
                            this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                        if(spot6.inplay ===1)
                            this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
                    
                    

                        enemy1.setVisible(false);
                        enemy2.setVisible(false);
                        enemy3.setVisible(false);
                        enemy4.setVisible(false);
                        enemy5.setVisible(false);
                        enemy6.setVisible(false);
                        enemy1.alive=0;
                        enemy2.alive=0;
                        enemy3.alive=0;
                        enemy4.alive=0;
                        enemy5.alive=0;
                        enemy6.alive=0;
                        this.time.addEvent({delay:0,callback:floor1(),callbackScope:this});
                    
            },this);
        
    
    


        enemy2 = this.add.sprite(350*1.50,90*1.5,'goblin').setScale(.1*1.5);
        enemy2.attack = floor * 5;
        enemy2.health = floor *10;
        enemy2.alive = 0;
        enemy1 = this.add.sprite(275*1.5,90*1.5,'goblin').setScale(.1*1.5);
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 0;
        enemy4 = this.add.sprite(350*1.5,190*1.5,'goblin').setScale(.1*1.5);
        enemy4.attack = floor * 5;
        enemy4.health = floor *10;
        enemy4.alive = 0;
        enemy3 = this.add.sprite(275*1.5,190*1.5,'goblin').setScale(.1*1.5);
        enemy3.attack = floor * 5;
        enemy3.health = floor *10;
        enemy3.alive = 0;
        enemy6 = this.add.sprite(350*1.5,290*1.5,'goblin').setScale(.1*1.5);
        enemy6.attack = floor * 5;
        enemy6.health = floor *10;
        enemy6.alive = 0;
        enemy5 = this.add.sprite(275*1.5,290*1.5,'goblin').setScale(.1*1.5);
        enemy5.attack = floor * 5;
        enemy5.health = floor *10;
        enemy5.alive = 0;
        enemy1.setVisible(false);
        enemy2.setVisible(false);
        enemy3.setVisible(false);
        enemy4.setVisible(false);
        enemy5.setVisible(false);
        enemy6.setVisible(false);

        this.time.addEvent({delay:0,callback:resetenemy(),callbackScope:this});

        this.time.addEvent({delay:500,loop: true,callback:function(){
            
            if(turn === 1)
            {
                if(spot1.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackenemy(spot1),callbackScope:this});
                turn += 1;
            }
            else if(turn === 2)
            {
                if(spot2.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackenemy(spot2),callbackScope:this});
                turn += 1;    
            }
            else if(turn === 3)
            {
                if(spot3.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackenemy(spot3),callbackScope:this});
                turn += 1;    
            }
            else if(turn === 4)
            {
                if(spot4.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackenemy(spot4),callbackScope:this});
                turn += 1;   
            }
            else if(turn === 5)
            {
                if(spot5.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackenemy(spot5),callbackScope:this});
                turn += 1;
            }
           else if(turn === 6)
           {
                if(spot6.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackenemy(spot6),callbackScope:this});
                turn += 1;         
            }
            else if(turn === 7)
            {
                if(enemy1.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackfriend(enemy1),callbackScope:this});
                turn += 1;    
            }
            else if(turn === 8)
            {
                if(enemy2.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackfriend(enemy2),callbackScope:this});
                turn += 1;
            }
            else if(turn === 9)
            {
                if(enemy3.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackfriend(enemy3),callbackScope:this});
                turn += 1;
            }
            else if(turn === 10)
            {
                if(enemy4.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackfriend(enemy4),callbackScope:this});
                turn += 1;
            }
            else if(turn === 11)
            {
                if(enemy5.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackfriend(enemy5),callbackScope:this});
                turn += 1;
            }
            else if(turn === 12)
            {    
                if(enemy6.alive === 1)
                    this.time.addEvent({delay:1000,callback:attackfriend(enemy6),callbackScope:this});
                turn += 1;
            }
            if(next === true)
            {
                if(floor === maxfloor)
                    maxfloor++;
                floor += 1;
                if(spot1.alive ===1)
                {
                    if(spot1.class === 1 && spot1.ult <100)
                    {
                        spot1.ult += healerult;
                        spot1ult.setText('Ult 1: ' + spot1.ult);
                    }
                    if(spot1.class === 2 && spot1.ult <100)
                    {
                        spot1.ult += attackerult;
                        spot1ult.setText('Ult 1: ' + spot1.ult);
                    }
                    if(spot1.class === 3 && spot1.ult <100)
                    {
                        spot1.ult += defenderult;
                        spot1ult.setText('Ult 1: ' + spot1.ult);
                    }
                    if(spot1.ult === 100)
                        spot1ult.setText('Ult 1: Ready');
                }
                if(spot2.alive ===1)
                {
                    if(spot2.class === 1 && spot2.ult <100)
                    {
                        spot2.ult += healerult;
                        spot2ult.setText('Ult 2: ' + spot2.ult);
                    }
                    if(spot2.class === 2 && spot2.ult <100)
                    {
                        spot2.ult += attackerult;
                        spot2ult.setText('Ult 2: ' + spot2.ult);
                    }
                    if(spot2.class === 3 && spot2.ult <100)
                    {
                        spot2.ult += defenderult;
                        spot2ult.setText('Ult 2: ' + spot2.ult);
                    }
                    if(spot2.ult === 100)
                        spot2ult.setText('Ult 2: Ready');
                }
                if(spot3.alive ===1)
                {
                    if(spot3.class === 1 && spot3.ult <100)
                    {
                        spot3.ult += healerult;
                        spot3ult.setText('Ult 3: ' + spot3.ult);
                    }
                    if(spot3.class === 2 && spot3.ult <100)
                    {
                        spot3.ult += attackerult;
                        spot3ult.setText('Ult 3: ' + spot3.ult);
                    }
                    if(spot3.class === 3 && spot3.ult <100)
                    {
                        spot3.ult += defenderult;
                        spot3ult.setText('Ult 3: ' + spot3.ult);
                    }
                    if(spot3.ult === 100)
                        spot3ult.setText('Ult 3: Ready');
                }
                if(spot4.alive ===1)
                {
                    if(spot4.class === 1 && spot4.ult <100)
                    {
                        spot4.ult += healerult;
                        spot4ult.setText('Ult 4: ' + spot4.ult);
                    }
                    if(spot4.class === 2 && spot4.ult <100)
                    {
                        spot4.ult += attackerult;
                        spot4ult.setText('Ult 4: ' + spot4.ult);
                    }
                    if(spot4.class === 3 && spot4.ult <100)
                    {
                        spot4.ult += defenderult;
                        spot4ult.setText('Ult 4: ' + spot4.ult);
                    }
                    if(spot4.ult === 100)
                        spot4ult.setText('Ult 4: Ready');
                }
                if(spot5.alive ===1)
                {
                    if(spot5.class === 1 && spot5.ult <100)
                    {
                        spot5.ult += healerult;
                        spot5ult.setText('Ult 5: ' + spot5.ult);
                    }
                    if(spot5.class === 2 && spot5.ult <100)
                    {
                        spot5.ult += attackerult;
                        spot5ult.setText('Ult 5: ' + spot5.ult);
                    }
                    if(spot5.class === 3 && spot5.ult <100)
                    {
                        spot5.ult += defenderult;
                        spot5ult.setText('Ult 5: ' + spot5.ult);
                    }
                    if(spot5.ult === 100)
                        spot5ult.setText('Ult 5: Ready');
                }
                if(spot6.alive ===1)
                {
                    if(spot6.class === 1 && spot6.ult <100)
                    {
                        spot6.ult += healerult;
                        spot6ult.setText('Ult 6: ' + spot6.ult);
                    }
                    if(spot6.class === 2 && spot6.ult <100)
                    {
                        spot6.ult += attackerult;
                        spot6ult.setText('Ult 6: ' + spot6.ult);
                    }
                    if(spot6.class === 3 && spot6.ult <100)
                    {
                        spot6.ult += defenderult;
                        spot6ult.setText('Ult 6: ' + spot6.ult);
                    }
                    if(spot6.ult === 100)
                        spot6ult.setText('Ult 6: Ready');
                }
            
                if(maxfloor === 2)
                    spot3text.setVisible(false);
                if(maxfloor === 5)
                    spot5text.setVisible(false);
                if(maxfloor === 10)
                    spot2text.setVisible(false);
                if(maxfloor === 15)
                    spot4text.setVisible(false);
                if(maxfloor === 25)
                    spot6text.setVisible(false);
                scoretext.setText('Floor: ' + floor);
                maxfloortext.setText('Max Floor: '+maxfloor);
                if(spot1.alive ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                if(spot2.alive ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                if(spot3.alive ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                if(spot4.alive ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                if(spot5.alive ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                if(spot6.alive ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
               
                if(floor === 1 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor1(),callbackScope:this});
                }
                else if(floor === 2+ (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor2(),callbackScope:this});                    
                }
                else if(floor === 3+ (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor3(),callbackScope:this});
                }
                else if(floor === 4 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor4(),callbackScope:this});
                }
                else if(floor === 5 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor5(),callbackScope:this});
                }
                else if(floor === 6 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor6(),callbackScope:this});
                }
                else if(floor === 7 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor7(),callbackScope:this});
                }
                else if(floor === 8 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor8(),callbackScope:this});
                }
                else if(floor === 9 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor9(),callbackScope:this});
                }
                else if(floor === 10 + (10* wave))
                {
                    scoretext.setText('Floor: ' + floor);
                    this.time.addEvent({delay:1000,callback:floor10(),callbackScope:this});
                }
                    
                next = false;

            
                turn = 1;
            }
            if(death === true)
            {
                floor = 1;
                scoretext.setText('Floor: ' + floor);
                turn = 1;
                if(spot1.inplay ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot1),callbackScope:this});
                if(spot2.inplay ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot2),callbackScope:this});
                if(spot3.inplay ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot3),callbackScope:this});
                if(spot4.inplay ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot4),callbackScope:this});
                if(spot5.inplay ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot5),callbackScope:this});
                if(spot6.inplay ===1)
                    this.time.addEvent({delay:0,callback:resetparty(spot6),callbackScope:this});
               
                wave = 0;

                enemy1.setVisible(false);
                enemy2.setVisible(false);
                enemy3.setVisible(false);
                enemy4.setVisible(false);
                enemy5.setVisible(false);
                enemy6.setVisible(false);
                enemy1.alive=0;
                enemy2.alive=0;
                enemy3.alive=0;
                enemy4.alive=0;
                enemy5.alive=0;
                enemy6.alive=0;
                this.time.addEvent({delay:0,callback:floor1(),callbackScope:this});
                death = false;
            }
            if(turn === 12)
                turn = 1;
            
            
        },callbackScope:this});
    }
    
    function update ()
    {
        if(ep >= 10*level)
        {
            level += 1;
            ep = 0;
            leveltext.setText('Level: ' + level);
            eptext.setText('EXP: ' + ep);
            spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
            spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
            spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
            spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
            spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
            spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
  
        }
    }
    function createhealer(spot)
    {
        spot.setVisible(true);
        spot.setTexture('healer');
        spot.attack = level * 5;
        spot.health = level *20;
        spot.heal = level * 5;
        spot.maxhealth = level*20;
        spot.alive = 1;
        spot.class = 1;
        spot.inplay = 1;

    }
    function createattacker(spot)
    {
        spot.setVisible(true);
        spot.setTexture('attacker');
        spot.attack = level * 25;
        spot.health = level *30;
        spot.maxhealth = level * 30;
        spot.alive = 1;
        spot.class = 2;
        spot.inplay = 1;

    }
    function createdefender(spot)
    {
        spot.setVisible(true);
        spot.setTexture('defender');
        spot.attack = level * 10;
        spot.health = level *50;
        spot.maxhealth = level *50;
        spot.alive = 1;
        spot.class = 3;
        spot.inplay = 1;

    }
    function resetenemy()
    {

       
    }
    function floor1()
    {
        enemy1.setVisible(true);
        enemy1.setTexture('goblin');
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 1;
        enemy1.class = 4;
       

    }
    function floor2()
    {
        enemy1.setVisible(true);
        enemy1.setTexture('goblin');
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 1;
        enemy1.class = 4;

        enemy2.setVisible(true);
        enemy2.setTexture('goblin');
        enemy2.attack = floor * 5;
        enemy2.health = floor *10;
        enemy2.alive = 1;
        enemy2.class = 4;

        enemy3.setVisible(true);
        enemy3.setTexture('goblin');
        enemy3.attack = floor * 5;
        enemy3.health = floor *10;
        enemy3.alive = 1;
        enemy3.class = 4;
       

    }
    function floor3()
    {
        enemy1.setVisible(true);
        enemy1.setTexture('goblin');
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 1;
        enemy1.class = 4;

        enemy2.setVisible(true);
        enemy2.setTexture('goblin');
        enemy2.attack = floor * 5;
        enemy2.health = floor *10;
        enemy2.alive = 1;
        enemy2.class = 4;

        enemy3.setVisible(true);
        enemy3.setTexture('orc');
        enemy3.attack = floor * 15;
        enemy3.health = floor *20;
        enemy3.alive = 1;
        enemy3.class = 5;
       

    }
    function floor4()
    {
        enemy1.setVisible(true);
        enemy1.setTexture('goblin');
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 1;
        enemy1.class = 4;

        enemy2.setVisible(true);
        enemy2.setTexture('goblin');
        enemy2.attack = floor * 5;
        enemy2.health = floor *10;
        enemy2.alive = 1;
        enemy2.class = 4;

        enemy3.setVisible(true);
        enemy3.setTexture('goblin');
        enemy3.attack = floor * 5;
        enemy3.health = floor *10;
        enemy3.alive = 1;
        enemy3.class = 4;

        enemy4.setVisible(true);
        enemy4.setTexture('orc');
        enemy4.attack = floor * 15;
        enemy4.health = floor *20;
        enemy4.alive = 1;
        enemy4.class = 5;
       

    }
    function floor5()
    {
        enemy1.setVisible(true);
        enemy2.setTexture('goblin');
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 1;
        enemy1.class = 4;

        enemy2.setVisible(true);
        enemy2.setTexture('goblin');
        enemy2.attack = floor * 5;
        enemy2.health = floor *10;
        enemy2.alive = 1;
        enemy2.class = 4;

        enemy3.setVisible(true);
        enemy3.setTexture('goblin');
        enemy3.attack = floor * 5;
        enemy3.health = floor *10;
        enemy3.alive = 1;
        enemy3.class = 4;

        enemy4.setVisible(true);
        enemy4.setTexture('goblin');
        enemy4.attack = floor * 5;
        enemy4.health = floor *10;
        enemy4.alive = 1;
        enemy4.class = 4;

        enemy5.setVisible(true);
        enemy5.setTexture('orc');
        enemy5.attack = floor * 15;
        enemy5.health = floor *20;
        enemy5.alive = 1;
        enemy5.class = 5;
       

    }
    function floor6()
    {
        enemy1.setVisible(true);
        enemy2.setTexture('goblin');
        enemy1.attack = floor * 5;
        enemy1.health = floor *10;
        enemy1.alive = 1;
        enemy1.class = 4;

        enemy2.setVisible(true);
        enemy2.setTexture('goblin');
        enemy2.attack = floor * 5;
        enemy2.health = floor *10;
        enemy2.alive = 1;
        enemy2.class = 4;

        enemy3.setVisible(true);
        enemy3.setTexture('goblin');
        enemy3.attack = floor * 5;
        enemy3.health = floor *10;
        enemy3.alive = 1;
        enemy3.class = 4;

        enemy4.setVisible(true);
        enemy4.setTexture('orc');
        enemy4.attack = floor * 15;
        enemy4.health = floor *20;
        enemy4.alive = 1;
        enemy4.class = 5;

        enemy5.setVisible(true);
        enemy5.setTexture('orc');
        enemy5.attack = floor * 15;
        enemy5.health = floor *20;
        enemy5.alive = 1;
        enemy5.class = 5;
       

    }
    function floor7()
    {

        enemy1.setVisible(true);
        enemy1.setTexture('orc');
        enemy1.attack = floor * 15;
        enemy1.health = floor *20;
        enemy1.alive = 1;
        enemy1.class = 5;

        enemy2.setVisible(true);
        enemy2.setTexture('orc');
        enemy2.attack = floor * 15;
        enemy2.health = floor *20;
        enemy2.alive = 1;
        enemy2.class = 5;

        enemy3.setVisible(true);
        enemy3.setTexture('orc');
        enemy3.attack = floor * 15;
        enemy3.health = floor *20;
        enemy3.alive = 1;
        enemy3.class = 5;

        enemy4.setVisible(true);
        enemy4.setTexture('orc');
        enemy4.attack = floor * 15;
        enemy4.health = floor *20;
        enemy4.alive = 1;
        enemy4.class = 5;
       

    }
    function floor8()
    {

        enemy1.setVisible(true);
        enemy1.setTexture('orc');
        enemy1.attack = floor * 15;
        enemy1.health = floor *20;
        enemy1.alive = 1;
        enemy1.class = 5;

        enemy2.setVisible(true);
        enemy2.setTexture('orc');
        enemy2.attack = floor * 15;
        enemy2.health = floor *20;
        enemy2.alive = 1;
        enemy2.class = 5;

        enemy3.setVisible(true);
        enemy3.setTexture('orc');
        enemy3.attack = floor * 15;
        enemy3.health = floor *20;
        enemy3.alive = 1;
        enemy3.class = 5;

        enemy4.setVisible(true);
        enemy4.setTexture('orc');
        enemy4.attack = floor * 15;
        enemy4.health = floor *20;
        enemy4.alive = 1;
        enemy4.class = 5;

        enemy5.setVisible(true);
        enemy5.setTexture('goblin');
        enemy5.attack = floor * 5;
        enemy5.health = floor *10;
        enemy5.alive = 1;
        enemy5.class = 4;

        enemy6.setVisible(true);
        enemy6.setTexture('goblin');
        enemy6.attack = floor * 5;
        enemy6.health = floor *10;
        enemy6.alive = 1;
        enemy6.class = 4;
       

    }
    function floor9()
    {

        enemy1.setVisible(true);
        enemy1.setTexture('orc');
        enemy1.attack = floor * 15;
        enemy1.health = floor *20;
        enemy1.alive = 1;
        enemy1.class = 5;

        enemy2.setVisible(true);
        enemy2.setTexture('orc');
        enemy2.attack = floor * 15;
        enemy2.health = floor *20;
        enemy2.alive = 1;
        enemy2.class = 5;

        enemy3.setVisible(true);
        enemy3.setTexture('orc');
        enemy3.attack = floor * 15;
        enemy3.health = floor *20;
        enemy3.alive = 1;
        enemy3.class = 5;

        enemy4.setVisible(true);
        enemy4.setTexture('orc');
        enemy4.attack = floor * 15;
        enemy4.health = floor *20;
        enemy4.alive = 1;
        enemy4.class = 5;

        enemy5.setVisible(true);
        enemy5.setTexture('orc');
        enemy5.attack = floor * 15;
        enemy5.health = floor *20;
        enemy5.alive = 1;
        enemy5.class = 5;

        enemy6.setVisible(true);
        enemy6.setTexture('orc');
        enemy6.attack = floor * 15;
        enemy6.health = floor *20;
        enemy6.alive = 1;
        enemy6.class = 5;
       

    }
    function floor10()
    {
        enemy1.setVisible(true);
        enemy1.setTexture('dragon');
        enemy1.attack = floor * 50;
        enemy1.health = floor *50;
        enemy1.alive = 1;
        enemy1.class = 6;
    }
    function attackenemy(attacker)
    {
        if(attacker.class === 1 && ((spot1.alive === 1 &&spot1.health < spot1.maxhealth/1.5) || (spot2.alive === 1 &&spot2.health < spot2.maxhealth/1.5) || (spot3.alive === 1 &&spot3.health < spot3.maxhealth/1.5) || (spot4.alive === 1 &&spot4.health < spot4.maxhealth/1.5) || (spot5.alive === 1 &&spot5.health < spot5.maxhealth/1.5) || (spot6.alive === 1 &&spot6.health < spot6.maxhealth/1.5)))
        {
            if((spot1.alive === 1 &&spot1.health < spot1.maxhealth/1.5))
            {
                spot1.health += attacker.heal;
            }
            else if((spot2.alive === 1 &&spot2.health < spot2.maxhealth/1.5))
            {
                spot2.health += attacker.heal;
            }
            else if((spot3.alive === 1 &&spot3.health < spot3.maxhealth/1.5))
            {
                spot3.health += attacker.heal;
            }
            else if((spot4.alive === 1 &&spot4.health < spot4.maxhealth/1.5))
            {
                spot4.health += attacker.heal;
            }
            else if((spot5.alive === 1 &&spot5.health < spot5.maxhealth/1.5))
            {
                spot5.health += attacker.heal;
            }
            else if((spot6.alive === 1 &&spot6.health < spot6.maxhealth/1.5))
            {
                spot6.health += attacker.heal;
            }
            spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
            spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
            spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
            spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
            spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
            spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
    
        }
        else if(enemy1.alive === 1)
        {
            enemy1.health = enemy1.health - attacker.attack;
            if(enemy1.health <= 0)
            {
                enemy1.alive = 0;
                enemy1.setVisible(false);
                if(enemy1.class === 4)
                {
                    ep += 1;
                    eptext.setText('EXP: ' + ep);
                }
                if(enemy1.class === 5)
                {
                    ep += 3;
                    eptext.setText('EXP: ' + ep);
                }               
                if(enemy1.class === 6)
                {
                    ep += 10;
                    eptext.setText('EXP: ' + ep);
                    wave+=1;
                }
            }
        }
        else if(enemy3.alive === 1)
        {
            enemy3.health = enemy3.health - attacker.attack;
            if(enemy3.health <= 0)
            {
                enemy3.alive = 0;
                enemy3.setVisible(false);
                if(enemy3.class === 4)
                {
                    ep += 1;
                    eptext.setText('EXP: ' + ep);
                }
                if(enemy3.class === 5)
                {
                    ep += 3;
                    eptext.setText('EXP: ' + ep);
                }               
                if(enemy3.class === 6)
                {
                    ep += 10;
                    eptext.setText('EXP: ' + ep);                   
                }
            }
        }
        else if(enemy5.alive === 1)
        {
            enemy5.health = enemy5.health - attacker.attack;
            if(enemy5.health <= 0)
            {
                enemy5.alive = 0;
                enemy5.setVisible(false);
                if(enemy5.class === 4)
                {
                    ep += 1;
                    eptext.setText('EXP: ' + ep);
                }
                if(enemy5.class === 5)
                {
                    ep += 3;
                    eptext.setText('EXP: ' + ep);
                }               
                if(enemy5.class === 6)
                {
                    ep += 10;
                    eptext.setText('EXP: ' + ep);
                    
                }
            }
        }
       else if(enemy2.alive === 1)
        {
            enemy2.health = enemy2.health - attacker.attack;
            if(enemy2.health <= 0)
            {
                enemy2.alive = 0;
                enemy2.setVisible(false);
                if(enemy2.class === 4)
                {
                    ep += 1;
                    eptext.setText('EXP: ' + ep);
                }
                if(enemy2.class === 5)
                {
                    ep += 3;
                    eptext.setText('EXP: ' + ep);
                }               
                if(enemy2.class === 6)
                {
                    ep += 10;
                    eptext.setText('EXP: ' + ep);
                }
            }
        }
        else if(enemy4.alive === 1)
        {
            enemy4.health = enemy4.health - attacker.attack;
            if(enemy4.health <= 0)
            {
                enemy4.alive = 0;
                enemy4.setVisible(false);
                if(enemy4.class === 4)
                {
                    ep += 1;
                    eptext.setText('EXP: ' + ep);
                }
                if(enemy4.class === 5)
                {
                    ep += 3;
                    eptext.setText('EXP: ' + ep);
                }               
                if(enemy4.class === 6)
                {
                    ep += 10;
                    eptext.setText('EXP: ' + ep);
                }
            }
        }
        else if(enemy6.alive === 1)
        {
            enemy6.health = enemy6.health - attacker.attack;
            if(enemy6.health <= 0)
            {
                enemy6.alive = 0;
                enemy6.setVisible(false);
                if(enemy6.class === 4)
                {
                    ep += 1;
                    eptext.setText('EXP: ' + ep);
                }
                if(enemy6.class === 5)
                {
                    ep += 3;
                    eptext.setText('EXP: ' + ep);
                }               
                if(enemy6.class === 6)
                {
                    ep += 10;
                    eptext.setText('EXP: ' + ep);
                }
            }
        }
        if(enemy1.alive === 0 &&enemy2.alive === 0&&enemy3.alive === 0&&enemy4.alive === 0&&enemy5.alive === 0&&enemy6.alive === 0)
        {
            next = true;
        }
    }
    function attackfriend(attacker)
    {
        if(spot1.alive === 1)
        {
            spot1.health = spot1.health - attacker.attack;
            spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
            if(spot1.health <= 0)
            {
                spot1.alive = 0;
                spot1.setVisible(false);
            }
        }
        else if(spot3.alive === 1)
        {
            spot3.health = spot3.health - attacker.attack;
            spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
            if(spot3.health <= 0)
            
            {
                spot3.alive = 0;
                spot3.setVisible(false);
            }
        }
        else if(spot5.alive === 1)
        {
            spot5.health = spot5.health - attacker.attack;
            spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
               if(spot5.health <= 0)
            {
                spot5.alive = 0;
                spot5.setVisible(false);
            }
        }
       else if(spot2.alive === 1)
        {
            spot2.health = spot2.health - attacker.attack;
            spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
             if(spot2.health <= 0)
            {
                spot2.alive = 0;
                spot2.setVisible(false);
            }
        }
        else if(spot4.alive === 1)
        {
            spot4.health = spot4.health - attacker.attack;
            spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);           
             if(spot4.health <= 0)
            {
                spot4.alive = 0;
                spot4.setVisible(false);
            }
        }
        else if(spot6.alive === 1)
        {
            spot6.health = spot6.health - attacker.attack;
            spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);
            if(spot6.health <= 0)
            {
                spot6.alive = 0;
                spot6.setVisible(false);
            }
        }
        if(spot1.alive===0 &&spot2.alive===0 &&spot3.alive===0 &&spot4.alive===0 &&spot5.alive===0 &&spot6.alive===0 )
        {
             death = true;

        }
    }
    function resetparty(spot)
    {
        spot.setVisible(true);
        spot.alive =1;
        if(spot.class === 1)
        {
            spot.attack = level * 5;
            spot.health = level *20;
            spot.heal = level * 5;
            spot.maxhealth = level * 20;
        }
        else if(spot.class === 2)
        {
            spot.attack = level * 25;
            spot.health = level *30;
            spot.maxhealth = level * 30;
        }
        else if(spot.class === 3)
        {
            spot.attack = level * 10;
            spot.health = level *50;
            spot.maxhealth = level * 50;
        }
        spot1health.setText('HP: ' + spot1.health + '/ '+ spot1.maxhealth);
        spot2health.setText('HP: ' + spot2.health + '/ '+ spot2.maxhealth);           
        spot3health.setText('HP: ' + spot3.health + '/ '+ spot3.maxhealth);            
        spot4health.setText('HP: ' + spot4.health + '/ '+ spot4.maxhealth);    
        spot5health.setText('HP: ' + spot5.health + '/ '+ spot5.maxhealth);         
        spot6health.setText('HP: ' + spot6.health + '/ '+ spot6.maxhealth);

    }
    return { preload: preload, create: create, update: update,resetenemy: resetenemy,floor1:floor1,floor2:floor2,floor3:floor3,floor4:floor4,floor5:floor5,floor6:floor6,floor7:floor7,floor8:floor8,floor9:floor9,floor10:floor10,attackenemy:attackenemy,attackfriend:attackfriend,resetparty:resetparty};
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
        width: 400*1.5,
        height: 400*1.5,
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
