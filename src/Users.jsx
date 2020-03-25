import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
import User from './User';

const getData = async () => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/users',
	);
	return response.data;
};

const Users = () => {
	const [userId, setUserId] = useState(null);
	const { data: users, error, isLoading, run } = useAsync({
		deferFn: getData,
	});

	if (isLoading) return <div>로딩중</div>;
	if (error) return <div>에러발생</div>;

	return (
		<>
			{users ? (
				<ul>
					{users.map((user) => (
						<li
							key={user.id}
							onClick={() => setUserId(user.id)}
							style={{ cursor: 'pointer' }}
						>
							{user.username} ({user.name})
						</li>
					))}
				</ul>
			) : null}

			<button onClick={run}>
				{users ? '다시 불러오기' : '데이터 불러오기'}
			</button>
			{userId && <User id={userId} />}
		</>
	);
};

export default Users;
