const express = require('express')
const router = express.Router()
const {HandleSignUp  , HandleCandidateId,HandleCandidateDelete, HandleVotes , HandleCountVotes, HandleCandidateList } = require('../controller/candidate.controller')
const { jwtAuthenticate } = require('../utils/jwtAuth')


router.post('/',jwtAuthenticate,HandleSignUp)

router.put('/:candidateId',jwtAuthenticate,HandleCandidateId)

router.delete('/:candidateId',jwtAuthenticate,HandleCandidateDelete)

router.post('/vote/:candidateId',jwtAuthenticate,HandleVotes)

router.get('/vote/count',HandleCountVotes)

router.get('/list',HandleCandidateList)

module.exports = router