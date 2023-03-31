import { FromDB } from 'Apis/core';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

const SearchBar = () => {
	//다크모드
	const ThemeMode = useTheme();
	const CurrentMode = ThemeMode[0] === 'light' ? '🌝' : '🌚';

	//검색어관련
	const [searchKey, setSearchKey] = useState('');
	const [result, setResult] = useState('');
	const [recent, setRecent] = useState(
		JSON.parse(window.localStorage.getItem('recentSearches')) || [],
	);

	const [timer, setTimer] = useState(0);
	const [isResultShow, setIsResultShow] = useState(false);
	const [focusIdx, setFocusIdx] = useState(-1);

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

	const onSearchClick = () => {
		if (!searchKey) return setResult([]);
		let newRecent = JSON.parse(JSON.stringify(recent));
		// newRecent = [searchKey, ...newRecent];
		//setRecent([searchKey, ...recent]); //의미없음 가장 마지막에 실행되기떄문에
		setSearchKey('');
		console.log('newRecent', newRecent);

		const index = newRecent.findIndex(item => item === searchKey);
		// 없으면 index = -1

		if (index > 0) {
			newRecent.splice(index, 1);
			newRecent.unshift(searchKey);
		} else if (index === 0) {
			return;
		} else {
			newRecent.unshift(searchKey);
		}

		if (newRecent.length > 4) {
			setRecent(newRecent.slice(0, 5));
		} else {
			setRecent(newRecent);
		}
		setResult([]);
		setFocusIdx(-1);
	};

	const onRemove = () => {
		localStorage.removeItem('recentSearches');
	};

	// const onRemove = () => {
	// 	localStorage.removeItem('recentSearches');
	// };

	const onEnterPress = e => {
		if (e.key == 'Enter') onSearchClick();
	};

	const onPreviewClick = e => {
		const targetText = e.target.parentNode.textContent;
		const idx = result.findIndex(item => item === targetText);
		setSearchKey(result[idx]);
	};

	const renderResult = () => {
		if (result && searchKey !== '') {
			//searchKey 값관련 로직추가(container > onBlur도 참고)
			return result.map(item => {
				const index = item.indexOf(searchKey);
				if (index >= 0) {
					const preWord = item.substring(0, index);
					const matchWord = item.substring(index, index + searchKey.length);
					const postWord = item.substring(index + searchKey.length);
					return { preWord, matchWord, postWord };
				}
			});
		} else {
			return null;
		}
	};

	const changeIdxNum = e => {
		const recLength = renderResult()?.length || 0;
		const maxList = 100;

		console.log('changeIdxNum', focusIdx, recLength);
		console.log('e.key>>>>>>', e.key);

		if (e.key === 'ArrowDown') {
			recLength > 0 && recLength < maxList
				? setFocusIdx(prev => (prev + 1) % recLength)
				: setFocusIdx(prev => (prev + 1) % maxList);
		}
		if (e.key === 'ArrowUp') {
			recLength > 0 && recLength < maxList
				? setFocusIdx(prev => (prev - 1 + recLength) % recLength)
				: setFocusIdx(prev => (prev - 1 + maxList) % maxList);
		}
		if (e.key === 'Escape') {
			setFocusIdx(-1);
			setIsResultShow(false);
		}
		if (e.key === 'Enter') {
			recLength > 0 && focusIdx >= 0 && setSearchKey(result[focusIdx]);
		}
	};

	return (
		<>
			<button onClick={onRemove}>캐시 날리기</button>
			<Wrapper>
				<Container
					onBlur={e => {
						console.log('onBlur>>>>>', e);
						setIsResultShow(false);
					}}
				>
					<Input
						type="text"
						placeholder="검색어를 입력해주세요"
						onChange={e => {
							setSearchKey(e.target.value);
						}}
						onKeyDown={e => {
							onEnterPress(e);
							changeIdxNum(e);
						}}
						value={searchKey}
						onFocus={() => setIsResultShow(true)}
					/>
					<SearchButton onClick={onSearchClick}>Search</SearchButton>

					{isResultShow && (
						<SearchResult>
							<RecentWrapper>
								<RecentTitle>최근 검색어</RecentTitle>
								{recent &&
									recent.map((search, index) => (
										<RecentItem key={Math.random()}>
											{search}
											<button>X</button>
										</RecentItem>
									))}
							</RecentWrapper>
							<HistoryWrapper>
								{renderResult() &&
									renderResult().map(
										(word, idx) =>
											word && (
												<WordContainer
													style={{
														backgroundColor:
															focusIdx === idx ? 'gray' : 'white',
													}}
													onMouseDown={e => {
														e.stopPropagation();
														onPreviewClick(e);
													}}
												>
													<PreWord>{word.preWord}</PreWord>
													<MatchWord>{word.matchWord}</MatchWord>
													<PostWord>{word.postWord}</PostWord>
												</WordContainer>
											),
									)}
							</HistoryWrapper>
						</SearchResult>
					)}
				</Container>
			</Wrapper>
			{/* <span>{CurrentMode}</span> */}
		</>
	);
};

export default SearchBar;

const Wrapper = styled.div`
	width: 100%;
`;
const Container = styled.div`
	width: 100%;
	top: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
`;
const SearchButton = styled.button`
	width: 70px;
	transform: translate(370%, 0%);
	position: absolute;
	cursor: pointer;
	border: none;
	background: none;
	:hover {
		font-weight: bold;
	}
	z-index: 999;
`;
const Input = styled.input`
	width: auto;
	min-width: 584px;
	height: 45px;
	display: flex;
	position: absolute;
	border: 2px solid darkgray;
	border-radius: 24px;
	box-shadow: none;
	padding-left: 20px;
	z-index: 999;
	:focus {
		border: none;
		outline: none;
	}
`;

const SearchResult = styled.div`
	width: auto;
	min-width: 570px;
	min-height: 150px;
	max-height: 500px;
	top: -25px;
	border: 1px solid darkgrey;
	border-radius: 24px;
	position: absolute;
	box-shadow: none;
	padding: 60px 20px;
`;

const RecentWrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.05);
	display: flex;
	align-items: center;
	border-radius: 10px;
	height: 40px;
	padding-left: 20px;
`;

const RecentTitle = styled.div`
	font-size: 15px;
	font-weight: bold;
	margin-right: 10px;
`;

const RecentItem = styled.span`
	padding: 5px 5px;
	margin: 10px;
	background-color: lightgrey;
	border-radius: 20px;

	> button {
		background: none;
		border: none;
		cursor: pointer;
	}
`;

const HistoryWrapper = styled.div`
	width: 100%;
	max-height: 350px;
	margin-top: 20px;
	overflow: auto;
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		height: 20%;
		background: #217af4;
		border-radius: 10px;
	}
`;

const WordContainer = styled.div`
	width: 50%;
	padding-top: 15px;
	margin-left: 5px;
	display: flex;
	cursor: pointer;
	:hover {
		color: #217af4;
		font-weight: bold;
	}
`;
const PreWord = styled.div`
	height: 5%;
	padding-top: 5%;
`;
const MatchWord = styled.div`
	font-weight: bold;
	padding-top: 5%;
`;
const PostWord = styled.div`
	padding-top: 5%;
`;
