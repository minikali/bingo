module.exports = {
  apps: [
    {
      name: 'Bingo Draw App',
      script: 'yarn',
      args: 'start -- -p 3333',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
