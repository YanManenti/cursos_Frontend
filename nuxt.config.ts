// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  ssr: false,
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    app: {
      apiUrl: process.env.AUTH_API,
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes("Composable"),
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
    "@sidebase/nuxt-auth",
    "nuxt-lucide-icons",
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  image: {
    dir: "public",
  },

  build: {
    transpile: ["jsonwebtoken"],
  },

  auth: {
    isEnabled: true,
    globalAppMiddleware: {
      isEnabled: true,
    },
    baseURL: "/api/auth",
    provider: {
      type: "refresh",
      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        getSession: { path: "/user", method: "get" },
        refresh: { path: "/refresh", method: "post" },
      },
      pages: {
        login: "/login",
      },
      token: {
        signInResponseTokenPointer: "/token/accessToken",
        maxAgeInSeconds: 60 * 60 * 24 * 2,
        sameSiteAttribute: "lax",
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/token/refreshToken",
        maxAgeInSeconds: 60 * 60 * 24 * 2,
      },
      session: {
        dataType: {
          id: "string",
          email: "string",
          username: "string",
        },
        dataResponsePointer: "/",
      },
    },
    sessionRefresh: {
      // Whether to refresh the session every time the browser window is refocused.
      enableOnWindowFocus: false,
      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enablePeriodically: 60 * 60 * 24,
    },
  },

  compatibilityDate: "2024-07-15",
});
