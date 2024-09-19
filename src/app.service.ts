import { InfisicalClient } from '@infisical/sdk';
import { Inject, Injectable } from '@nestjs/common';
import { generateInfisicalClient } from './infisical/infisical-config';

@Injectable()
export class AppService {
  constructor() {}

  async getSecretValue(): Promise<string> {
    return process.env.CITY;
  }

  async createSecretValue(secret: {
    key: string;
    value: string;
  }): Promise<string> {
    const client = await generateInfisicalClient();
    await client.createSecret({
      projectId: 'b39ea1cc-fe55-4bab-80af-12b7d8cddfbb',
      environment: 'dev',
      secretName: secret.key,
      secretValue: secret.value,
    });
    process.env[secret.key] = secret.value;
    return process.env[secret.key];
  }
}
