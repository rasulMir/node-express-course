
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const { router: productsRouter } = require('./routes/products')
const connectDB = require('./db/connect')

// middlewares import
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


const port = process.env.PORT || 3000

app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">link to products</a><a href="/api/v1/products/static">link to products</a>')
})

// middlewares
app.use('/api/v1/products', productsRouter)
app.use(express.json())
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const startApp = async () => {
	try {

		await connectDB(process.env.MONGO_URI)

		app.listen(port, () => console.log('Server is Runing ' + port + '...'))
	} catch (error) {
		console.log(err)
	}
}

startApp()