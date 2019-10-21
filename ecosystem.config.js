module.exports = {
    apps: [{
      name: 'searchBar',
      script: './server/server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-223-162-235.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/tutorial.pem',
        ref: 'origin/master',
        repo: 'git@github.com:Amishon/Search_Cart.git',
        path: '/home/ubuntu/Search_Cart',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }