import React, { useEffect } from 'react';

const CreateApp = ({ setDisabled }) => {
	useEffect(() => {
		setDisabled(false);
	}, []);

	return <div>CreateApp</div>;
};

export default CreateApp;
