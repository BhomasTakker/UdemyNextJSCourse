const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "Thomas",
        mongodb_password: "G~4k.mLaY~gKP9e",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-blog-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "Thomas",
      mongodb_password: "G~4k.mLaY~gKP9e",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-blog",
    },
  };
};
