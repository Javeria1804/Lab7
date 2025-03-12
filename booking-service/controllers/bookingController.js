const axios = require('axios');

let bookings = [];

const userServiceUrl = 'http://localhost:3000/users';
const carServiceUrl = 'http://localhost:4000/cars';

exports.createBooking = async (req, res) => {
    const { userId, carId, startDate, endDate } = req.body;

    try {
        const userResponse = await axios.get(`${userServiceUrl}/${userId}`);
        const user = userResponse.data;
        if (user.activeBookings >= user.maxBookings) {
            return res.status(400).send('User has reached booking limit');
        }

        const carResponse = await axios.get(`${carServiceUrl}/${carId}`);
        const car = carResponse.data;
        if (!car.isAvailable) {
            return res.status(400).send('Car is not available');
        }

        const bookingId = bookings.length + 1;
        const newBooking = { bookingId, userId, carId, startDate, endDate, status: 'active' };
        bookings.push(newBooking);

        await axios.put(`${userServiceUrl}/${userId}`, { activeBookings: user.activeBookings + 1 });
        await axios.put(`${carServiceUrl}/${carId}`, { isAvailable: false });

        res.status(201).json(newBooking);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getUserBookings = (req, res) => {
    const userBookings = bookings.filter(b => b.userId === req.params.userId);
    res.json(userBookings);
};

exports.cancelBooking = async (req, res) => {
    const booking = bookings.find(b => b.bookingId === parseInt(req.params.bookingId));
    if (!booking) return res.status(404).send('Booking not found');

    const carResponse = await axios.get(`${carServiceUrl}/${booking.carId}`);
    await axios.put(`${carServiceUrl}/${booking.carId}`, { isAvailable: true });

    const userResponse = await axios.get(`${userServiceUrl}/${booking.userId}`);
    await axios.put(`${userServiceUrl}/${booking.userId}`, { activeBookings: userResponse.data.activeBookings - 1 });

    booking.status = 'canceled';
    res.json(booking);
};
