const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: "/admin-panel",
  defaultPath: "/dashboard",
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
};

export default config;

// const env =
//   (process.env,
//   {
//     CANONICAL_URL: url(),
//     BUILD_GRAPHQL_URL: url(),
//     EXTERNAL_GRAPHQL_URL: url(),
//     INTERNAL_GRAPHQL_URL: url(),
//     NODE_ENV: str({
//       choices: ["development", "test", "jesttest", "production"],
//       default: "production",
//     }),
//     PORT: port({ default: 3000 }),
//     SEGMENT_ANALYTICS_SKIP_MINIMIZE: bool({ default: false }),
//     SEGMENT_ANALYTICS_WRITE_KEY: str({ default: "" }),
//     SESSION_MAX_AGE_MS: num({ default: 86400000 }), // 24 hours
//     SESSION_SECRET: str(),
//     STRIPE_PUBLIC_API_KEY: str({ default: "" }),
//     SITEMAP_MAX_AGE: num({ default: 43200 }), // 12 hours
//     IS_BUILDING_NEXTJS: bool({ default: false }),
//   },
//   {
//     dotEnvPath: null,
//     strict: false,
//   });

// const config = {
//   basename: "/",
//   defaultPath: "/dashboard",
//   fontFamily: `'Roboto', sans-serif`,
//   borderRadius: 12,
// };

// module.exports = { env, config };
