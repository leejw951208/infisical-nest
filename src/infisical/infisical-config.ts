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
        clientId: '3e18c6bd-31f2-4bbb-a088-603de1b7db99',
        clientSecret:
          '462bdad732e55e45ba9da8fe12be39d39a8ecb8cbb7b2a1c12f8f57da6a0dab8',
      },
    },
  });

  return client;
};
