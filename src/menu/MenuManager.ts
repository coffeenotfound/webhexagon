import { Menu } from "./Menu";

export class MenuManager {
	public menuStack: Array<Menu>;
	
	public constructor() {
		this.menuStack = new Array<Menu>();
	}
	
	public getOpenMenuNum(): number {
		return this.menuStack.length;
	}
	
	public getOpenMenu(index: number): Menu {
		return (this.menuStack.length <= 0 || Math.abs(index) >= this.menuStack.length ? null : this.menuStack[index > 0 ? index : this.menuStack.length-1-index]);
	}
	
	public getTopMostMenu(): Menu {
		return (this.menuStack.length > 0 ? this.menuStack[this.menuStack.length-1] : null);
	}
	
    public openMenu(menu: Menu): void {
		if(menu != undefined) {
			this.menuStack.push(menu);
		}
	}
	
	public popMenu(expected: Menu): void {
		if(expected != null) {
			if(this.menuStack.length > 0 && expected === this.menuStack[this.menuStack.length-1]) {
				this.menuStack.pop();
			}
		}
	}
}
