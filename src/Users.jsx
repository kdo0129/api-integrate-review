import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import useAsync from './useAsync';

const getData = async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users',
	);
	return response.data;
};

const Users = () => {
	const [state, refetch] = useAsync(getData, []);
	const { loading, data: users, error } = state;

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

			<button onClick={refetch}>
				{users ? '다시 불러오기' : '데이터 불러오기'}
			</button>
		</>
	);
};

export default Users;
