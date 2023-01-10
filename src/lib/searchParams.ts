// This function is used to update the URLSearchParams
export function updateParams(target: HTMLInputElement, inputParams: URLSearchParams) {
	const { name, value } = target;

	// this function is called when the select element or the checkbox is changed
	// since the select element is a single value, we can just set the value
	// but the checkbox is a multi-value, so we need to add/remove the value
	// we need to consider that if the checkbox is unchecked, we need to remove the value
	// and keep the other values
	// we can use the `URLSearchParams` API to make this easier
	const params = new URLSearchParams(inputParams);
	if (target.type === 'checkbox') {
		if (target.checked) {
			params.append(name, value);
		} else {
			// we need to remove the value from the URL
			// we can't use `params.delete(name)` because it will remove all the values
			// so we need to get all the values, remove the value we want to remove
			// and then add the new values
			const values = params.getAll(name); // get all the values
			params.getAll(name).forEach(() => params.delete(name)); // remove all the values, we will add them back later
			const newValues = values.filter((v) => v !== value); // remove the value we want to remove
			newValues.forEach((v) => params.append(name, v)); // finally, add the new values
		}
	} else {
		params.set(name, value);
	}

	return params;
}
