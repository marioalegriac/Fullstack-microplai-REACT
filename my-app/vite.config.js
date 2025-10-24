
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  
  },
test: {
globals: true,
reporters:[
"default",
["json", { outputFile: "./reports/resultados.json"}]
],
environment: 'jsdom',
include: ['__test__/**/*.test.{js,jsx,ts,tsx}'],
setupFiles: '__test__/setupTests.js',
},
})
