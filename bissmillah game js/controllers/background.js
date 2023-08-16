class Background {
    constructor({position , imageSrc}){
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
        this.translate = {
            x: 0,
            y: 0,
        }
        
    }

    draw() {
        const pattern = context.createPattern( this.image , 'repeat')
        context.fillStyle = pattern
        context.fillRect(this.position.x, this.position.y, canvas.width * 9 , canvas.height)
        
        
    }
    
    update(){
        
        this.draw()
        if(mc.position.x > canvas.width/2 && mc.velocity.x > 0){
            this.translate.x -= mc.velocity.x / 6
        }else if (mc.position.x < canvas.width/10 && mc.velocity.x < 0 ) {
            if(this.translate.x < 0){

                this.translate.x -= mc.velocity.x / 6
            }
        }
        context.translate( this.translate.x , this.translate.y)
    }
}

export default Background