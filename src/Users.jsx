import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
	const [users, setUsers] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchUsers = async () => {
		try {
			setError(null);
			setLoading(true);
			setUsers(null);
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users',
			);
			setUsers(response.data);
		} catch (e) {
			setError(e);
		}
		setLoading(false);
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
