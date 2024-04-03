import { h } from 'preact'; // eslint-disable-line no-unused-vars

const Header = () => {

	return (
		<header className="header">

			<a href='/' className="header__component header__home-link">Dramatis</a>

			<span className="header__component o-forms-input o-forms-input--text">
				<span id="autocomplete" className="o-autocomplete">
					<input id="autocomplete-input" type="text" placeholder="Search Dramatis…" />
				</span>
			</span>

		</header>
	);

};

export default Header;
