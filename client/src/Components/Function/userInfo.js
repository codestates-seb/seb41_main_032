import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import getStorage from './getStorage';

const { persistAtom } = recoilPersist({
    storage: sessionStorage,
});

export const userInfo = atom({
    key: 'memberId', //  ID
    default: getStorage('memberId'), // default value
    effects_UNSTABLE: [persistAtom],
});
