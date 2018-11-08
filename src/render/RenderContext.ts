import { RenderPipeline } from "./RenderPipeline";

export class RenderContext {
    protected pipeline: RenderPipeline;
    
    public getPipeline(): RenderPipeline {
        return this.pipeline;
    }
}
