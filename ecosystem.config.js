module.exports = {
  apps: [
    {
      name: 'zelfontspanners',
      script: '.next/standalone/server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www/vhosts/zelfontspanners.nl/nodejs',
      env: {
        NODE_ENV: 'production',
        PORT: 3001, // Gebruik een andere poort dan bytesbooster (3000)
      },
      error_file: '/var/www/vhosts/zelfontspanners.nl/logs/pm2-error.log',
      out_file: '/var/www/vhosts/zelfontspanners.nl/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
    },
  ],
}
