const canvas = document.getElementById('my-canvas');
const context = canvas.getContext('2d');
// const tanah = document.querySelector('.tanah')

// console.log(tanah)

canvas.height = (window.innerHeight - ( window.innerHeight / 10 * 2))
canvas.width = (window.innerWidth - ( window.innerWidth / 10 * 0.7))

const framePlayer = {
    run : {
        right :"./assets/Character/Run/Run-Sheet.png",
        left :"./assets/Character/runleft/Run_Sheet.png",
        frameSize : 80
    },
    idle: {
        src : './assets/Character/Idle/Idle-Sheet.png',
        frameSize : 64
    },
    jump: {
        right:'./assets/Character/Jumlp-All/Jump-All-Sheet.png',
        left : '/assets/Character/Jumlp-All/jumpLeft.png',
        frameSize : 64
    },
    dead: '',
    attack: {
        right: './assets/Character/Attack-01/Attack-01-Sheet.png',
        gift: './assets/Character/Attack-01/Attack-01.gif',
        frameSize : 96
    }
}
gravity = 1



class Bakcground {
    constructor({position , imageSrc , velocityX}){
        this.position = position
        this.velocityX = velocityX
        this.image = new Image()
        this.image.src = imageSrc
        this.translate = {
            x: 0,
            y: 0,
        }
        // this.image.src = imageSrc
    }

    draw() {
        // if ( !this.image ) return
        // context.drawImage(this.image , this.position.x , this.position.y , ) 
        const pattern = context.createPattern( this.image , 'repeat')
        context.fillStyle = pattern
        context.fillRect(this.position.x, this.position.y, canvas.width * 9 , canvas.height)
        
        
    }
    
    update(){
        this.draw()
        if(mc.position.x > canvas.width/2 && mc.velocity.x > 0){
            this.translate.x -= mc.velocity.x / this.velocityX
        }else if (mc.position.x < canvas.width/10 && mc.velocity.x < 0 ) {
            if(this.translate.x < 0){

                this.translate.x -= mc.velocity.x / this.velocityX
            }
        }
        context.translate( this.translate.x , this.translate.y)
    }
}


class Objek {

    constructor({position , imageSrc}) {

        this.position = position
        this.translate = {
            x: 0,
            y: 0
        }
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw(){

        // context.drawImage(this.image , 0 , 0 , 300 , 300)

        const pattern = context.createPattern( this.image , 'repeat')
        context.fillStyle = pattern
        context.fillRect(this.position.x , this.position.y , canvas.width * 9 , canvas.height / 21)
        // this.image.translate( background1.translate.x , background1.translate.y)
        // context.setTransform(1, 0, 0, 1, mc.velocity.x, 0);
    }

    update(){
        this.draw()

        // if(mc.position.x > canvas.width/2 && mc.velocity.x > 0){
        //     this.translate.x -= mc.velocity.x / 6
        // }else if (mc.position.x < canvas.width/10 && mc.velocity.x < 0 ) {
        //     if(this.translate.x < 0){

        //         this.translate.x -= mc.velocity.x / 6
        //     }
        // }


    }

    

}



// setInterval(() => {
    // if( key.a.pressed || key.d.pressed){

    //     if( mc.frames == 7){
    //         mc.frames = 0
    //     }else {
    //         mc.frames++
    //     }
    // }else{
    //     if( mc.frames == 3){
    //         mc.frames = 0
    //     }else {
    //         mc.frames++
    //     }
    // }

    
// }, 200);

class Player {
    
    constructor(position) {
            this.position = position
            this.frameSize = 64
            this.frames = 0
            this.image = new Image()
            this.image.src = './assets/Character/Idle/Idle-Sheet.png'
            this.velocity = {
                x: 0,
                y: 0
            }
            this.size = {
                width : 150,
                height : 150
            }

            this.numberAttack = 1
            this.arah = 'right'

            this.ability = {
                jump : {
                    jump:1 ,
                    canJump : 1,
                    jumpHeight : -17
                }
            }
    }
    
    

    jump(){

        if( this.ability.jump.canJump > 0) {
            this.ability.jump.canJump -= 1
            key.jump.pressed = true
            this.frames = 0
            this.velocity.y = this.ability.jump.jumpHeight
            
            setTimeout(() => {
                key.jump.pressed = false
        }, 600);
        }
        
    }

    attack () {
        if(key.e.pressed == false){
            key.e.pressed = true
            
            
        
        setTimeout(() => {
            
            key.e.pressed = false
        }, 1000);
        
    }

    }

    
    draw() {
        // context.fillStyle = "red"
        context.drawImage( this.image , this.frameSize * this.frames , 0 ,64  , 64 ,this.position.x , this.position.y , this.size.width , this.size.height)
    }
    
