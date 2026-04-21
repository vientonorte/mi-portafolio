
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import tailwindcss from '@tailwindcss/vite';
  import path from 'path';

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/fa6311b2bc30bfad079b553c3eaf7a672186c7d7.png': path.resolve(__dirname, './src/assets/fa6311b2bc30bfad079b553c3eaf7a672186c7d7.png'),
        'figma:asset/f88b43537c2b32df75546b730b772752060980c3.png': path.resolve(__dirname, './src/assets/f88b43537c2b32df75546b730b772752060980c3.png'),
        'figma:asset/eead87221b58b55c215867c791503693f5e6382e.png': path.resolve(__dirname, './src/assets/eead87221b58b55c215867c791503693f5e6382e.png'),
        'figma:asset/ed23209432cc1a61f91676018dae815609d8b95e.png': path.resolve(__dirname, './src/assets/ed23209432cc1a61f91676018dae815609d8b95e.png'),
        'figma:asset/ebe0e06c4fc32f665e80315679b4b0dd7b1525f1.png': path.resolve(__dirname, './src/assets/ebe0e06c4fc32f665e80315679b4b0dd7b1525f1.png'),
        'figma:asset/deca6bc1a3a2801577b021b134a72cf71a3c5753.png': path.resolve(__dirname, './src/assets/deca6bc1a3a2801577b021b134a72cf71a3c5753.png'),
        'figma:asset/d875ff7cbc9428b37b29af656c4f765e8cb8b779.png': path.resolve(__dirname, './src/assets/d875ff7cbc9428b37b29af656c4f765e8cb8b779.png'),
        'figma:asset/d7cad0e13be7a40071ccaec70eb93d0304f2b679.png': path.resolve(__dirname, './src/assets/d7cad0e13be7a40071ccaec70eb93d0304f2b679.png'),
        'figma:asset/d7544032e8a1bb7f39d2362b91903b4c94308f07.png': path.resolve(__dirname, './src/assets/d7544032e8a1bb7f39d2362b91903b4c94308f07.png'),
        'figma:asset/d1ab9c8c94b2a7e89d137d276bf558f69f930bbc.png': path.resolve(__dirname, './src/assets/d1ab9c8c94b2a7e89d137d276bf558f69f930bbc.png'),
        'figma:asset/cc2a6336d20bfd98d5c7da3861869d6cebc7e1a2.png': path.resolve(__dirname, './src/assets/cc2a6336d20bfd98d5c7da3861869d6cebc7e1a2.png'),
        'figma:asset/ca7a4a167c789c951e4e08b0ba00177a6fc58634.png': path.resolve(__dirname, './src/assets/ca7a4a167c789c951e4e08b0ba00177a6fc58634.png'),
        'figma:asset/c5ab5a126dbc3ad0e19afa9c12c260710138c58f.png': path.resolve(__dirname, './src/assets/c5ab5a126dbc3ad0e19afa9c12c260710138c58f.png'),
        'figma:asset/b9ae54b6596cfbe173cbffc5d7c905a655a6af7b.png': path.resolve(__dirname, './src/assets/b9ae54b6596cfbe173cbffc5d7c905a655a6af7b.png'),
        'figma:asset/b87e8d13e8b7c413ed8058ac4f94f3c039ee34f2.png': path.resolve(__dirname, './src/assets/b87e8d13e8b7c413ed8058ac4f94f3c039ee34f2.png'),
        'figma:asset/b39a807f5a67223b2c7c2fd9399005166e91a018.png': path.resolve(__dirname, './src/assets/b39a807f5a67223b2c7c2fd9399005166e91a018.png'),
        'figma:asset/a633e31e4ce4652b6a54e3d62bc05ce3b6921232.png': path.resolve(__dirname, './src/assets/a633e31e4ce4652b6a54e3d62bc05ce3b6921232.png'),
        'figma:asset/a31e098be9118630dbd647bf5cfea93582c8f9af.png': path.resolve(__dirname, './src/assets/a31e098be9118630dbd647bf5cfea93582c8f9af.png'),
        'figma:asset/a071203af6e3a2f88489671218e31f4f1b63c06a.png': path.resolve(__dirname, './src/assets/a071203af6e3a2f88489671218e31f4f1b63c06a.png'),
        'figma:asset/9825b5996f08c4355379ad19609c7a6ca48a14b5.png': path.resolve(__dirname, './src/assets/9825b5996f08c4355379ad19609c7a6ca48a14b5.png'),
        'figma:asset/94e64e0789d3cb3779d529afdfca4db701e1ffe5.png': path.resolve(__dirname, './src/assets/94e64e0789d3cb3779d529afdfca4db701e1ffe5.png'),
        'figma:asset/93f752ccf2bf3e160e29c0654ed37065e66cd03a.png': path.resolve(__dirname, './src/assets/93f752ccf2bf3e160e29c0654ed37065e66cd03a.png'),
        'figma:asset/902a4f265e5b0402c9ddd635345b89de4c716626.png': path.resolve(__dirname, './src/assets/902a4f265e5b0402c9ddd635345b89de4c716626.png'),
        'figma:asset/8f110ae182ecb20cb32d266577a4411e4215f9a8.png': path.resolve(__dirname, './src/assets/8f110ae182ecb20cb32d266577a4411e4215f9a8.png'),
        'figma:asset/8b2d0de2ad888eef0501080acb3db66b4d75ba53.png': path.resolve(__dirname, './src/assets/8b2d0de2ad888eef0501080acb3db66b4d75ba53.png'),
        'figma:asset/87f8a6e7a81d96e3e86411d762aae491d3952734.png': path.resolve(__dirname, './src/assets/87f8a6e7a81d96e3e86411d762aae491d3952734.png'),
        'figma:asset/84a772361fb8479f9e7f68a945694e700b7f7321.png': path.resolve(__dirname, './src/assets/84a772361fb8479f9e7f68a945694e700b7f7321.png'),
        'figma:asset/7b93916ad89e7643ed7321043ef8cd80b539c82f.png': path.resolve(__dirname, './src/assets/7b93916ad89e7643ed7321043ef8cd80b539c82f.png'),
        'figma:asset/77b107e97d12e770619a89e345639f0bc08f5202.png': path.resolve(__dirname, './src/assets/77b107e97d12e770619a89e345639f0bc08f5202.png'),
        'figma:asset/70518d704593e324e05fed17928549e0e0e5fbd0.png': path.resolve(__dirname, './src/assets/70518d704593e324e05fed17928549e0e0e5fbd0.png'),
        'figma:asset/4ba4d92eaa293e4c6c9e1d685912cc0f04035e80.png': path.resolve(__dirname, './src/assets/4ba4d92eaa293e4c6c9e1d685912cc0f04035e80.png'),
        'figma:asset/39c89e78c4c839df83404a07c05ea25dc2ac175c.png': path.resolve(__dirname, './src/assets/39c89e78c4c839df83404a07c05ea25dc2ac175c.png'),
        'figma:asset/351998f57aeca5a0721f29366c3e661a468847b6.png': path.resolve(__dirname, './src/assets/351998f57aeca5a0721f29366c3e661a468847b6.png'),
        'figma:asset/2ca85dae07f2e9ebad27cc29f689df7f2ff0cd05.png': path.resolve(__dirname, './src/assets/2ca85dae07f2e9ebad27cc29f689df7f2ff0cd05.png'),
        'figma:asset/2c1df5440eaeb843fa0270932c4093e53058001b.png': path.resolve(__dirname, './src/assets/2c1df5440eaeb843fa0270932c4093e53058001b.png'),
        'figma:asset/2508fc8ab6c5af6bc6d42eccc7d06b1981e851e2.png': path.resolve(__dirname, './src/assets/2508fc8ab6c5af6bc6d42eccc7d06b1981e851e2.png'),
        'figma:asset/0ddc6d387f6fec8fd73c93778e82ff34a1b1e8cd.png': path.resolve(__dirname, './src/assets/0ddc6d387f6fec8fd73c93778e82ff34a1b1e8cd.png'),
        'figma:asset/0a0ed13a8f1836aed4325be4398240085ee9c5be.png': path.resolve(__dirname, './src/assets/0a0ed13a8f1836aed4325be4398240085ee9c5be.png'),
        'figma:asset/07b1a691d848de20260b8010984e7e68fe438bba.png': path.resolve(__dirname, './src/assets/07b1a691d848de20260b8010984e7e68fe438bba.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    base: '/mi-portafolio/',
    build: {
      target: 'esnext',
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (['react', 'react-dom', 'react-router-dom'].some(p => id.includes(`/node_modules/${p}/`))) {
              return 'vendor-react';
            }
            if (['motion'].some(p => id.includes(`/node_modules/${p}/`))) {
              return 'vendor-motion';
            }
            if (['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tooltip', '@radix-ui/react-tabs', '@radix-ui/react-select'].some(p => id.includes(`/node_modules/${p}/`))) {
              return 'vendor-radix';
            }
            if (['lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'].some(p => id.includes(`/node_modules/${p}/`))) {
              return 'vendor-ui';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });