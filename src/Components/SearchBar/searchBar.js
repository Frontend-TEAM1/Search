import { FromDB } from 'Apis/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SearchBar = () => {
	const [searchKey, setSearchKey] = useState('');
	const [recentSearches, setRecentSearches] = useState([]);

	useEffect(() => {
		const recentSearches =
			JSON.parse(localStorage.getItem('recentSearches')) || [];
		setRecentSearches(recentSearches);
	}, []);

	const onInputChange = e => {
		setSearchKey(e.target.value);
		console.log(searchKey);
	};

	const onSearchClick = async () => {
		if (!searchKey) {
			alert('검색어를 입력해주세요.');
			return;
		}

		const result = await FromDB(searchKey);
		if (result.length === 0) {
			alert('검색 결과가 없습니다.');
			return;
		}

		const recentSearches =
			JSON.parse(localStorage.getItem('recentSearches')) || [];
		if (!recentSearches.includes(searchKey)) {
			//같은거를 입력하면  과거의 같은 단어를 지우고 새로 입력한 같은 단어를 최상단에
		}
		localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		console.log(localStorage);
		setSearchKey(result);
	};

	const temp = () => {
		localStorage.removeItem('recentSearches');
	};

	/* debounce
	const [keyword, setKeyword] = useState('');
				const [timer, setTimer] = useState(0);

	const updateKeyword = e => {
		e.preventDefault();
		setKeyword(e.target.value);
		if (timer) {
			console.log('timer작동');
			clearTimeout(timer);
		}
		const newTimer = setTimeout(async () => {
			try {
				await Getting.getData(keyword).then(res => setResult(res.data));
				console.log('디바운스');
			} catch (err) {
				console.error(err);
			}
		}, 500);
		setTimer(newTimer);
	};
	
	*/
	return (
		<>
			<button onClick={temp}>캐시 날리기</button>
			<SearchBarWrapper>
				<InputContainer>
					<Input
						type="text"
						placeholder="Google 검색"
						onChange={onInputChange}
					/>
					<Button
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/1890px-Vector_search_icon.svg.png"
						alt="Google"
						onClick={onSearchClick}
					/>
					<SearchResult />
				</InputContainer>
				{/* {recentSearches.length > 0 && (
				<RecentSearches>
					<RecentSearchesTitle>최근 검색어</RecentSearchesTitle>
					<RecentSearchesList>
						{recentSearches.map((search, index) => (
							<RecentSearchItem
								key={index}
								onClick={() => setSearchKey(search)}
							>
								{search}
							</RecentSearchItem>
						))}
					</RecentSearchesList>
				</RecentSearches>
			)} */}
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

const Button = styled.img`
	height: 24px;
	margin-right: 16px;
`;
const InputContainer = styled.div`
	position: relative;
`;
const Input = styled.input`
	width: auto;
	min-width: 584px;
	height: 45px;
	display: flex;
	position: absolute;
	//focus 되었을 때, border 없애기
	border: 1px solid darkgray;
	border-radius: 24px;
	box-shadow: none;
`;

const SearchResult = styled.div`
	position: absolute;
	width: auto;
	min-width: 584px;
	height: 500px;
	border: 1px solid darkgrey;
	border-radius: 24px;
	box-shadow: none;
`;

// const RecentSearches = styled.div`
// 	margin-top: 10px;
// `;

// const RecentSearchesTitle = styled.div`
// 	font-size: 14px;
// 	font-weight: bold;
// 	margin-bottom: 5px;
// `;

// const RecentSearchesList = styled.ul`
// 	padding-left: 0;
// 	margin-bottom: 0;
// 	list-style: none;
// `;

// const RecentSearchItem = styled.li`
// 	cursor: pointer;
// 	font-size: 14px;
// 	margin-bottom: 5px;
// 	color: #aaa;

// 	&:hover {
// 		text-decoration: underline;
// 	}
// `;
