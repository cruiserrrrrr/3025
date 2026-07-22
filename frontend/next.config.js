const nextConfig = {
    reactStrictMode: false,
    output: "standalone",
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
};

module.exports = nextConfig;
