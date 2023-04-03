import { FromDB } from 'Apis/core';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import ResultSection from '../ResultSection/resultSection';

// axios가 api 폴더 외에 설정되어있으면 잘못된것임.
// ㄴ api를 부르는 로직이 화면띄우는 곳에 있으면 반드시 분리해야한다.
const SearchBar = () => {
	const [searchKey, setSearchKey] = useState('');
	const [result, setResult] = useState('');
	const [recent, setRecent] = useState(
		JSON.parse(window.localStorage.getItem('recentSearches')) || [],
	);

	// timer > debounce 분리하기 (useDebounce ) 와 같은 hook으로 빼내기 (Hooks 폴더? > 많아지면 분리하기)
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
		// recent 값을 복사할때 =로는 복사x (얕은복사_"배열객체는 깊은복사가 잘 안됨", 깊은복사 공부하기!)
		// 깊은복사를 해주는(2번파싱) deepCopy 함수를 만들어보는것? const deepCopy = (recent ) =>  JSON.parse(JSON.stringify(recent)
		// utils 폴더에 따로 분리해주는것도 좋음 object.js 와 같은?
		// 2중 파싱은 속도가 느려진다!

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
		setResult([]);
		setFocusIdx(-1);
		setSearchKey('');
	};

	// hook 으로 빼기
	const onRemoveHistory = search => {
		let newRecent = JSON.parse(JSON.stringify(recent));
		const index = newRecent.findIndex(item => item === search);
		newRecent.splice(index, 1);
		setRecent(newRecent);
		localStorage.setItem('recentSearches', JSON.stringify(newRecent));
	};

	// hook 으로 빼기

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

		if (e.key === 'ArrowDown') {
			setFocusIdx(prev => prev + 1);
			if (focusIdx > 6) {
				scrollRef.current.scrollTop += 55;
			}
			if (focusIdx === recLength - 1) {
				scrollRef.current.scrollTop = 0;
			}
		}
		if (e.key === 'ArrowUp') {
			recLength > 0 && setFocusIdx(prev => (prev - 1 + recLength) % recLength);
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
			if (result[focusIdx]) {
				setFocusIdx(-1);
				return setSearchKey(result[focusIdx]);
			}
			onSearchClick();
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
