import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
	AutoSizer,
	InfiniteLoader,
	List as VirtualizedList,
} from 'react-virtualized';
import { useGetPostsQuery } from '../../core/api';
import Item from '../item';
import './index.scss';

const List = () => {
	const [isAllowFetching, setIsAllowFetching] = useState(true);
	const [page, setPage] = useState(1);
	const { currentData, isFetching } = useGetPostsQuery(page, {
		skip: !isAllowFetching,
	});

	const [listData, setListData] = useState([]);

	const isRowLoaded = useCallback(({ index }) => !!listData[index], [listData]);

	const loadMoreRows = useCallback(() => {
		if (!isFetching && isAllowFetching) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isFetching, isAllowFetching]);

	const rowRenderer = useCallback(
		({ key, index, style }) => {
			const item = listData[index];
			if (!item) {
				return null;
			}
			return (
				<li key={key} style={style}>
					<Item item={item} />
				</li>
			);
		},
		[listData]
	);

	const itemCount = useMemo(
		() => (isFetching ? listData.length + 1 : listData.length),
		[listData, isFetching]
	);

	useEffect(() => {
		if (currentData?.length === 0) {
			setIsAllowFetching(false);
			return;
		}
		if (currentData) {
			setListData((prevData) => [...prevData, ...currentData]);
		}
	}, [currentData]);

	return (
		<div className="list">
			<InfiniteLoader
				isRowLoaded={isRowLoaded}
				loadMoreRows={loadMoreRows}
				rowCount={listData.length + 1}
			>
				{({ onRowsRendered, registerChild }) => (
					<AutoSizer>
						{({ width, height }) => (
							<VirtualizedList
								width={width}
								height={height}
								rowCount={itemCount}
								rowHeight={150}
								rowRenderer={rowRenderer}
								onRowsRendered={onRowsRendered}
								ref={registerChild}
							/>
						)}
					</AutoSizer>
				)}
			</InfiniteLoader>
		</div>
	);
};

export default List;
