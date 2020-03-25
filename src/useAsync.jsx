import { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				data: null,
				error: null,
				loading: true,
			};
		case 'SUCCESS':
			return {
				data: action.data,
				error: null,
				loading: false,
			};
		case 'ERROR':
			return {
				data: null,
				loading: false,
				error: action.error,
			};
		default:
			return new Error(`Unhandled action type : ${action.type}`);
	}
};

const useAsync = (callback) => {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: null,
	});

	const fetchData = async () => {
		dispatch({ type: 'LOADING' });
		try {
			const data = await callback();
			dispatch({ type: 'SUCCESS', data: data });
		} catch (e) {
			dispatch({ type: 'ERROR', error: e });
		}
	};

	// useEffect(() => {
	// 	fetchData();
	// 	//eslint-disable-next-line
	// }, deps);

	return [state, fetchData];
};

export default useAsync;
