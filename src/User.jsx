import React, { useEffect } from 'react';
import { useUsersState, useUsersDispatch, getUser } from './UserContext';

const User = ({ id }) => {
	const state = useUsersState();
	const dispatch = useUsersDispatch();

	useEffect(() => {
		getUser(dispatch, id);
	}, [dispatch, id]);

	const { loading, data: user, error } = state.user;

	if (loading) return <div>로딩 중...</div>;
	if (error) return <div>에러 발생</div>;
	if (!user) return null;
	return (
		<>
			<h2>{user.username}</h2>
			<p>
				<b>Email:</b> {user.email}
			</p>
		</>
	);
};

export default User;
