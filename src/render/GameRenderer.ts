import {Game} from "Game";

export class GameRenderer {
	public glContext: WebGLRenderingContext;
	
	public constructor(glContext: WebGLRenderingContext) {
		this.glContext = glContext;
	}
	
	public buffer: WebGLBuffer;
	
	public renderFrame(): void {
		let gl = this.glContext;
		let game = Game.instance();
		
		if(game.display.isFocused()) gl.clearColor(1.0, 0.0, 0.0, 1.0);
		else gl.clearColor(0.5, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		
		/*
		if(!this.buffer) {
			this.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
			//gl.bufferData(gl.ARRAY_BUFFER, new ArrayBuffer(), gl.STATIC_DRAW);
		}
		*/
	}
}
