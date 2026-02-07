import express from 'express'

const app = express()
app.use(express.static('./dist/html'))
app.listen(3000, () => {
  console.log('listening')
})
