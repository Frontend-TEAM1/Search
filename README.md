# Search

## 📝프로젝트 설명

    본 프로젝트는 json서버 API를 활용한 검색어 조회 웹 서비스입니다.

<br></br>

## 📤배포 주소

<<<<<<< HEAD
<<<<<<< HEAD
<br></br>

### 📁 프로젝트 폴더 구조
<<<<<<< HEAD

=======
📦src
┣ 📂Apis
┃ ┗ 📜core.js
┣ 📂Components
┃ ┣ 📂Logo
┃ ┃ ┗ 📜logo.js
┃ ┗ 📂SearchBar
┃ ┃ ┗ 📜searchBar.js
┣ 📂Context
┃ ┗ 📜themeProvider.js
┣ 📂Styles
┃ ┣ 📜global.js
┃ ┣ 📜theme.js
┃ ┗ 📜themeToggle.js
┣ 📜App.js
┗ 📜index.js
=======

> > > > > > > 11f5324 (Update README.md)
> > > > > > > <br></br>

### 🌳 프로젝트 폴더 구조
=======
>>>>>>> 2e1632e (Update README.md)

> > > > > > > 8251680 (Update README.md)

```

📂src
├─App.js
│
├─index.js
│
├─📂Apis
│  └─core.js
|
├─📂Components
│  └─📂Logo
│        └─logo.js
│
├─📂Context
│          └─themeProvider.js
├─📂Page
│    └─📂Components
│          ├─📂ResultSection
│          |      └─resultSection.js
│          ├─📂SearchBar
│          |      └─searchBar.js
│          └─ index.js
│
|
├─📂Routes
│     └─routing.js
│
└─📂Styles
      ├─global.js
      ├─theme.js
      └─themeToggle.js



```

## 📽실제 구현 화면(이미지)

<br></br>

<<<<<<< HEAD
<<<<<<< HEAD
=======


>>>>>>> 2e1632e (Update README.md)
<br></br>

## 🔍구현 기능

1.  **API 콜 최적화**

- 디바운스를 hook함수로 빼서 사용
  검색엔진 사이트가 아니라면 api요청을 자주할 필요는 없다. (구글의 경우에는 입력할 때 마다 api 요청을하는 반면에, 무신사 같은 사이트는 누를 때 마다 요청하지 않는 것을 확인)
  <br></br>

- 해결방법: 키를 입력하고 약간의 delay(setTimeout)로 입력을 지연, useEffect를활용하여 언마운트시에는 이전 이벤트루프에대해서는 clear를 시켜준다
  => 그러면 내가 설정한 delay시간내에 입력한 값들에대해서는 요청을 하지않고 마지막 입력 값에서 delay시간이 지나면 그때 api요청을 해줄 수 있다.
  => 이렇게하면 불필요한 api요청을 줄일 수 있다!

# <br></br>

## 📁폴더 구조

<br></br>

## 🔍구현 기능

1.  **API 콜 최적화**

<<<<<<< HEAD - 검색 서비스는 사용자가 입력 될 때마다 API 콜을 요청하기 때문에 굉장히 비효율적일 수 있습니다. 물론 검색 서비스가 주가 되는 경우 모든 요청을 받을 수 있습니다. - 이러한 경우 중복된 요청이나 필요없는 요청이 발생될 수 있음으로 이를 최적화 하기 위한 방법이 무엇이 있을지 고민해보고 상의하여 구현해주세요 - 단, 라이브러리는 axios만 사용이 가능하며 axios의 cache 옵션은 사용할 수 없습니다. (react-query와 같은 캐싱 라이브러리 사용불가 ) - react, react-router-dom, styled-componet와 같은 기본적인 라이브러리만 사용이 가능하며 그 외는 axios 외 허용하지 않습니다

        <br></br>

    > > > > > > > 8251680 (Update README.md)

=======

- 디바운스를 hook함수로 빼서 사용
  검색엔진 사이트가 아니라면 api요청을 자주할 필요는 없다. (구글의 경우에는 입력할 때 마다 api 요청을하는 반면에, 무신사 같은 사이트는 누를 때 마다 요청하지 않는 것을 확인)
  <br></br>

- 해결방법: 키를 입력하고 약간의 delay(setTimeout)로 입력을 지연, useEffect를활용하여 언마운트시에는 이전 이벤트루프에대해서는 clear를 시켜준다
  => 그러면 내가 설정한 delay시간내에 입력한 값들에대해서는 요청을 하지않고 마지막 입력 값에서 delay시간이 지나면 그때 api요청을 해줄 수 있다.
  => 이렇게하면 불필요한 api요청을 줄일 수 있다!

<br></br>

> > > > > > > 3e8cfcc (Update README.md)

2.  **최근 검색어 기능 구현하기**

        - 최근 검색어는 최대 5개만 보이게 할 것. 그리고 5개가 넘었을 때 새로운 검색어가 생긴다면 가장 마지막 검색어를 삭제.

                     ex) 박선영, 구현서, 장영승, 김나실, 이주람 —> 이재훈 검색 —> 이재훈, 박선영, 구현서, 장영승, 김나실

        - 최근 검색어에 포함된 검색어를 검색한 경우 중복 추가되는 것이 아닌 첫번째로 이동.

                        ex) 노트북, 가방, 드론, 회, 라디오 -> 회 검색 -> 회, 노트북, 가방, 드론, 라디오

        - 로컬 스토리지를 활용하여 웹 페이지 종료 후에도 검색기록 유지.

    <br></br>

