export { default } from "next-auth/middleware"

export const config = {
    matcher: ["/dashboard", "/dashboardClient", "/clientAddJobs","/clientJobs","/checkJobs"]
  };