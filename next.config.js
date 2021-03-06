// const withPWA = require("next-pwa");
// module.exports = withPWA({
//   env: {
//     GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
//     // CLOUDINARY_URL: process.env.CLOUDINARY_URL,
//     // CONTACT_SLACK_WEBHOOK_URL: process.env.CONTACT_SLACK_WEBHOOK_URL,
//     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
//   },
// rewrites: async () => {
//   return [{ source: "/", destination: "/root" }];
// },
//   pwa: {
//     dest: "/public/pwa/sw",
//   },
//   pageExtensions: ["page.tsx", "page.ts"],
// });

// TODO: ServiceWorkerのエラー解決できるまでPWAは無効化
module.exports = {
  env: {
    GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
    // CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    // CONTACT_SLACK_WEBHOOK_URL: process.env.CONTACT_SLACK_WEBHOOK_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  rewrites: async () => {
    return [{ source: "/", destination: "/root" }];
  },
  pageExtensions: ["page.tsx", "page.ts"],

  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true,
    };
    config.output.webassemblyModuleFilename =
      (isServer ? "../" : "") + "static/wasm/webassembly.wasm";
    return config;
  },
};
