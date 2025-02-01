import Joi from 'joi'

const schema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(40)
    .required()
    .pattern(new RegExp('^[\\u0600-\\u06FF]+( [\\u0600-\\u06FF]+)*$'))   
    .trim()
    .messages({
      'string.empty' : 'نام و نام خونوادگی نمیتواند خالی باشد',
      'string.min' : 'نام و نام خوادگی حداقل تعداد کاراکتر 5 میباشد',
      'string.max' : 'نام و نام خوانوادگی حداکثر تعداد کاراکتر 40 میباشد',
      'any.required' : 'تمام فیلد ها الزامی هستند',
      'string.pattern.base' : 'نام و نام خونوادگی فقط میتواند حروف فارسی باشد و از ایجاد فاصله‌های اضافی خودداری کنید',
    }),

  username: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]+$'))
    .trim()
    .messages({
      'string.min': 'نام کاربری باید حداقل 8 کاراکتر باشد',
      'string.max': 'نام کاربری نباید بیشتر از 30 کاراکتر باشد',
      'string.pattern.base': 'نام کاربری باید شامل حداقل یک حرف بزرگ، یک حرف کوچک اینگلیسی, یک عدد و بدون فاصله باشد',
      'any.required': 'تمامی فیلد ها الزامی هستند',
      'string.empty': 'نام کاربری نمیتواند خالی باشد'
    }),

  email: Joi.string()
    .min(12)
    .max(100)
    .trim()
    .required()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds:{allow : ['com','ir','net']},
      multiple: false,
    })
    .messages({
      'any.required' : 'تمامی فیلد ها الزامی هستند',
      'string.empty' : 'ایمیل نمیتواند خالی باشد',
      'string.min' : 'ایمیل نامعتبر است',
      'string.max' : 'ایمیل نامعتبر است',
      'string.email' : 'ایمیل نامعتبر است',
      }),

  password: Joi.string()
    .min(10)
    .max(255)
    .required()
    .trim()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)([A-Za-z\\d!@#$%^&*.]*)$'))
    .messages({
      'any.required' : 'تمامی فیلد ها الزامی هستند',
      'string.empty' : 'رمز عبور نمیتواند خالی باشد',
      'string.min' : 'رمز عبور نباید کمتر از 10 کاراکتر باشد',
      'string.max' : 'رمز عبور نباید بیشتر از 255 کاراکتر باشد',
      'string.pattern.base' : 'رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و بدون فاصله باشد.',
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.required' : 'تمامی فیلد ها الزامی هستند',
      'any.only' : 'تایید رمز عبور با رمز عبور مطابقت ندارد',
      'string.empty' : 'تاییید رمز عبور نمیتواند خالی باشد',
    })
})

export default schema