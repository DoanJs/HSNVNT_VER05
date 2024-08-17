import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
  private dataSource: DataSource;

  private async initializeConnection(config: DataSourceOptions) {
    this.dataSource = new DataSource(config);
    try {
      await this.dataSource.initialize();
    } catch (error) {
        throw new Error('Database connection is not initialized');
    }
  }

  public async changeConnectionConfig(newConfig: DataSourceOptions) {
    if (this.dataSource?.isInitialized) {
      await this.dataSource.destroy();  // Close the current connection
    }
    await this.initializeConnection(newConfig);  // Initialize with new config
  }

  public getDataSource(): DataSource {
    if (!this.dataSource.isInitialized) {
      throw new Error('Database connection is not initialized');
    }
    return this.dataSource;
  }
}
