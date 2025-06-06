import { join, dirname } from "path";
import type { StorybookConfig } from "@storybook/nextjs";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../app/**/*.mdx", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-essentials")],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  staticDirs: ["../public"],
};

export default config;
