import asyncHandler from '../middleware/asyncHandler.js';
import Utilizador from '../models/utilizadorModel.js'
import jwt from 'jsonwebtoken'

// @desc    Autenticar utilizador e ter token
// @route   GET /api/utilizadores/login
// @access  Public
const authUtilizador = asyncHandler(async(req, res) => {
	const {email, password} = req.body;
	const utilizador = await Utilizador.findOne({email});
	if(utilizador && (await utilizador.matchPassword(password))){
		const token = jwt.sign({utilizadorId: utilizador._id}, process.env.JWT_SECRET, {
			expiresIn: '30d',
		})

		// Meter jwt como http-only cookie
		res.cookie('jwt', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 30*24*60*60*1000 // 30 dias
		})
		res.json({
			_id: utilizador._id,
			nome: utilizador.nome,
			email: utilizador.email,
			isAdmin: utilizador.isAdmin
		})
	} else {
		res.status(404)
		throw new Error('Email ou pass errada')
	}
	res.send('auth utilizador')
})

// @desc    Registar utilizador
// @route   POST /api/utilizadores
// @access  Public
const registarUtilizador = asyncHandler(async(req, res) => {
	res.send('registar utilizador')
})

// @desc    Desautenticar utilizador / Limpar Cookie
// @route   POST /api/utilizadores/logout
// @access  Private
const logoutUtilizador = asyncHandler(async(req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0)
	})
	res.status(200).json({message: 'Logged out successfully'})
})

// @desc    Perfil do utilizador
// @route   GET /api/utilizadores/perfil
// @access  Public
const getUtilizadorPerfil = asyncHandler(async(req, res) => {
	res.send('get utilizador perfil')
})

// @desc    Atualizar perfil do utilizador
// @route   PUT /api/utilizadores/perfil
// @access  Private
const atualizarUtilizadorPerfil = asyncHandler(async(req, res) => {
	res.send('update utilizador perfil')
})

// @desc    Ter utilizadores
// @route   GET /api/utilizadores
// @access  Private/Admin
const getUtilizadores = asyncHandler(async(req, res) => {
	res.send('get utilizadores')
})

// @desc    Ter utilizadores atraves do ID
// @route   GET /api/utilizadores/:id
// @access  Private/Admin
const getUtilizador = asyncHandler(async(req, res) => {
	res.send('get utilizador')
})

// @desc    Atualizar utilizadores
// @route   PUT /api/utilizadores/:id
// @access  Private/Admin
const atualizarUtilizador = asyncHandler(async(req, res) => {
	res.send('atualizar utilizador')
})

// @desc    Apagar utilizadores
// @route   DELETE /api/utilizadores/:id
// @access  Private/Admin
const deleteUtilizador = asyncHandler(async(req, res) => {
	res.send('delete utilizador')
})

export {
	authUtilizador, registarUtilizador, logoutUtilizador, getUtilizadorPerfil, atualizarUtilizadorPerfil, getUtilizadores, getUtilizador, atualizarUtilizador, deleteUtilizador
}

