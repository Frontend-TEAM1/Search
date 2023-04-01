import styled from 'styled-components';

const ResultSection = ({
	onRemoveHistory,
	onPreviewClick,
	recent,
	setIsResultShow,
	renderResult,
	focusIdx,
	scrollRef,
}) => {
	return (
		<>
			<SearchResult>
				<RecentWrapper>
					<RecentTitle>최근 검색어</RecentTitle>
					{recent &&
						recent.map((search, index) => (
							<RecentItem key={Math.random()}>
								{search}
								<button onClick={() => onRemoveHistory(search)}>X</button>
							</RecentItem>
						))}
				</RecentWrapper>
				<HistoryWrapper ref={scrollRef}>
					{renderResult() &&
						renderResult().map(
							(word, idx) =>
								word && (
									<WordContainer
										style={{
											backgroundColor: focusIdx === idx ? 'gray' : 'white',
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
			<SearchResultWrapper onClick={() => setIsResultShow(false)} />
		</>
	);
};

export default ResultSection;

const SearchResultWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	background-color: transparent;
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
	z-index: 100;
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
