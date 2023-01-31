import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import getStorage from './getStorage';

/**
 * 클라이언트 상태를 관리해주는 recoil입니다
 * @author 이중원
 */

const { persistAtom } = recoilPersist({
    storage: sessionStorage,
});

// 유저정보 관리
export const userInfo = atom({
    key: 'memberId', //  ID
    default: getStorage('memberId'), // default value
    effects_UNSTABLE: [persistAtom],
});

// 주식 전체 정보 관리 => 하루마다 업데이트
export const stockList = atom({
    key: 'stockList', //  ID
    default: getStorage('stockList'), // default value
    effects_UNSTABLE: [persistAtom],
});
