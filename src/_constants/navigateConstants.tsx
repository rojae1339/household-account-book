import { IoCaretBack, IoCaretForward, IoNewspaperSharp } from 'react-icons/io5';
import { FaMoneyBillWave, FaSignsPost } from 'react-icons/fa6';
import { MdOutlineHistoryEdu, MdOutlineTipsAndUpdates, MdSpaceDashboard } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import { GiArtificialHive, GiBuyCard, GiSaveArrow } from 'react-icons/gi';
import { ReactNode } from 'react';
import { FcGoogle, FcSupport } from 'react-icons/fc';
import { FaFacebook, FaUserGraduate } from 'react-icons/fa';
import { LiaUserEditSolid } from 'react-icons/lia';
import { RiDeleteBin5Fill, RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { BuiltInProviderType } from 'next-auth/providers/index';

//auth dir
export const authMainDir: string = '/';
export const signinDir: string = '/signin';
export const signupDir: string = '/signup';
export const pwFindDir: string = '/pw-find';
export const pwResetDir: string = '/pw-reset';
export const tokenErrorDir: string = '/error';

//main _service dir
export const non_authMainDir: string = '/ledger';
export const transactionHistoryDir: string = non_authMainDir + '/history';
export const transactionDashboardDir: string = non_authMainDir + '/dashboard';
export const expensesPerIncomeDir: string = non_authMainDir + '/EPI';
export const adviceAIDir: string = non_authMainDir + '/advice';
export const buyOrRentDir: string = non_authMainDir + '/BoR';

export const forumDir: string = '/forum';
export const tipForum: string = forumDir + '/tips';
export const thriftyForum: string = forumDir + '/thriftys';
export const newsForum: string = forumDir + '/news';
export const qnaForum: string = forumDir + '/qnas';

export const profileDir: string = '/profile';
export const editProfile: string = profileDir + '/edit';
export const deleteProfile: string = profileDir + '/delete';

// NavObject 객체 타입 지정
export interface INavObject {
    url: string;
    icon: ReactNode | null;
    displayName: string;
    bg_color?: string;
}

// NavObject 객체들의 모임 타입 지정
export type TNavObjectGroup = Record<string, INavObject>;

// 페이지 네비게이션
export const pagesNavObject: TNavObjectGroup = {
    homeDir: {
        url: non_authMainDir,
        icon: null,
        displayName: 'Home',
    },
    forumDir: {
        url: forumDir,
        icon: null,
        displayName: 'Forum',
    },
    profileDir: {
        url: profileDir,
        icon: null,
        displayName: 'Profile' /*<ImProfile/>*/,
    },
};

export const iconBackForward = {
    back: {
        icon: <IoCaretBack />,
        onClick: () => {
            history.back();
        },
        keyName: 'BackIcon',
        disabled: false,
    },
    forward: {
        icon: <IoCaretForward />,
        onClick: () => {
            history.forward();
        },
        keyName: 'ForwardIcon',
        disabled: false,
    },
};

const navIconSize: number = 20;
// 거래 관련 네비게이션
export const ledgerNavObject: TNavObjectGroup = {
    addTransaction: {
        url: non_authMainDir,
        icon: <FaMoneyBillWave size={navIconSize} />,
        displayName: '거래입력',
    },
    historyTransaction: {
        url: transactionHistoryDir,
        icon: <MdOutlineHistoryEdu size={navIconSize} />,
        displayName: '거래내역',
    },
    dashboard: {
        url: transactionDashboardDir,
        icon: <MdSpaceDashboard size={navIconSize} />,
        displayName: '대시보드',
    },
    expensesPerIncome: {
        url: expensesPerIncomeDir,
        icon: <BsGraphUp size={navIconSize} />,
        displayName: '수입/지출표',
    },
    AdviceAI: {
        url: adviceAIDir,
        icon: <GiArtificialHive size={navIconSize} />,
        displayName: 'AI조언',
    },
    buyOrRent: {
        url: buyOrRentDir,
        icon: <GiBuyCard size={navIconSize} />,
        displayName: 'Buy or Rent?',
    },
};

//게시판 관련 네비게이션
export const forumNavObject: TNavObjectGroup = {
    freeForum: {
        url: forumDir,
        icon: <FaSignsPost size={navIconSize} />,
        displayName: '자유게시판',
    },
    tipForum: {
        url: tipForum,
        icon: <MdOutlineTipsAndUpdates size={navIconSize} />,
        displayName: 'Tip!',
    },
    thriftyForum: {
        url: thriftyForum,
        icon: <GiSaveArrow size={navIconSize} />,
        displayName: '알뜰살뜰',
    },
    newsForum: {
        url: newsForum,
        icon: <IoNewspaperSharp size={navIconSize} />,
        displayName: '뉴스',
    },
    qnaForum: {
        url: qnaForum,
        icon: <FcSupport size={navIconSize} />,
        displayName: 'QnA',
    },
};

// 회원정보 관련 네비게이션
export const profileNavObject: TNavObjectGroup = {
    checkProfile: {
        url: profileDir,
        icon: <FaUserGraduate size={navIconSize} />,
        displayName: '회원정보',
    },
    editProfile: {
        url: editProfile,
        icon: <LiaUserEditSolid size={navIconSize} />,
        displayName: '회원정보 수정',
    },
    deleteProfile: {
        url: deleteProfile,
        icon: <RiDeleteBin5Fill size={navIconSize} />,
        displayName: '회원탈퇴',
    },
};

// OAUTH interface
export interface IOauthObject extends INavObject {
    hoverBgColor?: string;
    provider: BuiltInProviderType;
    callbackUrl?: string;
}

export type TOauthObjectGroup = Record<string, IOauthObject>;

//OAuth dir
export const OAuthNavObject: TOauthObjectGroup = {
    facebookOAuth: {
        url: '/',
        icon: <FaFacebook size={navIconSize} />,
        displayName: 'Facebook 계정으로 계속하기',
        bg_color: 'bg-blue-400 text-white',
        hoverBgColor: 'hover:bg-blue-500',
        provider: 'facebook',
        callbackUrl: non_authMainDir,
    },
    kakaoOAuth: {
        url: thriftyForum,
        icon: <RiKakaoTalkFill size={navIconSize} />,
        displayName: '카카오 계정으로 계속하기',
        bg_color: 'bg-yellow-300',
        hoverBgColor: 'hover:bg-yellow-400',
        provider: 'kakao',
        callbackUrl: non_authMainDir,
    },
    naverOAuth: {
        url: newsForum,
        icon: <SiNaver size={navIconSize} />,
        displayName: '네이버 계정으로 계속하기',
        bg_color: 'bg-green-300',
        hoverBgColor: 'hover:bg-green-400',
        provider: 'naver',
        callbackUrl: non_authMainDir,
    },
    googleOAuth: {
        url: '/',
        icon: <FcGoogle size={navIconSize} />,
        displayName: '구글 계정으로 계속하기',
        bg_color: 'bg-gray-50',
        hoverBgColor: 'hover:bg-gray-200',
        provider: 'google',
        callbackUrl: non_authMainDir,
    },
};
