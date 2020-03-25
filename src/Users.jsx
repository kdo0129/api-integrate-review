import React, { useState } from 'react';
import User from './User';
import { useUsersState, useUsersDispatch, getUsers } from './UserContext';

const Users = () => {
	const [userId, setUserId] = useState(null);
	const state = useUsersState();
	const dispatch = useUsersDispatch();

	const { data: users, loading, error } = state.users;

	const fetchData = () => {
		getUsers(dispatch);
	};

	if (loading) return <div>로딩중</div>;
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

			<button onClick={fetchData}>
				{users ? '다시 불러오기' : '데이터 불러오기'}
			</button>
			{userId && <User id={userId} />}
		</>
	);
};

export default Users;
