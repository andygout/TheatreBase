import { setAlert, getAlert } from './alert';
import createAlertData from './create-alert-data';
import getPageData from './get-page-data';
import instanceRoute from './instance-route';

export default (req, res, instance, action) => {

	setAlert(req, createAlertData(instance, action));

	if (instance.hasError) {

		if (['create', 'update'].includes(action)) {

			res.render(`${instance.model.toLowerCase()}s/form`, {
				[instance.model.toLowerCase()]: instance,
				page: getPageData(instance, action),
				alert: getAlert(req)
			});

		} else {

			res.redirect(`${instanceRoute(instance)}`);

		}

	} else {

		res.redirect(action !== 'delete' ? `${instanceRoute(instance)}` : '/');

	}

};
