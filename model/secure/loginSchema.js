import Joi from 'joi'

const schema = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'string.empty' : 'نام کاربری خود را وارد کنید',
      'any.required' : 'نام کاربری خود را وارد کنید',
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'string.empty' : 'رمز عبور خود را وارد کنید',
      'any.required' : 'رمز عبور خود را وارد کنید',
    }),
})

export default schema