const Theatre = require('../../models/theatre');
const handleModelResponse = require('../../lib/handle-model-response');

module.exports = function (req, res, next) {
	const theatre = new Theatre(req.body);

	return theatre.update()
		.then(data => {
			const redirectRoute = `/theatres/${data.theatre.id}`;
			handleModelResponse(req, res, data, redirectRoute);
		})
		.catch(err => next(err));
};
