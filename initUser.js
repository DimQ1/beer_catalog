const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectionString } = require('./config');

const usersService = require('./dataAccess/usersRepository');

mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true });
(async () => {
    const password = await bcrypt.hash('admin', 8);

    usersService.create({
        login: 'admin',
        password,
        firstName: 'admin',
        lastName: 'User',
        role: 'Admin'

    });
    process.exit();
})();
