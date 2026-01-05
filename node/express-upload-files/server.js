import express from 'express'
import multer from 'multer'
import Busboy from 'busboy'
import fs, { createWriteStream } from 'fs'
import { join } from 'path'

const app = express()

// Создаем папки для файлов
const uploadDirs = ['uploads', 'files', 'stream-files']
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
})

// DiskStorage (файлы сохраняются на диск)
const diskStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  },
})

const uploadToDisk = multer({ storage: diskStorage })

// MemoryStorage (файлы в памяти)
const uploadToMemory = multer({ storage: multer.memoryStorage() })

// Загрузка с сохранением на диск
app.post('/upload-disk', uploadToDisk.single('file'), (req, res) => {
  res.json({
    message: 'Файл сохранен на диск',
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    path: req.file.path,
    mimetype: req.file.mimetype,
  })
})

// Загрузка в память
app.post('/upload-memory', uploadToMemory.single('file'), (req, res) => {
  // ПРОБЛЕМА: весь файл в памяти!
  const filePath = join('files', req.file.originalname)
  fs.writeFileSync(filePath, req.file.buffer) // Опасно для больших файлов!

  res.json({
    message: 'Файл сохранен через буфер (опасно для больших файлов!)',
    filename: req.file.originalname,
    size: req.file.size,
    inMemoryBufferSize: req.file.buffer.length,
  })
})

app.post('/upload-stream', (req, res) => {
  const busboy = Busboy({ headers: req.headers })

  busboy.on('file', (_fieldname, file, info) => {
    const { filename, mimeType } = info

    const uniqueName = `${Date.now()}-${filename}`
    const filePath = join('stream-files', uniqueName)

    const writeStream = createWriteStream(filePath)

    let size = 0

    file.on('data', (chunk) => {
      size += chunk.length
    })

    file.on('error', () => {
      res.status(500).json({ error: 'Ошибка чтения файла' })
    })

    writeStream.on('error', () => {
      res.status(500).json({ error: 'Ошибка записи файла' })
    })

    writeStream.on('finish', () => {
      res.json({
        message: 'Файл загружен через стриминг',
        filename: uniqueName,
        originalName: filename,
        mimetype: mimeType,
        size,
      })
    })

    // 🔑 ключевая строка — настоящий streaming
    file.pipe(writeStream)
  })

  busboy.on('error', () => {
    res.status(500).json({ error: 'Ошибка обработки формы' })
  })

  req.pipe(busboy)
})

// Конфигурация с лимитами
const uploadWithLimits = multer({
  storage: diskStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB максимум
    files: 1, // только 1 файл
  },
  fileFilter: (req, file, cb) => {
    // Фильтр по типу файла
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Недопустимый тип файла'), false)
    }
  },
})

app.post('/upload-secure', uploadWithLimits.single('file'), (req, res) => {
  res.json({
    message: 'Файл загружен с проверками безопасности',
    file: req.file
      ? {
          name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
        }
      : null,
  })
})

// ДЛЯ ТЕСТИРОВАНИЯ

// Статическая раздача загруженных файлов
app.use('/uploads', express.static('uploads'))
app.use('/files', express.static('files'))
app.use('/stream-files', express.static('stream-files'))

// HTML форма для тестирования
app.use(express.static('public'))

// Запуск сервера
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
  console.log('\nДля тестирования используйте:')
  console.log('1. Откройте браузер и перейдите по адресу выше')
  console.log('2. Или используйте curl:')
  console.log('   curl -F "file=@big.txt" http://localhost:3000/upload-disk')
  console.log('   curl -F "file=@big.txt" http://localhost:3000/upload-memory')
  console.log('   curl -F "file=@big.txt" http://localhost:3000/upload-stream')
})

export default app
