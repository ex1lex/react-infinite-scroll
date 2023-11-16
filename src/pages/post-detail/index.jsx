import React, { useCallback, useMemo } from 'react';
import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../core/api';

const PostDetail = () => {
	const { postId } = useParams();
	const { data, isLoading } = useGetPostQuery(postId);

	const navigate = useNavigate();

	const onClick = useCallback(() => navigate('/'), [navigate]);

	const customTitle = useMemo(() => {
		if (data) {
			return `${data.id} - ${data.title}`;
		}
	}, [data]);

	if (isLoading) {
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
