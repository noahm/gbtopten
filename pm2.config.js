module.exports = {
  apps : [{
    name        : "gbtopten",
    script      : "./index.js",
    watch       : true,
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
