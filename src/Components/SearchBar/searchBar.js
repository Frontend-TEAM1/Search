import { FromDB } from 'Apis/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchBar = () => {
	const [searchKey, setSearchKey] = useState('');
	const [result, setResult] = useState('');
	const [recent, setRecent] = useState(
		JSON.parse(window.localStorage.getItem('recentSearches')) || [],
	);

	const [timer, setTimer] = useState(0);

	useEffect(() => {
		window.localStorage.setItem('recentSearches', JSON.stringify(recent));
	}, [recent]);

	useEffect(() => {
		if (!searchKey) return;
		if (timer) {
			clearTimeout(timer);
		}
		const newTimer = setTimeout(async () => {
			try {
				setResult(await FromDB(searchKey));
			} catch (err) {
				setResult([err.response.data]);
			}
		}, 500);
		setTimer(newTimer);
	}, [searchKey]);

	const onAddItem = () => {
		setRecent([...recent, searchKey]);
		setSearchKey('');
		const index = recent.findIndex(item => item === searchKey);

		if (index >= 0) {
			recent.splice(index, 1);
			recent.unshift(searchKey);
		} else {
			recent.unshift(searchKey);
		}

		if (recent.length > 4) {
			setRecent(recent.slice(0, 5));
		}
	};

	const onRemove = () => {
		localStorage.removeItem('recentSearches');
	};

	return (
		<>
			<button onClick={onRemove}>캐시 날리기</button>
			<SearchBarWrapper>
				<InputContainer>
					<Input
						type="text"
						placeholder="검색어를 입력해주세요"
						onChange={e => setSearchKey(e.target.value)}
						value={searchKey}
					/>
					<Button onClick={onAddItem}>Search</Button>

					<SearchResult>
						<RecentSearches>
							<RecentSearchesTitle>최근 검색어</RecentSearchesTitle>
							<RecentSearchesList>
								{recent &&
									recent.map((search, index) => (
										<Item key={Math.random()}>
											{search}
											<button>X</button>
										</Item>
									))}
							</RecentSearchesList>
						</RecentSearches>
						{result && result.map(item => <div>{item}</div>)}
					</SearchResult>
				</InputContainer>
			</SearchBarWrapper>
		</>
	);
};

export default SearchBar;

const SearchBarWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Button = styled.button`
	width: 70px;
	position: absolute;
	left: 515px;
	top: 14px;
	cursor: pointer;
	border: none;
	background: none;
	:hover {
		font-weight: bold;
	}
	z-index: 999;
`;
const InputContainer = styled.div`
	position: relative;
	right: 25%;
`;
const Input = styled.input`
	width: auto;
	min-width: 584px;
	height: 45px;
	display: flex;
	position: absolute;
	border: 1px solid darkgray;
	border-radius: 24px;
	box-shadow: none;
	padding-left: 20px;
	z-index: 999;
`;

const SearchResult = styled.div`
	position: absolute;
	width: auto;
	min-width: 584px;
	height: 200px;
	border: 1px solid darkgrey;
	border-radius: 24px;
	box-shadow: none;
`;

const RecentSearches = styled.div`
	padding-top: 60px;
	padding-left: 20px;
`;

const RecentSearchesTitle = styled.div`
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 30px;
`;

const RecentSearchesList = styled.ul`
	padding-left: 0;
	margin-bottom: 0;
	list-style: none;
`;

const Item = styled.span`
	padding: 5px 5px;
	margin: 10px 5px;
	background-color: lightgrey;
	border-radius: 20px;

	> button {
		background: none;
		border: none;
		cursor: pointer;
	}
`;
