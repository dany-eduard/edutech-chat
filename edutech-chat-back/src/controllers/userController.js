import { createUser } from '../services/userService.js'
import Joi from 'joi'

const registerSchema = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  typeId: Joi.number().required()
})

const responseSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  userName: Joi.string().required()
})

async function register(req, res) {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false })
    if (error) {
      const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })
      const errorMessages = error.details.map((e) => e.message)
      return res
        .status(400)
        .json({ message: 'validation error', details: formatter.format(errorMessages) })
    }

    const { user: userName, password, name, lastname, typeId } = req.body
    let user = await createUser({ userName, password, name, lastname, typeId })
    const { value } = responseSchema.validate(user.toJSON(), { stripUnknown: true })

    return res.status(201).json({ message: 'Now you can login', data: value })
  } catch (error) {
    console.error(error)
    if (error.name === 'SequelizeUniqueConstraintError') {
      const fieldName = error.errors[0].path
      const fieldValue = error.errors[0].value
      return res.status(400).json({
        message: `A record with the value '${fieldValue}' already exists in the field '${fieldName}'.`
      })
    }
    return res.status(500).json({ message: 'A server error occurred while registering the user' })
  }
}

export { register }
