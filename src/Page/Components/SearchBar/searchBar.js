import { FromDB } from 'Apis/core';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import ResultSection from '../ResultSection/resultSection';

const SearchBar = () => {
	//검색어관련
	const [searchKey, setSearchKey] = useState('');
	const [result, setResult] = useState('');
	const [recent, setRecent] = useState(
		JSON.parse(window.localStorage.getItem('recentSearches')) || [],
	);

	const [timer, setTimer] = useState(0);
	const [isResultShow, setIsResultShow] = useState(false);
	const [focusIdx, setFocusIdx] = useState(-1);

	const scrollRef = useRef(null);

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
				const testData = await FromDB(searchKey);
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
		setSearchKey('');

		const index = newRecent.findIndex(item => item === searchKey);

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
		if (result.length === 1) return setFocusIdx(0);
		setResult([]);
	};

	const onRemoveHistory = search => {
		let newRecent = JSON.parse(JSON.stringify(recent));
		const index = newRecent.findIndex(item => item === search);
		newRecent.splice(index, 1);
		setRecent(newRecent);
		localStorage.setItem('recentSearches', JSON.stringify(newRecent));
	};

	const onPreviewClick = e => {
		const targetText = e.target.parentNode.textContent;
		const idx = result.findIndex(item => item === targetText);
		setSearchKey(result[idx]);
	};

	const renderResult = () => {
		if (result && searchKey !== '') {
			return result.map(item => {
				const index = item.indexOf(searchKey);
				if (index >= 0) {
					const preWord = item.substring(0, index);
					const matchWord = item.substring(index, index + searchKey.length);
					const postWord = item.substring(index + searchKey.length);
					return { preWord, matchWord, postWord };
				}
				return { postWord: item };
			});
		} else {
			return null;
		}
	};

	const changeIdxNum = e => {
		const recLength = renderResult()?.length || 0;
		const maxList = 100;

		if (e.key === 'ArrowDown') {
			recLength > 0 && recLength < maxList
				? setFocusIdx(prev => (prev + 1) % recLength)
				: setFocusIdx(prev => (prev + 1) % maxList);
			if (focusIdx > 6) {
				scrollRef.current.scrollTop += 55;
			}
			if (focusIdx === recLength - 1) {
				scrollRef.current.scrollTop = 0;
			}
		}

		if (e.key === 'ArrowUp') {
			recLength > 0 && recLength < maxList
				? setFocusIdx(prev => (prev - 1 + recLength) % recLength)
				: setFocusIdx(prev => (prev - 1 + maxList) % maxList);
			scrollRef.current.scrollTop -= 40;

			if (focusIdx === 0) {
				scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			}
		}

		if (e.key === 'Escape') {
			setFocusIdx(-1);
			setIsResultShow(false);
			document.activeElement.blur();
		}
		if (e.key === 'Enter') {
			// recLength > 0 && focusIdx >= 0 && setSearchKey(result[focusIdx]);

			if (searchKey !== result[focusIdx]) {
				setSearchKey(result[focusIdx]);
				return setFocusIdx(-1);
			} else onSearchClick();
		}
	};

	return (
		<>
			<Wrapper>
				<Container>
					<Input
						type="text"
						placeholder="검색어를 입력해주세요"
						onChange={e => {
							setSearchKey(e.target.value);
						}}
						onKeyDown={e => {
							changeIdxNum(e);
						}}
						value={searchKey}
						onFocus={() => setIsResultShow(true)}
					/>
					<SearchButton onClick={onSearchClick}>Search</SearchButton>
					{isResultShow && (
						<ResultSection
							onRemoveHistory={onRemoveHistory}
							onPreviewClick={onPreviewClick}
							recent={recent}
							setIsResultShow={setIsResultShow}
							renderResult={renderResult}
							focusIdx={focusIdx}
							scrollRef={scrollRef}
						/>
					)}
				</Container>
			</Wrapper>
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
