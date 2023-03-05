
require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const tasks = require('./routes/tasksRoute')
const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/eroor')

const PORT = process.env.PORT || 3000
const MAIN_PATH = process.env.MAIN_PATH || '/api/v1'
const CONNECT_URL = process.env.CONNECT_URL

// middlewares
app.use(express.static('./public/'))
app.use(express.json())

//  routes
app.use(MAIN_PATH, tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const startApp = async () => {
	try {
		await connectDB(CONNECT_URL)
		
		//  listen server
		app.listen(PORT, console.log('Server is runing on port ' + PORT))
	
	} catch (error) {
		console.log(error)
	}
}

startApp()