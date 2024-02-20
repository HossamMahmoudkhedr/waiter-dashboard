export const handleUploadChange = (
	e,
	change = false,
	index = null,
	targetActions,
	dispatch
) => {
	const file = e.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (!change) {
				dispatch(targetActions.addImage(e.target.result));
			} else {
				let newSrc = e.target.result;
				dispatch(targetActions.changeImage({ index: index, src: newSrc }));
			}
		};
		reader.readAsDataURL(file);
	}
};

export const handleRemoveImage = (index, targetActions, ref, dispatch) => {
	dispatch(targetActions.removeImage(index));
	ref.current.value = '';
};