    update () {
        this.draw()
        this.position.y += this.velocity.y
        if( this.position.x > canvas.width/2 && this.velocity.x > 0 ){
            // background3.translate.x -= this.velocity.x /2
        }else if(this.position.x < canvas.width/10 && this.velocity.x < 0 ){
            // if(background3.translate.x < 0){
                //     background3.translate.x -= this.velocity.x /2
            // }
        }else{
            
            this.position.x += this.velocity.x 
        }
        if ( this.position.y + this.size.height + this.velocity.y < canvas.height - 32) {
            this.velocity.y += gravity
        } else { this.velocity.y = 0  }


        if( this.velocity.y == 0){
            setTimeout(() => {
                if( this.velocity.y == 0){
                    this.ability.jump.canJump = this.ability.jump.jump
                }
            }, 100);
        }

        
    }
}

var jump = 2

const mc = new Player({
    x : 200,
    y : 50,
})
const side = new Player({
    x : 0,
    y : 0,
})
const ste = new Player({
    x : 300,
    y : 0,
})


const objk = new Objek({
    position : {
        x : 0,
        y: 0
    },
    imageSrc : './oak_woods_v1.0/tanah/tanah.png'
    // velocityX : 6
})


const background1 = new Bakcground({
    position: {
        x : 0,
        y: 0
    },
    imageSrc : './oak_woods_v1.0//background/background_layer_1.png',
    velocityX : 6
})

const background2 = new Bakcground({
    position: {
        x : 0,
        y: 0
    },
    imageSrc : './oak_woods_v1.0//background/background_layer_2.png',
    velocityX : 6
})
// background2.translate(200 , 0)

const background3 = new Bakcground({
    position: {
        x : 0,
        y: 0
    },
    imageSrc : './oak_woods_v1.0//background/background_layer_3.png',
    velocityX : 6
})

let y = 100
var frameRatePlayer = 0
var setFrameratePlayer = 7

const animate = () => {
    requestAnimationFrame(animate)
    // console.log("go")
    // context.fillStyle = 'red'
    // context.fillRect( 30 , y , 30 , 30 )
    // y++
    
    context.fillStyle = 'white';
    context.fillRect( 0 , 0 , canvas.width, canvas.height)

    context.save()
    context.scale( 3.2 , 3.2 )
    background1.update()
    background2.update()
    background3.update()
    context.restore()

    
    mc.update()
    // ste.update()
    // objk.update()
    // side.update()
    
    if( frameRatePlayer == 0 ){
        frameRatePlayer = setFrameratePlayer
        if(key.jump.pressed){

            if( mc.arah == 'right'){
                mc.image.src = framePlayer.jump.right
                mc.frameSize = framePlayer.jump.frameSize
            }else {
                mc.image.src = framePlayer.jump.left
                mc.frameSize = framePlayer.jump.frameSize
                
            }

            if( mc.frames >= 15){
                mc.frames = 4
            }else if(mc.frames == 0){
                mc.frames = 5
            }else{
                mc.frames++
            }
        }else if( key.e.pressed ){

            if( mc.arah == 'right'){
                mc.image.src = framePlayer.attack.right
                mc.frameSize = framePlayer.attack.frameSize
                
            }else {
                mc.image.src = framePlayer.attack.right
                mc.frameSize = framePlayer.attack.frameSize
                
            }

            if( mc.frames == 5 ){
                mc.framses == 0
            }else{
                mc.frames++
            }

        }else if(key.d.pressed){
            mc.image.src = framePlayer.run.right
        mc.frameSize = framePlayer.run.frameSize
        mc.velocity.x = 4
            if( mc.frames >= 7){
                mc.frames = 0
            }else {
                mc.frames++
            }


        }else if( key.a.pressed){
            mc.velocity.x = -4
            mc.image.src = framePlayer.run.left
            mc.frameSize = framePlayer.run.frameSize
                if( mc.frames >= 7){
                    mc.frames = 0
                }else {
                    mc.frames++
                }
            }else{
                mc.velocity.x = 0
            mc.image.src = framePlayer.idle.src
            mc.frameSize = framePlayer.idle.frameSize
            mc.arah = 'right'
                if( mc.frames >= 3){
                    mc.frames = 0
                }else {
                    mc.frames++
                }
            }
    }else {
        frameRatePlayer--
    }
    
    
    
    if(key.jump.pressed){
        
        
    }else if(key.e.pressed == true){
        setFrameratePlayer = 4
        
        
    }else if( key.d.pressed ) {
        
        mc.arah = 'right'
    }else if(key.a.pressed ) {
        
        mc.arah = 'left'
    }else{
            setFrameratePlayer = 7
            
        }
    
    
    }
    
    
    const key = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
    jump:{
        pressed: false
    },
    e: {
        pressed: false
    }
}


animate()

var jump = 2

window.addEventListener( 'keydown' , (e) => {
    console.log(e.key)
    switch ( e.key ){
        case 'd':
            key.d.pressed = true
            break
            
            case 'a' : 
            key.a.pressed = true
            break
            
            case ' ':  
            mc.jump()
            break

            case 'e':
            mc.attack()
            break        
        default : 
        mc.velocity.x = 0
    }
    
})

window.addEventListener( 'keyup' , (e) => {
    console.log(e.key)
    switch ( e.key ){
        case 'd' :
            key.d.pressed = false
            break
            
            case 'a' : 
            key.a.pressed = false
            break
                
        }
    
})
