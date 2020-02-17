var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 600,
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
            createPlane: createPlane,
            shot: shot,
            shoot: shoot,
            planeCrash: planeCrash
        }
    }
};

new Phaser.Game(config);
function preload ()
{
    this.physics.world.setBounds(0,0,400,600);
    this.load.image('background','assets/background.png');//https://i.stack.imgur.com/WYuA2.jpg
    this.load.image('jumper','assets/images.png');//https://livingtheindie.com/wp-content/uploads/2017/04/Futuristic2D-Screenshots02.png
    this.load.image('jumper2','assets/images2.png');//https://livingtheindie.com/wp-content/uploads/2017/04/Futuristic2D-Screenshots02.png
    this.load.image('laser', 'assets/laser.png');//https://ya-webdesign.com/images250_/laser-sprite-png-6.png
}
function create ()
{
    space = this.add.tileSprite(0,0,400,600,'background');
    space.setOrigin(0,0);


    jumper = this.physics.add.image(200,300,'jumper').setScale(.25).setCollideWorldBounds(true);
    planes = this.add.group();
    bullets = this.add.group();


    //space.tilePositionY = this.myCam.scrollY * .3;

     this.time.addEvent({delay: 2000, loop: true, callback: createPlane, callbackScope:this});
    

     this.input.keyboard.on('keydown-' + 'SPACE', shoot,this);

}

function update ()
{

    cursor = this.input.keyboard.createCursorKeys();
    if(cursor.left.isDown)
    {
        jumper.x = jumper.x -5;
    }

    if(cursor.right.isDown)
    {
        jumper.x = jumper.x + 5;
    }

    if(cursor.up.isDown)
    {
        jumper.y= jumper.y-5;
    }

    if(cursor.down.isDown)
    {
        jumper.y = jumper.y+5;
    }
    

    
}
function createPlane ()
{
    var plane = this.physics.add.sprite(Phaser.Math.Between(10,390),0,'jumper2').setScale(.25);
    plane.health = 5;
    planes.add(plane);
    plane.body.immovable = true;
    plane.setVelocityY(40);
    this.physics.add.collider(jumper,plane);
    
    this.time.addEvent
    ({
        delay:3000,loop:true,callback: function()
        {    
            this.time.addEvent(
            {
                delay:500,callback: function()
                {
                    if(plane.active===true)
                    {
                        var bullet1 = this.physics.add.sprite(plane.x,plane.y,'laser').setScale(.1);
                        bullet1.setVelocityY(300);
                        this.physics.add.collider(bullet1,jumper,shot);
                        if(bullet1.y >= 600)
                        {
                            bullet1.setActive(false).setVisible(false);
                        }
                    }
                },callbackScope: this, repeat: 2
            })

        },callbackScope:this
    });
    if(plane.y >= 600)
    {
        plane.setActive(false).setVisible(false);
    }
    
}
function shot (bullet1,jumper)
{
    if(jumper.active === true && bullet1.active === true)
    {
        jumper.setActive(false).setVisible(false);
        bullet1.setActive(false).setVisible(false);
    }
    this.endgame;
}
function shoot()
{
    if(jumper.active === true)
    {
        var bullet = this.physics.add.sprite(jumper.x,jumper.y,'laser').setScale(.1);
        bullet.setVelocityY(-300);
        bullets.add(bullet);
        this.physics.add.collider(bullets,planes,planeCrash)
        if(bullet.y <=0)
        {
            bullet.setActive(false).setVisible(false);
        }
    }
}
function planeCrash(bullet,plane)
{
    plane.health = plane.health -1;
    if(plane.health === 0)
    {
        plane.setActive(false).setVisible(false);
        plane.destroy();
       
    }
     bullet.destroy();
}