import { KeyInputChannel } from "KeyInputChannel";

export class Input {
	public boundKeyInputChannel: KeyInputChannel;
	
	public constructor() {
		
	}
	
	public bindKeyInputChannel(channel: KeyInputChannel): void {
		// Deregister previous callback
		if(this.boundKeyInputChannel != null) {
			this.boundKeyInputChannel.unregisterKeyEventCallback(this.keyCallback);
		}
		
		// Register new callback
		this.boundKeyInputChannel = channel;
		if(this.boundKeyInputChannel != null) {
			this.boundKeyInputChannel.registerKeyEventCallback(this.keyCallback);
		}
	}
	
	protected keyCallback(event: KeyboardEvent, pressed: boolean): void {
		console.log((pressed ? "Pressed ": "Released ") + event.key);
	}
}
