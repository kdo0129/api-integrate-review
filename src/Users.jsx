import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOADING':
			return {
				users: null,
				error: null,
				loading: true,
			};
		case 'SUCCESS':
			return {
				users: action.users,
				error: null,
				loading: false,
			};
		case 'ERROR':
			return {
				users: null,
				loading: false,
				error: action.error,
			};
		default:
			return 1;
	}
};

const Users = () => {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		users: null,
		error: null,
	});
	const { loading, users, error } = state;

	const fetchUsers = async () => {
		dispatch({ type: 'LOADING' });
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users',
			);
			dispatch({ type: 'SUCCESS', users: response.data });
		} catch (e) {
			dispatch({ type: 'ERROR', error: e });
		}
	};

	useEffect(() => {}, []);

	if (loading) return <div>로딩중</div>;
	if (error) return <div>에러발생</div>;

	return (
		<>
			{users ? (
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							{user.username} ({user.name})
						</li>
					))}
				</ul>
			) : null}

			<button onClick={fetchUsers}>
				{users ? '다시 불러오기' : '데이터 불러오기'}
			</button>
		</>
	);
};

export default Users;
