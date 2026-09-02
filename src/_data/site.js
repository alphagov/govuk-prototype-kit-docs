export default function () {
  return {
    env: {
      // Netlify deploy context
      // Possible values: "dev", "branch-deploy", "deploy-preview", "production"
      CONTEXT: process.env.CONTEXT ?? 'dev'
    }
  }
}
