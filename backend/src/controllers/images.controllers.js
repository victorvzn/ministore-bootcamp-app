import { uploadFile, getUrlFirmed, deleteFile } from '../utils/s3.js'
import fs from 'fs'

export const subirImagen = async (req, res) => {
  const archivo = req.file

  console.log({ file: req.file })
  console.log({ files: req.files })

  const respuesta = await uploadFile(archivo)
  console.log(respuesta)

  // sirve para eliminar archivos de nuestro proyecto
  fs.unlinkSync(archivo.path)

  return res.json({
    message: 'Imagen subida exitosamente',
    content: respuesta.Key
  })
}

export const devolverImagen = async (req, res) => {
  const { nombre } = req.params

  try {
    const url = getUrlFirmed(nombre)

    return res.status(200).json({ content: url })
  } catch (error) {
    return res.status(400).json({ message: 'La imagen no existe' })
  }

}

export const eliminarImagen = async (req, res) => {
  const { nombre } = req.params

  try {
    deleteFile(nombre)

    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ message: 'La imagen no existe' })
  }

}