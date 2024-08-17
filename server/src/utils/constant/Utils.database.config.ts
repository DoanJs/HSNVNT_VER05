import { DataSourceOptions } from 'typeorm';

export function SQLServerConfig(
  username: string,
  password: string,
): DataSourceOptions {
  return {
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username,
    password,
    database: 'HSNVNT_VER05',
    synchronize: true,
    logging: true,
    options: {
      encrypt: true,
    },
    extra: {
      trustServerCertificate: true,
    },
  };
}
