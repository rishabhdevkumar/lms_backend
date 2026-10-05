import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool;
    private readonly logger;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    execute(sql: string, params?: any[]): Promise<any>;
    query(sql: string, params?: any[]): Promise<any>;
}
