<div>

# household-account-book

가계부 웹으로 자산관리 쉽게 하기

## About Project

Mar,07, 2025 - ??.??, 2025

해외에 살면서 한국의 원화와 다른 화폐를 사용함에 있어 돈 관리가 제대로 되고 있는것 같지 않아서 가계부를 통해 자산관리를 시작했다.
<br>
하지만, 기존의 가계부 앱, 가계부 장부들을 사용하다보면 불편한 점이 한 두개가 아니어서 내가 새롭게 불편한 점들을 개선한 자체 서비스를 만들기로 했다.

### problems

- 수기작성시 문제

    1. 수기로 가계부 장부에 작성을 하게 되면, 수정, 삭제 등에 번거러움이 존재함.
    2. 수기로 가계부 장부에 작성시 매월 동일한 시간에 작성되어야 할 가계를 직접 까먹지 않고 작성해야하는 문제가 있음.
    3. 같은 표기법(제목, 금액, 수입 및 지출 순서 등)으로 작성을 해야하는데, 바쁘게 살다보면 막 작성하게 됨.
    4. 전체 수입 대비 지출을 한번에 파악하기 어려움.

- 앱 및 장부 공통 문제
    1. 자산관리를 위한 앱이지만 자신의 소비성향이 어떤지, 어떻게 줄여가야 하는지 경제관념이 부족한 사람은 파악하기 어려움.
    2. 일시불, 할부, 렌탈, 리스 등 소비할때에 구매하거나 빌리는 옵션이 있는데, 어떤걸 어느정도로 사용해야 이득인지 한눈에 알아보는 서비스가 존재하지 않음.
    3.

### solving

## About Web-page

### Display components\

- Navigation 객체들의 타입 지정

```tsx
// NavObject 객체 타입 지정
export interface INavObject {
  url: string;
  icon: ReactNode;
  displayName: string;
}

// NavObject 객체들의 모임 타입 지정
export type TNavObjectGroup = Record<string, INavObject>;
```

#### Header컴포넌트(클라이언트 컴포넌트)

1. 모든 페이지에서 정적으로, 변하지 않고 사용됨.<br>
   따라서 합성컴포넌트 혹은 다른 조합은 사용하지 않음
2. 단순한 버튼 클릭시 네비게이팅 용도
3. 검색어 입력시 드롭다운으로 사용자가 입력한 거래 기준으로<br>
   추천 검색어 나열 및 거래내역 간소화 해서 보여주기
4. 반응형 디자인 추가
5. 변수로 경로지정해 유지보수 간편화

#### Sidebar 컴포넌트(클라이언트 컴포넌트)

1. 각 탭(가계부, 게시글, 프로필)에 따라 네비게이션 변화
    1. 상수 객체로 map을 이용해서 출력
    2. 후에 다양한 네비게이션 추가가 쉬움
2. 네비게이션 객체를 타입으로 지정함으로서 유지보수 간편화
    1. NavObject객체의 타입을 interface로 지정
    2. 이러한 NavObject객체의 그룹을 type으로 지정
3. 반응형 디자인 추가
    1. 일정 크기 이하로 화면이 줄면 햄버거 메뉴 추가
    2. 햄버거 메뉴로 사이드바 토글 시 사이드바 제외한 화면 비활성화

#### Authentication/Authorization (홈/로그인/회원가입 페이지)

토큰을 통한 검증 및 어느 도메인이든 접속시 토큰 검증을 통해 <br>
검증 성공하면 `/ledger`로 리다이렉트 <br>
검증 실패시 `'/`로 리다이렉트

JWT : `/src/_utils/jwtUtils.ts`, `middleware.ts`, `/src/app/api/auth/[..nextauth]/route.ts` <br>
Oauth: `/src/app/api/auth/[..nextauth]/route.ts`, `/src/_component/AuthProvider.tsx`, `/src/_utils/oauth.ts`, `/src/app/api/(users)/_repository/oauthUserRepository.ts`<br>
Form: `/src/_utils/dbUserUtils.ts`, `/src/app/api/(users)/_repository/formUserRepository.ts`, `/src/app/api/(users)/_service/userService.ts, emailVerification.ts`,
`/src/app/api/(users)/verify/route.ts`<br>

## Tech Stack

### Language

<!--JS-->
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<!--TS-->
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<!--HTML-->
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>
<!--CSS-->
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>

### Freamwork

<!--next.js-->
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>

### Library

<!--tailwindcss-->
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white"/>
<!--zustand-->
<img src="https://img.shields.io/badge/zustand-157272?style=for-the-badge&logo=&logoColor=white"/>


next auth
oauth
jose

리액트 폼 훅
zod
eslint
prettier

## ER-Diagram

![household-acc.png](db%20relation/household-acc.png)

## API 반환 DTO

## Main Function

## Architecture

</div>
