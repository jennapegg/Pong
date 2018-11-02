import { SVG_NS } from "../settings";

export default class Ball {
    constructor(radius, boardWidth, boardHeight,) {
      this.radius = radius;
      this.boardWidth = boardWidth;
      this.boardHeight = boardHeight;
      this.direction = 1;

      this.color = "#FFF";

      this.ping = new Audio("public/sounds/pong-01.wav");

      this.reset();
    } // end of constructor

    reset() {
      // this.ax = 0.01;
      // this.ay = 0.01;

      this.x = this.boardWidth / 2;
      this.y = this.boardHeight / 2;

      this.vy = 0;
      while(this.vy === 0) {
        this.vy = Math.floor(Math.random() * 10 - 5);
      }

      this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    wallCollision(){
      const hitLeft = this.x - this.radius <= 0;
      const hitRight = this.x + this.radius >= this.boardWidth;
      const hitTop = this.y - this.radius <= 0;
      const hitBottom = this.y + this.radius >= this.boardHeight;
      let colors = ['red', 'green', 'blue', 'orange', 'yellow'];

      if(hitLeft || hitRight){
        this.vx *= -1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
     }else if (hitTop || hitBottom){
        this.vy *= -1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
  }


    paddleCollision(player1, player2) {
      if (this.vx > 0) {
        let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
        let [leftX, rightX, topY, bottomY] = paddle;

        if (
          (this.x + this.radius >= leftX) && 
          (this.x +this.radius <= rightX) && 
          (this.y >= topY && this.y <= bottomY)
          ){
            this.vx *= -1
            this.ping.play();
        }
      } else {
        let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
        let [leftX, rightX, topY, bottomY] = paddle;

        if(
          (this.x - this.radius <= rightX) &&
          (this.x - this.radius >= leftX) &&
          (this.y >= topY && this.y <= bottomY)
        ){
          this.vx *= -1
          this.ping.play();
        }
      }
    }

    goal(player){
      player.score++;
      this.reset();
      player.score;
    }

    render(svg, player1, player2) {
        // this.vx += this.ax;
        // this.vy += this.ay;

        const goalLeft = this.x - this.radius <= 0;
        const goalRight = this.x + this.radius >= this.boardWidth;

        if (goalLeft){
          this.goal(player2);
          this.direction = -1;
          }else if(goalRight){
            this.goal(player1);
            this.direction = 1;
          }

        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(player1, player2);

        
        let ball = document.createElementNS(SVG_NS, 'circle');

        ball.setAttributeNS(null, 'fill', this.color);
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);

        svg.appendChild(ball);

        
    }
  }

