module.exports = {
  apps : [{
    name        : "gbtopten",
    script      : "./index.js",
    watch       : false,
    env_production : {
       "NODE_ENV": "production"
    }
  }]
}
