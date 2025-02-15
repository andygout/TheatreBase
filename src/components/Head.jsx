const Head = props => {

	const { documentTitle } = props;

	return (
		<head>
			<title>{`${documentTitle} | Dramatis`}</title>
			<link rel="stylesheet" href="/main.css" />
			<script src="/main.js" />
		</head>
	);

};

export default Head;
