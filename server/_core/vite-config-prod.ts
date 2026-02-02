// Minimal vite config for production - doesn't require vite package
export const viteConfigProd = {
  resolve: {
    alias: {
      "@": "/src",
      "@shared": "/shared",
      "@assets": "/attached_assets",
    },
  },
};
