import { StateService } from './state.service';
export declare class StateController {
    private readonly stateService;
    constructor(stateService: StateService);
    add(body: any): Promise<any>;
    getAll(): Promise<any>;
    search(body: any): Promise<any>;
    update(body: any): Promise<any>;
    deleteBody(body: any): Promise<any>;
    deleteParam(id: string): Promise<any>;
}
