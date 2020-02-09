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
function preload ()
{
    this.load.image('block', 'assets/trump.png');
    this.load.image('cursor', 'assets/bomb.png');
}
//var gameOver;
function create ()
{
    var xrandom = Phaser.Math.Between(10,790);
    var yrandom = Phaser.Math.Between(10,590);
    cursor = this.add.image(400, 300, 'cursor').setVisible(false);
    gameOver = this.add.text(50,300, 'THANKS OBAMA',{fontSize: '100px',fill: 'black'});
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
    var distx12 = blocks1.x-blocks2.x;
    var disty12 = blocks1.y-blocks2.y;
    var distx21 = blocks2.x-blocks1.x;
    var disty21 = blocks2.y-blocks1.y;

    if(distx12 > -5 && disty12 > -5 && distx21 < 5 && disty21 < 5 )
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
    var distx23 = blocks2.x-blocks3.x;
    var disty23 = blocks2.y-blocks3.y;
    var distx32 = blocks3.x-blocks2.x;
    var disty32 = blocks3.y-blocks2.y;

    if(distx23 > -5 && disty23  > -5 && distx32 < 5 && disty32 < 5 )
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

    var distx34 = blocks3.x-blocks4.x;
    var disty34 = blocks3.y-blocks4.y;
    var distx43 = blocks4.x-blocks3.x;
    var disty43 = blocks4.y-blocks3.y;

    if(distx34 > -5 && disty34 >- 5 && distx43 < 5 && disty43 < 5 )
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

    var distx14 = blocks1.x-blocks4.x;
    var disty14 = blocks1.y-blocks4.y;
    var distx41 = blocks4.x-blocks1.x;
    var disty41 = blocks4.y-blocks1.y;

    if(distx14 > -5 && disty14 > -5 && distx41 < 5 && disty41 < 5 )
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
        gameOver.setFill('white');

    }
    if(Math.abs(cursor.x - blocks2.x)  < 5 && Math.abs(cursor.y - blocks2.y) < 5)
    {
        
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        gameOver.setFill('white');

    }
    if(Math.abs(cursor.x - blocks3.x)  < 5 && Math.abs(cursor.y - blocks3.y) < 5)
    {
        
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        gameOver.setFill('white');

    }
    if(Math.abs(cursor.x - blocks4.x)  < 5 && Math.abs(cursor.y - blocks4.y) < 5)
    {
        
        blocks1.destroy();
        blocks2.destroy();
        blocks3.destroy();
        blocks4.destroy();
        point.destroy();
        gameOver.setFill('white');

    }
    if(Math.abs(cursor.x - point.x)  < 10 && Math.abs(cursor.y - point.y) <10)
    {
        
        point.destroy();
        var xrandom = Phaser.Math.Between(10,790);
        var yrandom = Phaser.Math.Between(10,590);
        point = this.physics.add.image(xrandom,yrandom,'cursor').setScale(.07);
        pointsnumber = pointsnumber +10;
        points.setText('Score: ' + pointsnumber);

    }


}

