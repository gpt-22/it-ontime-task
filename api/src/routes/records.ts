const router = require('express-promise-router')()

const { recordController } = require('../controllers')

router.route('/').get(recordController.getAll)
router.route('/:id').get(recordController.get)
router.route('/').post(recordController.create)
router.route('/:id').put(recordController.update)
router.route('/:id').delete(recordController.delete)

module.exports = router
