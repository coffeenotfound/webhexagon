import { GameRenderer } from "render/GameRenderer";
import { MenuManager } from "menu/MenuManager";
import { MainMenu } from "menu/MainMenu";
import { Display } from "Display";
import { Input } from "Input";

export class Game {
	public static GAME_RES_X = 640;
	public static GAME_RES_Y = 480;
	
	private static gameInstance: Game;
	
	public inputSystem: Input;
	public gameRenderer: GameRenderer;
	public menuManager: MenuManager;
	
	public display: Display;
	
	public init(): void {
		// Resolve canvas element
		let element: HTMLElement = document.getElementById("webhexagon-canvas");
		if(!(element instanceof HTMLCanvasElement)) {
			throw new Error("Could not resolve game canvas element: #webhexagon-canvas");
		}
		
		// Create display
		this.display = new Display(element as HTMLCanvasElement);
		this.display.resize(Game.GAME_RES_X, Game.GAME_RES_Y);
		
		// Open display (init stuff)
		this.display.open();
		
		// Create game renderer
		this.gameRenderer = new GameRenderer(this.display.getGLContext());
		
		// Create menu manager
		this.menuManager = new MenuManager();
		
		// Create input
		this.inputSystem = new Input();
		this.inputSystem.bindKeyInputChannel(this.display.getKeyInputChannel());
	}
	
	public start(): void {
		// Focus game canvas
		this.display.focus();
		
		// Open main menu
		this.menuManager.openMenu(new MainMenu());
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