3.  **키보드를 활용한 추천 검색어 및 일반 검색 기능 구현하기**

    - 키보드로 상하 이동 + ENTER로 검색이 가능.
    - 마우스 클릭으로 이벤트에 해당하는 검색어로 검색이 가능.
    - 검색 시 별다른 페이지 이동 없이 최근 검색어가 추가되는 형태로 구현.
      <br></br>

4.  **검색 단어 하이라이트 하기**

    - 검색어가 포함된 부분을 하이라이트로 표시.
    - 검색 결과가 없다면, "검색결과가 없습니다" 라는 백엔드에서 전송한 메시지를 보여주기.
      <br></br>

5.  **CORS 에러에 대하여**

    - CORS는 (Cross-Origin Resouce Sharing) 의 약자로 '교차 출처 리소스 공유'의 뜻을 가지고있다.
      동일한 도메인이 아니라 다른 도메인에 리소스 요청을 할 때, 이를 브라우저에서는 보안상의 이유로 다른 도메인에서 허용하지 않은 요청이라면 제한을 기본적으로 제한을 해준다.
    - 쉽게 생각한다면 구글에서 네이버 사용자API주소로 요청을 할 때, 이를 허용하지 않는다는 것을 의미한다(이게 허용이된다면 매우 큰일난다!)
    - 보편적으로는 이를 백엔드에서 처리해주는데, 예를 들자면 사용자가 ATM기를 사용할 때 마음대로 돈을 빼갈 수 있다면?? 이는 은행창구에서 막도록 설정하는 것이 맞는 것처럼 이 경우에도 백엔드에서 허가를 해준다면? 리소스 요청을 할 수 있게된다.
    - cors라이브러리를 사용하면 되는데, 서버.use(cors())를 해주면 된다.

    - 프론트엔드에서는... 방법이 없진 않고 proxy(매개 서버)를 활용하면 가능하다고 하지만 기본적으로 CORS에러는 프론트에서 겪는에러이지만 백엔드에서 해결을 해주는게맞다.

    - Express 서버를 사용하는 경우는 Express-http-proxy 미들웨어를 통해서 간단하게 proxy server를 구현할 수 있으니, 이를 활용하여 해결할 수도 있다

<br></br>

### 👨‍👩‍👧👪 팀원 소개 및 역할

|                   구현서                    |                 김나실                  |                     박선영                      |                   이재훈                    |                 이주람                  |                       장영승                        |
| :-----------------------------------------: | :-------------------------------------: | :---------------------------------------------: | :-----------------------------------------: | :-------------------------------------: | :-------------------------------------------------: |
| [HyunseoKoo](https://github.com/HyunseoKoo) | [nasilKiM](https://github.com/nasilKiM) | [seonyeong719](https://github.com/seonyeong719) | [JaeHoonKOR](https://github.com/JaeHoonKOR) | [JuramLee](https://github.com/JuramLee) | [YoungSeungJang](https://github.com/YoungSeungJang) |
|                      0                      |                 김나실                  |                        0                        |                   이재훈                    |                 이주람                  |                          0                          |

<br></br>

### 🔧 사용 기술 스텍

<<<<<<< HEAD
| 기술 스택 | 종류 |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| **언어** | <img  width="60" src="https://user-images.githubusercontent.com/112946860/225957694-7e3b3669-9216-4271-a7c8-555c8976368b.png" /><br />Javascript |
| **프론트엔드** | <img width="60" src="https://user-images.githubusercontent.com/112946860/225957071-10a74540-d7b5-457c-821e-91547e62a429.png" /><br />React |
=======
| 기술 스택 | 종류 |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
<<<<<<< HEAD
| **언어** | <img  width="60" src="https://user-images.githubusercontent.com/112946860/225957694-7e3b3669-9216-4271-a7c8-555c8976368b.png" /><br />Javascript |

=======
| **언어**  | <img  width="60" src="https://user-images.githubusercontent.com/112946860/225957694-7e3b3669-9216-4271-a7c8-555c8976368b.png" /><br />Javascript |
>>>>>>> c4787de (Update README.md)
|**프론트엔드** | <img width="60" src="https://user-images.githubusercontent.com/112946860/225957071-10a74540-d7b5-457c-821e-91547e62a429.png" /><br />React|

> > > > > > > 8251680 (Update README.md)

<br></br>

| 사용 라이브러리       | 사용한 부분                      |
| :-------------------- | :------------------------------- |
| **styled-components** | 스타일 컴포넌트 구성 시 사용     |
| **react-router-dom**  | URL에 따라 화면을 렌더링 시 사용 |
| **axios**             | api를 통한 비동기 통신 시 사용   |

<br></br>

### 🤝 협업

| Notion | https://rustic-mollusk-377.notion.site/FrontEnd_Team1-b49bb76c7b0842a7a4964aaff906e0b2 |
| ------ | -------------------------------------------------------------------------------------- |
