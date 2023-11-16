import React, { memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Item = ({ item }) => {
	const { id, title, body } = item;

	const customTitle = useMemo(() => `${id} - ${title}`, [id, title]);

	const navigate = useNavigate();

	const onClick = useCallback(() => navigate(`/${id}`), [id, navigate]);

	return (
		<div className="item" key={id}>
			<h3 className="item__title">{customTitle}</h3>
			<p className="item__body">{body}</p>
			<button type="button" onClick={onClick}>
				More details
			</button>
		</div>
	);
};

export default memo(Item);
