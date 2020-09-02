module.exports = (req, res) => {

    //TODO: domain handle

    const ip = req.query.ip;
    if (!ip) {
        res.status(400);
        res.json({
            error: 'Please provide an ip'
        });
    }

    return fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.IP_API_KEY}&ipAddress=${ip}`)
        .then(res => res.json());
}