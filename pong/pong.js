var ballCount=0, balls={}
class Ball{
	constructor(id){
		//Insert a div as a ball
		this.id=id
		$("#container").append(`<div class='ball' id='${id}'></div>`)
		this.ball=$("#"+id).get()[0]
		this.initialize()
	}
	destroy(){
		this.ball.style.display="none"
		clearInterval(this.timer)
		balls[this.id]=null
		ballCount--
		if(ballCount<=0){
			play.removeAttribute("hidden")
			$("#bonus").css("display","none")
		}
	}
	initialize(){
			//initialize ball
		
			this.speed=10
			this.angle=Math.PI/4*(Math.random()*2-1)+Math.PI*(Math.random()>0.5?1:0)
		this.ball.style.top=(rect.top+rect.height*(Math.random()))+'px'
		this.ball.style.left=(rect.left+rect.width/2)+'px'

			//begin animation
	this.paddleRightUp=true
	this.bounceTimes=0
	this.startTime=new Date().getTime()

	this.timer = setInterval(()=>{
		
		let x=this.ball.getBoundingClientRect().x,
		y=this.ball.getBoundingClientRect().y,
		lRect = paddleLeft.getBoundingClientRect(),
	rRect=paddleRight.getBoundingClientRect()

	this.newTime =new Date().getTime()
	
	//if the ball hit bonus
	if(Math.abs(y-bonusY)<20&&Math.abs(x-bonusX)<40&&this.newTime-this.startTime>200){
		balls[this.newTime.toString()]=new Ball(this.newTime.toString())
		ballCount++
		this.startTime=new Date().getTime()
	}
	//set a flag to control right paddle's direction and add random angle
		if(rRect.top<rect.top){
			this.paddleRightUp=false
		}
		if(rRect.bottom>rect.bottom){
			this.paddleRightUp=true
		}
	//move right paddle
			paddleRight.style.top=this.paddleRightUp?((rRect.top-20)+'px'):((rRect.top+20)+'px')
		
		//bounce against top and bottom borders
		if(y<rect.top){
			this.angle=Math.PI*2-this.angle
			y=rect.top
		}
		if(y>rect.bottom){
			this.angle=Math.PI*2-this.angle
			y=rect.bottom
		}

		//bounce to left border
		if(x<rect.left){

			//fail or succeed to catch the ball
			if(y<lRect.top||y>lRect.bottom){
				//fail to catch
				this.destroy()
				if(ballCount==0){
					p1--
					player1.innerHTML=p1
					if(p1==0){
						
						alert('You lose!')
						clear()
						balls={}
						p1=10
						p2=10
						player1.innerHTML=p1
						player2.innerHTML=p2
					}
				}
			
			}else{
			this.angle=Math.PI-this.angle
			x=rect.left
			this.speed*=1.2
			}
	
		}

		//bounce to the right border
		if(x>rect.right){
			//increase the difficulty by ensuring there are at least 1 bounces off the right paddle
			if(this.bounceTimes<=1&&ballCount<=1){
					this.angle=Math.PI-this.angle
			//add some angle for the moving right paddle
			if(this.paddleRightUp){
				this.angle+=0.3
			}else{
				this.angle-=0.3
			}

			this.speed*=1.2
			x=rect.right
			this.bounceTimes++
			}else if(y<rRect.top||y>rRect.bottom){
				//fail to catch
			
			this.destroy()
			
			this.bounceTimes=0
			p2--
			player2.innerHTML=p2
			if(p2==0){
	
				
				alert('You win!')
				clear()
				balls={}
				p1=10
				p2=10
				player1.innerHTML=p1
				player2.innerHTML=p2
			}
			}else{
			this.angle=Math.PI-this.angle
			if(this.paddleRightUp){
				this.angle+=0.3
			}else{
				this.angle-=0.3
			}
			
			x=rect.right
			this.speed*=1.2
			this.bounceTimes++
			}
		}
		this.angle=this.angle%(Math.PI*2)
		


		this.ball.style.top=(y+this.speed*Math.sin(this.angle))+'px'
		this.ball.style.left=(x+this.speed*Math.cos(this.angle))+'px'
		
},16)
	}
}

//get elements
var rect = $("#container").get()[0].getBoundingClientRect(),
	play=$("#play").get()[0],
	score=$("#score").get()[0],
	player1=$("#player1").get()[0],
	player2=$("#player2").get()[0],
	// ball=$("#ball").get()[0],
	paddleLeft=$("#paddleLeft").get()[0],
	paddleRight=$("#paddleRight").get()[0],
	bonusRect,bonusY,bonuxX
	//initialize speed and score
	var p1=10, p2=10
	//play button listener
	$(document).keyup((e)=>{
	//press space bar to play
	if(e.keyCode==32){
		if(ballCount!=0){
			return
		}
		$("#play").click()
	}
	})
	function clear (){
		for (var b in balls){
			if(balls[b]!=null){
				balls[b].destroy()
			}
		}
	}
	//click play button to play
	$("#play").click(()=>{
		
	//hide play button and show score
	$("#play").attr("hidden",true)
	$("#bonus").css("display","flex")
	$("#score").removeAttr("hidden")
	bonusRect=$("#bonus").get()[0].getBoundingClientRect()
	bonusY=bonusRect.top+(bonusRect.bottom-bonusRect.top)/2,
	bonusX=bonusRect.left+(bonusRect.right-bonusRect.left)/2
	//initialize paddles
	$(".paddle").css("display","block")
	
	$("#paddleLeft").offset({
		left:$("#container").offset().left-$("#paddleLeft").outerWidth(),
		top:$("#container").offset().top+$("#container").height()/2-$("#paddleLeft").outerHeight()/2
	})
	$("#paddleRight").offset({
		left:$("#container").offset().left+$("#container").width(),
		top:$("#container").offset().top+$("#container").height()/2-$("#paddleRight").outerHeight()/2
	})

	// add mouse and keyboard control
// 	var keyTimer
// $(document).keydown((e)=>{
// 		// console.log(e.keyCode)
// 		clearInterval(keyTimer)
// 		var acc=1
// 		if(e.keyCode==38){
// 			keyTimer=setInterval(()=>{
// 				let lRect=paddleLeft.getBoundingClientRect()
// 				if(lRect.top>rect.top){
// 					paddleLeft.style.top=(lRect.top-acc)+'px'
// 				}
// 				acc++
// 			},20)
// 		}
// 		if(e.keyCode==40){
// 			keyTimer=setInterval(()=>{
// 				let lRect=paddleLeft.getBoundingClientRect()
// 				if(lRect.bottom<rect.bottom){
// 					paddleLeft.style.top=(lRect.top+acc)+'px'
// 				}
// 				acc++
// 			},20)
// 		}
// 	})
// $(document).keyup((e)=>{
// if(e.keyCode==38||e.keyCode==40){
// 	clearInterval(keyTimer)
// }
// 	})

$(document).mousemove((e)=>{
	// console.log($("#container").position())
			let lRect = paddleLeft.getBoundingClientRect(),
	rRect=paddleRight.getBoundingClientRect()

		if(e.pageY<$("#container").offset().top){
				$("#paddleLeft").offset().top=$("#container").offset().top
		}else if(e.pageY>$("#container").css("bottom")){
			paddleLeft.style.top=rect.bottom-lRect.height+'px'
		}else{
			paddleLeft.style.top=(e.pageY-lRect.height/2)+'px'
		}
})
let id =new Date().getTime().toString()
balls[id]=new Ball(id)
ballCount++

})
