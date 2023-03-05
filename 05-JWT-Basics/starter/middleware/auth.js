
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new CustomAPIError('No Token provided', 401)
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = jwt.verify(token, 'jwt-secret')
		const {id, username} = decoded
		req.user = {id, username}
		next()
	} catch (error) {
		throw new CustomAPIError(error.message, error.status)
	}

}
	
module.exports = authenticationMiddleware