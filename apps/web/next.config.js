import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {};
const withVanillaExtract = createVanillaExtractPlugin();

export default withVanillaExtract(nextConfig);
