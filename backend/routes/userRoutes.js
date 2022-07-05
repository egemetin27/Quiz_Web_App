var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
router.get('/quiz', userController.showQuiz);
router.get('/leadership', userController.leadership);
//router.get('/question', userController.getQuestion);
router.get('/:id', userController.show);


/*
 * POST
 */
router.post('/', userController.create);
router.post('/login', userController.login);
router.post('/quiz', userController.nextQuestion);
router.post('/question', userController.postQuestion);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
