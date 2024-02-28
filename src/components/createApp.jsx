import React, { useEffect } from 'react';

const CreateApp = ({ setDisabled }) => {
	useEffect(() => {
		setDisabled(false);
	}, [setDisabled]);

	return <div>CreateApp</div>;
};

export default CreateApp;
