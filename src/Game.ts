import {GameRenderer} from "render/GameRenderer";

export class Game {
	public static GAME_RES_X = 640;
	public static GAME_RES_Y = 480;
	
	private static gameInstance: Game;
	
	public gameRenderer: GameRenderer;
	
	public canvasElement: HTMLCanvasElement;
	public webglContext: WebGLRenderingContext;
	
	public init(): void {
		// Resolve canvas element
		let element: HTMLElement = document.getElementById("webhexagon-canvas");
		if(!(element instanceof HTMLCanvasElement)) {
			throw new Error("Could not resolve game canvas element: #webhexagon-canvas");
		}
		this.canvasElement = element as HTMLCanvasElement;
		
		// Create webgl context
		let contextAttributes = {
			alpha: false,
			depth: true,
			stencil: true,
			antialias: true,
			failIfMajorPerformanceCaveat: true,
		};
		this.webglContext = this.canvasElement.getContext("webgl", contextAttributes) as WebGLRenderingContext;
		
		if(!this.webglContext) {
			throw new Error("Failed to create webgl context");
		}
		
		// Set canvas size
		this.canvasElement.width = Game.GAME_RES_X;
		this.canvasElement.height = Game.GAME_RES_Y;
		
		// Create game renderer
		this.gameRenderer = new GameRenderer(this.webglContext);
	}
	
	public frame(): void {
		// Render frame
		this.gameRenderer.renderFrame();
	}
	
	public run(): void {
		// Init game
		this.init();
		
		// Start game
		this.start();
		
		// Request first frame
		let mainloop = () => {
			this.frame();
			window.requestAnimationFrame(mainloop);
		};
		window.requestAnimationFrame(mainloop);
	}
	
	public start(): void {
		
	}
	
	public static main(): void {
		// Instantiate game
		this.gameInstance = new Game();
		
		// Run game
		this.gameInstance.run();
	}
	
	public static instance(): Game {
		return this.gameInstance;
	}
}
