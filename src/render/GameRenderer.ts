import {Game} from "Game";

export class GameRenderer {
	public glContext: WebGLRenderingContext;
	
	public constructor(glContext: WebGLRenderingContext) {
		this.glContext = glContext;
	}
	
	public buffer: WebGLBuffer;
	
	public renderFrame(): void {
		let gl = this.glContext;
		
		if(!this.buffer) {
			this.buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
			//gl.bufferData(gl.ARRAY_BUFFER, new ArrayBuffer(), gl.STATIC_DRAW);
		}
	}
}
