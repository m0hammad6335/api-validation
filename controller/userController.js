import User from '../model/User.js'
import bcrypt from 'bcrypt'
import registerValidation from '../model/secure/registerSchema.js'
import loginValidation from '../model/secure/loginSchema.js'

export const login = async (req , res) => {
  const { username , password } = req.body
  const check = loginValidation.validate(req.body)

  if(check.error){
    res.status(200).json({message: check.error.details[0].message , error: true})
  }else{
    await User.findOne({ username })
    .then(async user => {
      const passwordHash = await bcrypt.compare(password , user.password)

      if(user){
        if(!passwordHash){
          res.status(200).json({message: 'رمز عبور اشتباه است', error: true})
        }else{
          res.status(200).json({message: 'با موفقیت وارد شدید', error: false})
        }
      }else{
        res.status(200).json({message: 'نام کاربری یا رمز عبور اشتباه است', error: true})
      }
    })
    .catch(err => {
      console.log('error database: ', err)
    })
  }
}

export const createUser = async (req , res) => {
  const check = registerValidation.validate(req.body)

  if(check.error){
    res.status(200).json({message: check.error.details[0].message, error: true})
  }else{
    await User.findOne({ $or: [{username: req.body.username} , {email: req.body.email}]})
      .then(async user => {
        if(user){
          if(user.username === req.body.username){
            return res.status(200).json({message: 'نام کاربری قبلا ثبت شده است' , error: true})
          }
          if(user.email === req.body.email){
            return res.status(200).json({message: 'ایمیل قبلا ثبت شده است' , error: true})
          }
        }else{
          const user = await new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password , 10),
          })
      
          await user.save()
            .then(() => {
              res.status(200).json({message: 'ثبت نام با موفقیت انجام شد', error: false})
            })
            .catch((err) => {
              res.status(200).json({message: 'مشکلی در ذخیره اطلاعات در دیتابیس به وجود آمد', error: true})
              console.log('error database: ', err)
            })
        }
      })
  }
}