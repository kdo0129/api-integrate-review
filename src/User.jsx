import React from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

const getUser = async ({ id }) => {
	const response = await axios.get(
		`https://jsonplaceholder.typicode.com/users/${id}`,
	);
	return response.data;
};

const User = ({ id }) => {
	const { data: user, error, isLoading } = useAsync({
		promiseFn: getUser,
		id,
		watch: id,
	});

	if (isLoading) return <div>로딩 중...</div>;
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
