const login = async (req, res) => {
    res.send('login!!');
};

const logout = async (req, res) => {
    res.send('logout!!');
};

const isauth = async (req, res, next) => {
    res.send('logout!!');
};

module.exports = {
    login,
    logout
};
