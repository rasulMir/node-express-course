require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)

		await Product.create(jsonProducts)

		
		console.log('sucess')
	} catch (error) {
		console.log(error)
	}
}
start()