import { SubAgentService } from './sub-agent.service';
export declare class SubAgentController {
    private readonly subAgentService;
    constructor(subAgentService: SubAgentService);
    addSubAgent(body: any): Promise<any>;
    getAll(): Promise<any>;
}
