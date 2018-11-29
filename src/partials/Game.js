import Board from './Board';
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";
import { SVG_NS, KEYS } from '../settings';

export default class Game {
	constructor(element, width, height) {

		//board
		this.element = element;
		this.width = width;
		this.height = height;

		//paddle
		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;

		//ball

		this.ball = new Ball(8, this.width, this.height);
		this.ball2 = new Ball(10, this.width, this.height);
		this.ball3 = new Ball(12, this.width, this.height);

		// winner 
		this.gameOver = false;

		//paddle
		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z,
			"player1"
		)

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			"player2"
		)

		this.score1 = new Score((this.width / 2) - 50, 30, 30)
		this.score2 = new Score((this.width / 2) + 25, 30, 30)

		document.addEventListener("keydown", event => {
			switch (event.key) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
			}
		});

		//board
		this.gameElement = document.getElementById(this.element);
		this.board = new Board(this.width, this.height);


	}//end of constructor

	render() {
		// More code goes here...

		if (this.pause || this.gameOver) {
			return;
		}

		if (this.player1.score === 10) {
			this.gameOver = true;
			alert('You Won Player 1!');
			document.location.reload();
			this.gameOver = true;
		} else if (this.player2.score === 10) {
			alert('You Won PLayer 2!');
			document.location.reload();
			this.gameOver = true;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);

		this.gameElement.appendChild(svg);
		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);

		this.ball.render(svg, this.player1, this.player2);

		if (this.player1.score >= 4 || this.player2.score >= 4) {
			this.ball2.render(svg, this.player1, this.player2);
		}
		if (this.player1.score >= 7 || this.player2.score >= 7) {
			this.ball3.render(svg, this.player1, this.player2);
		}

		this.player1.paddleHeight

		this.score1.render(svg, this.player1.score);
		this.score2.render(svg, this.player2.score);
	}
}
