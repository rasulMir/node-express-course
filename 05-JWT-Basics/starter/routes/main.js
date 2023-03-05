const { Router } = require('express')

// const jwt = require('jsonwebtoken')
// const CustomAPIError = require('../errors/custom-error')
const authenticationMiddleware = require('../middleware/auth')

const routeJWT = Router()

routeJWT.route('/login').post(async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		throw new CustomAPIError('Please provide Password or Username', 400)
	}

	const id = new Date().getDate()

	const token = jwt.sign({ id, username }, 'jwt-secret', { expiresIn: '30d' })

	res.status(200).json({ msg: 'user created', token })
})

routeJWT.route('/dashboard').get(authenticationMiddleware, (req, res) => {
	console.log(req.user)

	const luckyNum = Math.floor(Math.random() * 100)
		
	res.status(200).json({
		msg: `hello ${req.user.username}`,
		secret: `here is your lucky ${luckyNum}`
	})
})

module.exports = routeJWT