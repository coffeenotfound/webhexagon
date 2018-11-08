import { KeyInputChannel } from "KeyInputChannel";

export class Display {
	protected canvas: HTMLCanvasElement;
	protected glContext: WebGLRenderingContext;
	
	protected keyInputChannel: CanvasKeyInputChannel;
	
	public constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		
		this.keyInputChannel = new CanvasKeyInputChannel(this);
	}
	
	public open(): void {
		// Create webgl context
		let contextAttributes = {
			alpha: false,
			depth: true,
			stencil: true,
			antialias: false,
			failIfMajorPerformanceCaveat: true,
		};
		this.glContext = this.canvas.getContext("webgl", contextAttributes) as WebGLRenderingContext;
		
		if(!this.glContext) {
			throw new Error("Failed to create webgl context");
		}
		
		// Register focus event handler
		this.canvas.addEventListener("focus", (e: FocusEvent) => {
			this.canvas["requestPointerLock"]();
		});
		this.canvas.addEventListener("blur", (e: FocusEvent) => {
			
		});
		
		// Register key event handlers
		this.canvas.addEventListener("keydown", (e: KeyboardEvent) => {
			this.keyInputChannel.handleKeyDown(e);
		});
		this.canvas.addEventListener("keyup", (e: KeyboardEvent) => {
			this.keyInputChannel.handleKeyUp(e);
		});
	}
	
	public resize(width: number, height: number): void {
		// Set canvas element size
		this.canvas.width = width;
		this.canvas.height = height;
	}
	
	public focus(): void {
		// Focus the canvas
		this.canvas.focus();
	}
	
	public isFocused(): boolean {
		return (this.canvas === document.activeElement);
	}
	
	public getGLContext(): WebGLRenderingContext {
		return this.glContext;
	}
	
	public getKeyInputChannel(): KeyInputChannel {
		return this.keyInputChannel;
	}
}

export class CanvasKeyInputChannel extends KeyInputChannel {
	protected display: Display;
	
	protected callbackList: Array<(event: KeyboardEvent, pressed: boolean)=>void>;
	
	public constructor(display: Display) {
		super();
		this.display = display;
		
		this.callbackList = new Array();
	}
	
	public handleKeyDown(event: KeyboardEvent): void {
		for(let c of this.callbackList) {
			c(event, true);
		}
	}
	
	public handleKeyUp(event: KeyboardEvent): void {
		for(let c of this.callbackList) {
			c(event, false);
		}
	}
	
	public registerKeyEventCallback(callback: (event: KeyboardEvent, pressed: boolean)=>void): boolean {
		if(callback == null) throw new Error("Cannot register key input channel callback: null");
		
		// Check if callback already registered
		for(let c of this.callbackList) {
			if(c === callback) {
				return false;
			}
		}
		
		// Add callback to list
		this.callbackList.push(callback);
		return true;
	}
	
	public unregisterKeyEventCallback(callback: (event: KeyboardEvent, pressed: boolean)=>void): boolean {
		let i = this.callbackList.indexOf(callback);
		if(i != -1) {
			this.callbackList.splice(i, 1);
			return true;
		}
		return false;
	}
	
	public isValid(): boolean {
		return true;
	}
}
