import { RestaurantCategory } from '../../models/models.js'
import { check } from 'express-validator'
import { Op } from 'sequelize'

const checkAlreadyExistCategory = async (value, { req }) => {
  try {
    const restCategory = await RestaurantCategory.findOne({ where: { name: { [Op.like]: value } } })
    if (restCategory !== null) {
      return Promise.reject(new Error(`The category ${value} already exists.`))
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check('name').custom(checkAlreadyExistCategory)
]

export default { create }
