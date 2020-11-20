import { Fragment, h } from 'preact'; // eslint-disable-line no-unused-vars

import { JoinedRoles } from '.';

const AppendedRoles = props => {

	const { roles } = props;

	return (
		<Fragment>

			<Fragment>&nbsp;…&nbsp;</Fragment>

			<JoinedRoles instances={roles} />

		</Fragment>
	);

};

export default AppendedRoles;
