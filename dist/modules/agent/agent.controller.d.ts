import { AgentService } from './agent.service';
export declare class AgentController {
    private readonly agentService;
    constructor(agentService: AgentService);
    addAgent(body: any): Promise<any>;
    getAll(): Promise<any>;
}
