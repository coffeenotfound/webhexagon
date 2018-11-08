
export abstract class KeyInputChannel {
	
	public abstract registerKeyEventCallback(callback: (event: KeyboardEvent, pressed: boolean)=>void): boolean
	;
	
	public abstract unregisterKeyEventCallback(callback: (event: KeyboardEvent, pressed: boolean)=>void): boolean
	;
	
	public abstract isValid(): boolean
	;
}
