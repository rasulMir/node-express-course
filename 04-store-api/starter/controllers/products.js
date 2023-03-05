const Product = require('../models/product')

const getAllProductsStatic = async (req, res, next) => {
	const products = await Product.find({}).limit(4)
	res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields } = req.query
	const queryObj = {}

	if (featured) {
		queryObj.featured = featured === 'true' ? true : false
	}

	if (company) {
		queryObj.company = company
	}

	if (name) {
		queryObj.name = { $regex: name, $options: 'i' }
	}

	let result = Product.find(queryObj)

	if (sort) {
		let sortList = sort.split(',').join(' ')
		result = result.sort(sortList)
	} else {
		result = result.sort('createdAt')
	}

	if (fields) {
		let fieldsList = fields.split(',').join(' ')
		result = result.select(fieldsList)
	}

	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page - 1) * limit

	result = result.skip(skip).limit(limit)
	const products = await result
	res.status(200).json({ success: true, products, nbHits: products.length })
}


module.exports = {
	getAllProducts,
	getAllProductsStatic
}