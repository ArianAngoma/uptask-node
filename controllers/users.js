const formCreateAccount = async (req, res) => {
    res.render('create-account', {
        namePage: 'Crear Cuenta'
    })
}

module.exports = {
    formCreateAccount
}