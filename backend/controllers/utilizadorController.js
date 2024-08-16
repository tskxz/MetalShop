import asyncHandler from '../middleware/asyncHandler.js';
import Utilizador from '../models/utilizadorModel.js'

// @desc    Autenticar utilizador e ter token
// @route   GET /api/utilizadores/login
// @access  Public
const authUtilizador = asyncHandler(async(req, res) => {
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
	res.send('logout utilizador')
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

