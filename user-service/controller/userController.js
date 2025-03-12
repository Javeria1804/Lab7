let users = [];

exports.registerUser = (req, res) => {
    const { userId, name, email } = req.body;
    const newUser = { userId, name, email, maxBookings: 3, activeBookings: 0 };
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.getUser = (req, res) => {
    const user = users.find(u => u.userId === req.params.userId);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
};

exports.updateUser = (req, res) => {
    const user = users.find(u => u.userId === req.params.userId);
    if (!user) return res.status(404).send('User not found');
    
    user.activeBookings = req.body.activeBookings;
    res.json(user);
};
