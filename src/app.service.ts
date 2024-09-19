import { InfisicalClient } from '@infisical/sdk';
import { Inject, Injectable } from '@nestjs/common';
import { generateInfisicalClient } from './config/infisical-config';

@Injectable()
export class AppService {
  constructor() {}

  async getValue(key: string): Promise<string> {
    return process.env[key.toUpperCase()];
  }

  async createValue(req: {
    key: string;
    value: string;
    env?: string;
  }): Promise<string> {
    const client = await generateInfisicalClient();
    if (!req.env) {
      const envList = ['dev', 'staging', 'prod'];
      for (let i = 0; i < 3; i++) {
        await client.createSecret({
          projectId: 'b39ea1cc-fe55-4bab-80af-12b7d8cddfbb',
          environment: envList[i],
          secretName: req.key.toUpperCase(),
          secretValue: req.value,
        });
      }
    } else {
      await client.createSecret({
        projectId: 'b39ea1cc-fe55-4bab-80af-12b7d8cddfbb',
        environment: req.env,
        secretName: req.key.toUpperCase(),
        secretValue: req.value,
      });
    }

    process.env[req.key] = req.value;
    return process.env[req.key];
  }

  async updateValue(req: {
    key: string;
    value: string;
    env?: string;
  }): Promise<string> {
    const client = await generateInfisicalClient();
    if (!req.env) {
      const envList = ['dev', 'staging', 'prod'];
      for (let i = 0; i < 3; i++) {
        await client.updateSecret({
          environment: envList[i],
          projectId: 'b39ea1cc-fe55-4bab-80af-12b7d8cddfbb',
          secretName: req.key.toUpperCase(),
          secretValue: req.value,
        });
      }
    } else {
      await client.updateSecret({
        environment: req.env,
        projectId: 'b39ea1cc-fe55-4bab-80af-12b7d8cddfbb',
        secretName: req.key.toUpperCase(),
        secretValue: req.value,
      });
    }
    process.env[req.key] = req.value;
    return process.env[req.key];
  }
}
