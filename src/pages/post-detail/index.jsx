import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import './index.scss';

const PostDetail = () => {
	const queryClient = useQueryClient();
	const { postId } = useParams();
	const { isFetching, data } = useQuery({
		initialData: queryClient.getQueryData(['post', postId]),
		queryKey: ['post', postId],
		queryFn: ({ queryKey: [_, id] }) =>
			fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
				res.json()
			),
	});

	const navigate = useNavigate();

	const onClick = useCallback(() => navigate('/'), [navigate]);

	const customTitle = useMemo(() => {
		if (data) {
			return `${data.id} - ${data.title}`;
		}
	}, [data]);

	if (isFetching) {
		return <h5>Loading...</h5>;
	}

	if (!data) {
		return <h5>Post not found</h5>;
	}

	return (
		<div className="post-detail">
			<button type="button" onClick={onClick}>
				Back
			</button>
			<div className="post-detail__content">
				<h3 className="post-detail__title">{customTitle}</h3>
				<p className="post-detail__body">{data.body}</p>
			</div>
		</div>
	);
};

export default PostDetail;
