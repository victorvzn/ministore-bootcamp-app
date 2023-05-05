import { Router } from "express"
import multer from 'multer'
import * as controller from '../controllers/images.controllers.js'

export const imagesRouter = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // modifico el destino donde se va a almacenar el archivo llamado al callback
    cb(null, '.tmp_images/')
  },
  filename: (req, file, cb) => {
    // modifico el nombre del archivo para que ahora se guarde con su nombre original
    const nombre = `${Date.now()}_${file.originalname}`
    cb(null, nombre)
  }
})

const upload = multer({ storage: storage })

imagesRouter.post(
  '/',
  upload.single('image'),
  controller.subirImagen
)

imagesRouter.get(
  '/:nombre',
  controller.devolverImagen
)

imagesRouter.delete(
  '/:nombre',
  controller.eliminarImagen
)