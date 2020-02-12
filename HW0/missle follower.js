var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);
var pointsnumber = 0;
var start = false;
function preload ()
{
    this.load.image('block', 'assets/trump.png');
    this.load.image('cursor', 'assets/bomb.png');
    this.load.image('background', 'assets/background.png');
    this.load.audio('music','assets/hail to the chief.mp3');
    this.load.audio('what', 'assets/what the hell.mp3');
    this.load.audio('obama', 'assets/obamacare.mp3');
    this.load.audio('fake news', 'assets/fake news.mp3');
}
//var gameOver;
function create ()
{
    bgmusic = this.sound.add('music');
    obama = this.sound.add('obama');
    fakenews = this.sound.add('fake news');
    bgmusic.play({volume: .3,loop: true});
    what = this.sound.add('what');
    var xrandom = Phaser.Math.Between(10,790);
    var yrandom = Phaser.Math.Between(10,590);
    cursor = this.add.image(400, 300, 'cursor').setVisible(false);
    background = this.add.image(350,300,'background').setScale(1.5);
    gameOver = this.add.text(50,300, 'THANKS OBAMA',{fontSize: '100px',fill: 'white'});
    gameOver.setVisible(false);
    blocks1 = this.physics.add.image(0,0,'block').setScale(.07);
    blocks2 = this.physics.add.image(0,800,'block').setScale(.07);
    blocks3 = this.physics.add.image(600,0,'block').setScale(.07);
    blocks4 = this.physics.add.image(600,800,'block').setScale(.07);
    point = this.physics.add.image(xrandom,yrandom,'cursor').setScale(.07);
    points = this.add.text(10,10, 'Points: 0',{fontSize: '20px',fill: 'white'});
    cursor.setVisible(false);
   this.input.on('pointermove', function (pointer)
   {
       cursor.setVisible(false).setPosition(pointer.x, pointer.y);

       this.physics.moveToObject(blocks1,pointer, 400);
       this.physics.moveToObject(blocks2,pointer, 400);
       this.physics.moveToObject(blocks3,pointer, 400);
       this.physics.moveToObject(blocks4,pointer, 400);

       
   }, this);

}

function update ()
{

    
    if(Math.abs(blocks1.x-blocks2.x) < 5 && Math.abs(blocks1.y-blocks2.y) < 5)
    {
        blocks1.setActive(false).setVisible(false);
        blocks2.setActive(false).setVisible(false);
        blocks1 = this.physics.add.image(0,0,'block').setScale(.07);
        blocks2 = this.physics.add.image(0,800,'block').setScale(.07);

        this.input.on('pointermove', function (pointer)
        {
            cursor.setVisible(false).setPosition(pointer.x, pointer.y);

            this.physics.moveToObject(blocks1,pointer, 400);
            this.physics.moveToObject(blocks2,pointer, 400);


        
        }, this);
    }

    if(Math.abs(blocks2.x-blocks3.x) < 5 && Math.abs(blocks2.y-blocks3.y) < 5)
    {
        blocks2.setActive(false).setVisible(false);
        blocks3.setActive(false).setVisible(false);
        blocks2 = this.physics.add.image(0,800,'block').setScale(.07);
        blocks3 = this.physics.add.image(600,0,'block').setScale(.07);

        this.input.on('pointermove', function (pointer)
        {
            cursor.setVisible(false).setPosition(pointer.x, pointer.y);


            this.physics.moveToObject(blocks2,pointer, 400);
            this.physics.moveToObject(blocks3,pointer, 400);


        
        }, this);
    }

    if(Math.abs(blocks3.x-blocks4.x) < 5 && Math.abs(blocks3.y-blocks4.y) < 5)
    {
        blocks3.setActive(false).setVisible(false);
        blocks4.setActive(false).setVisible(false);
        blocks4 = this.physics.add.image(600,800,'block').setScale(.07);
        blocks3 = this.physics.add.image(600,0,'block').setScale(.07);

        this.input.on('pointermove', function (pointer)
        {
            cursor.setVisible(false).setPosition(pointer.x, pointer.y);


            this.physics.moveToObject(blocks4,pointer, 400);
            this.physics.moveToObject(blocks3,pointer, 400);


        
        }, this);
    }

    if(Math.abs(blocks1.x-blocks4.x) < 5 && Math.abs(blocks1.y-blocks4.y) < 5)
    {
        blocks1.setActive(false).setVisible(false);
        blocks4.setActive(false).setVisible(false);
        blocks1 = this.physics.add.image(0,0,'block').setScale(.07);
        blocks4 = this.physics.add.image(600,800,'block').setScale(.07);

        this.input.on('pointermove', function (pointer)
        {
            cursor.setVisible(false).setPosition(pointer.x, pointer.y);


            this.physics.moveToObject(blocks1,pointer, 400);
            this.physics.moveToObject(blocks4,pointer, 400);


        
        }, this);
    }



    if(Math.abs(cursor.x - blocks1.x)  < 5 && Math.abs(cursor.y - blocks1.y) < 5)
    {
            
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        bgmusic.stop();
        gameOver.setVisible(true);
        obama.play({volume:1,loop:false});
    }
    if(Math.abs(cursor.x - blocks2.x)  < 5 && Math.abs(cursor.y - blocks2.y) < 5)
    {
            
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        bgmusic.stop();
        gameOver.setVisible(true);
        obama.play({volume:1,loop:false});
    }
    if(Math.abs(cursor.x - blocks3.x)  < 5 && Math.abs(cursor.y - blocks3.y) < 5)
    {
            
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        bgmusic.stop();
        gameOver.setVisible(true);
        obama.play({volume:1,loop:false});
    }
    if(Math.abs(cursor.x - blocks4.x)  < 5 && Math.abs(cursor.y - blocks4.y) < 5)
    {
        
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        bgmusic.stop();
        gameOver.setVisible(true);
        obama.play({volume:1,loop:false});
    }
    if(Math.abs(cursor.x - point.x)  < 15 && Math.abs(cursor.y - point.y) <15)
    {
        
        point.destroy();

        var xrandom = Phaser.Math.Between(10,790);
        var yrandom = Phaser.Math.Between(10,590);
        point = this.physics.add.image(xrandom,yrandom,'cursor').setScale(.07);
        pointsnumber = pointsnumber +10;
        if((pointsnumber % 50) === 0 && pointsnumber != 0)
        {
            fakenews.play({volume: 1, loop: false});
        }
        else
        {
            what.play({volume:1, loop: false});
        }
        points.setText('Score: ' + pointsnumber);

    }

    
}

