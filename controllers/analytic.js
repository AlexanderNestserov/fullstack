module.exports.overview = (req, res)=> {
    res.status(200).json({
        login: 'from',
    });
}

module.exports.analytic = (req, res)=> {
    res.status(200).json({
        register: true,
    });
}
