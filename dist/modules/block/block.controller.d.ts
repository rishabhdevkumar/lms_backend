import { BlockService } from './block.service';
export declare class BlockController {
    private readonly blockService;
    constructor(blockService: BlockService);
    addBlock(body: any): Promise<any>;
    getAll(): Promise<any>;
}
