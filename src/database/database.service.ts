import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;
  private readonly logger = new Logger(DatabaseService.name);

  async onModuleInit() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'Management_project',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    this.logger.log('Database pool initialized successfully');
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.logger.log('Database pool closed');
    }
  }

  async execute(sql: string, params: any[] = []): Promise<any> {
    try {
      const sanitizedParams = (params || []).map((p) => (p === undefined ? null : p));
      const [rows] = await this.pool.execute(sql, sanitizedParams);
      return rows;
    } catch (error) {
      this.logger.error(`Database execute error for query "${sql}":`, error);
      throw error;
    }
  }

  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      const sanitizedParams = (params || []).map((p) => (p === undefined ? null : p));
      const [rows] = await this.pool.query(sql, sanitizedParams);
      return rows;
    } catch (error) {
      this.logger.error(`Database query error for query "${sql}":`, error);
      throw error;
    }
  }
}
