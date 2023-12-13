import React, { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
	AutoSizer,
	InfiniteLoader,
	List as VirtualizedList,
} from 'react-virtualized';
import Item from '../item';
import './index.scss';

const List = () => {
	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam }) =>
			fetch(
				`https://jsonplaceholder.typicode.com/posts/?_page=${pageParam}&_limit=20`
			).then((res) => res.json()),
		initialPageParam: 1,
		getNextPageParam: (lastPage, _pages, lastPageParam) =>
			lastPage.length > 0 ? lastPageParam + 1 : undefined,
	});

	const listData = useMemo(() => {
		return data?.pages?.flat() ?? [];
	}, [data]);

	const isRowLoaded = useCallback(({ index }) => !!listData[index], [listData]);

	const loadMoreRows = useCallback(() => {
		if (!isFetching && hasNextPage) {
			fetchNextPage();
		}
	}, [isFetching, hasNextPage, fetchNextPage]);

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
