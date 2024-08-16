import jwt from 'jsonwebtoken'

const generateToken = (res, utilizadorId) => {

	const token = jwt.sign({utilizadorId}, process.env.JWT_SECRET, {
				expiresIn: '30d',
			})

			// Meter jwt como http-only cookie
			res.cookie('jwt', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: 30*24*60*60*1000 // 30 dias
			})
}

export default generateToken