
export class Intent<V> {
	protected targetPromise: Promise<V>;
	
	protected promiseValue: V;
	protected promiseError: any;
	protected availableFlag: boolean;
	protected successfulFlag: boolean;
	
	public constructor(promise: Promise<V>) {
		this.targetPromise = promise;
		
		// Listen to promise
		this.targetPromise.then(this.onTargetFulfilled, this.onTargetRejected);
	}
	
	protected onTargetFulfilled(result: V): void {
		this.availableFlag = true;
		this.successfulFlag = true;
		
		this.promiseValue = result;
	}
	
	protected onTargetRejected(error: any): void {
		this.availableFlag = true;
		this.successfulFlag = false;
		
		this.promiseError = error;
	}
	
	/** Returns the value of the promise, or null if the promise is rejected or not fulfilled yet. */
	public get(): V {
		return (this.fulfilled() ? this.promiseValue : null);
	}
	
	public error(): any {
		return (this.rejected() ? this.promiseError : null);
	}
	
	/** Returns whether this Intent's Promise has finished. */
	public available(): boolean {
		return this.availableFlag;
	}
	
	/** Returns whether the promise is fulfilled or rejected, or false when the value is not available. */
	public fulfilled(): boolean {
		return (this.availableFlag && this.successfulFlag);
	}
	
	public rejected(): boolean {
		return (this.availableFlag && !this.successfulFlag);
	}
}
