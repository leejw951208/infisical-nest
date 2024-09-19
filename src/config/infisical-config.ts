import { InfisicalClient } from '@infisical/sdk';

export const loadInfisicalEnviroment = async () => {
  const client = await generateInfisicalClient();

  const secrets = await client.listSecrets({
    environment: 'dev',
    projectId: 'b39ea1cc-fe55-4bab-80af-12b7d8cddfbb',
    includeImports: false,
  });

  secrets.forEach((secret) => {
    process.env[secret.secretKey] = secret.secretValue; // 비밀 이름과 값을 객체에 저장
  });

  return process.env;
};

export const generateInfisicalClient = async () => {
  const client = new InfisicalClient({
    siteUrl: 'http://localhost:80',
    auth: {
      universalAuth: {
        clientId: 'b7b5a3d7-ed60-4fd4-8c10-6f64e096fdfa',
        clientSecret:
          '0d612546dfa76de2b6780e529fdf3f124b784c4c14b60460785d326437d0c528',
      },
    },
  });

  return client;
};
