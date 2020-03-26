module.exports = {
    apps : [
        {
            name: "kick",
            script: "./app.js",
            watch: true,
            autorestart: true,
            env_development: {
                "NODE_ENV": "development",
            },
            env_production : {
                "NODE_ENV": "production"
             }
        }
    ]
}