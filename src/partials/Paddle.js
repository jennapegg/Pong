import { SVG_NS } from "../settings";

export default class Paddle {
    constructor(boardHeight, width, height, x, y, up, down, player) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 5;
      this.score = 0;

      this.player = player;
      this.keyState = {};
      this.keyUp = up;
      this.keyDown = down;

      document.addEventListener('keydown', event => {
        this.keyState[event.key || event.which] = true;
      }, true)

      document.addEventListener('keyup', event => {
        this.keyState[event.key || event.which] = false;
      }, true)

      // document.addEventListener("keydown", event => {
      //   switch (event.key) {
      //     case up:
      //       this.up();
      //       this.y = Math.max(0, (this.y - this.speed));
      //       break;
      //     case down:
      //       this.down();
      //       this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed));
      //       break;
      //   }
      // });
    }//end of constructor

    up(){
      this.y = Math.max(0, (this.y - this.speed));
      this.y = this.y - this.speed;
    }

    down(){
      this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed));
      this.y = this.y + this.speed;
    }

    coordinates(x, y, width, height) {
      let leftX = x;
      let rightX = x + width;
      let topY = y;
      let bottomY = y + height;
      return [leftX, rightX, topY, bottomY];
    }

    //...
    render(svg) {
      if(this.keyState[this.keyUp] && this.player === 'player1'){
        this.up();
      }
      if(this.keyState[this.keyDown] && this.player === 'player1'){
        this.down();
      }

      if(this.keyState[this.keyUp] && this.player === 'player2'){
        this.up();
      }

      if(this.keyState[this.keyDown] && this.player === 'player2'){
        this.down();
      }

        let paddle = document.createElementNS(SVG_NS, 'rect');

        paddle.setAttributeNS(null, 'fill', '#FFF');
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'x', this.x); //x of the top left corner
        paddle.setAttributeNS(null, 'y', this.y); //y of the top left corner

        svg.appendChild(paddle);
    }

  }