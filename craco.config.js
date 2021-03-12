// Don't open the browser during development
process.env.BROWSER = "none";
const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  webpack: {
    alias: {
      "@": path.join(path.resolve(__dirname, "./src")),
      components: path.join(path.resolve(__dirname, "./src/components")),
      routes: path.join(path.resolve(__dirname, "./src/routes")),
      utils: path.join(path.resolve(__dirname, "./src/utils")),
    },
    plugins: [new BundleAnalyzerPlugin()],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, "src/theme.less"),
        cssLoaderOptions: {
          modules: {
            getLocalIdent: (context, localIdentName, localName, options) => {
              if (context.resourcePath.includes("node_modules")) {
                return localName;
              }
              return getCSSModuleLocalIdent(
                context,
                localIdentName,
                localName,
                options
              );
            },
          },
        },
      },
    },
  ],
};
