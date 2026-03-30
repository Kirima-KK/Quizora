const serverConfig = {
  environment: process.env.NODE_ENV,
  backendHost: process.env.NEXT_PUBLIC_BACKEND_HOST
  // backendHost: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_BACKEND_HOST : process.env.NEXT_PUBLIC_DEV_BACKEND_HOST,
}

export default serverConfig;