import path from 'path'
import { Router } from 'express'
import { readdir, stat } from 'fs/promises'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PATH_ROUTER = `${__dirname}`
const router = Router()

const cleanFileName = (fileName) => fileName.split('.').shift()

;(async () => {
  const apiVersionsPaths = await readdir(PATH_ROUTER)

  for (const apiVersion of apiVersionsPaths) {
    const path = await stat(`${PATH_ROUTER}/${apiVersion}`)
    if (!path.isDirectory()) continue

    const routeFileNames = await readdir(`${PATH_ROUTER}/${apiVersion}`)
    routeFileNames.forEach((routeFileName) => {
      const endpoint = cleanFileName(routeFileName)
      import(`./${apiVersion}/${endpoint}.js`).then((moduleRouter) =>
        router.use(`/${apiVersion}/${endpoint}`, moduleRouter.router)
      )
    })
  }
})()

export { router }
