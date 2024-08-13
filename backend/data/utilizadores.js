import bcrypt from 'bcryptjs'

const utilizadores = [
    {
        nome:  'Admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        nome:  'Tanjil',
        email: 'tanjilkh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    }
]

export default utilizadores