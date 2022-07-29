
const services = require('../services/userServices')
const jwt = require('../middlewares/jwt')



const register = (req, res)=>{
    services.registerUser(req.body)
            .then(user => 
                res.send({user}))
            .catch(err=>{
                logger.error(err)
                let msg = 'Error de Registro'
                res.send({msg})
    })
}

    

const login = (req, res)=>{
    const { username,password } = req.body
    services.authenticate(username,password)
            .then(result =>{
                const access_token =jwt.generateAuthToken('token')
                res.json({ access_token })
            })
            .catch(err=>{
                logger.error(err)
                let msg = 'Error de autenticación'
                res.status(401).json({msg})
            })
}


 


 function successRegisterController(req, res) {
    res.json(req.user)   
}


 function failRegisterController(req, res) {
    res.status(400).json({ err: 'Falló el registro' })
}

 function successLoginController(req, res) {
    res.json({ msg: 'ok' })
}

 function failLoginController(req, res) {
    res.status(401).json({ err: 'fallo el login' })
}


 function logoutController(req, res) {
    if (req.isAuthenticated()) {
        req.logout()
    }
    res.sendStatus(200)
} 


module.exports = {
    register,
    login,
    successRegisterController,
    failRegisterController,
    successLoginController,
    failLoginController,
    logoutController
}

