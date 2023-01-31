import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 페이지 이동시 스크롤을 최상단으로 올려주는 기능입니다
 * url의 pathname 기준으로 작동합니다
 * @author 이중원
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
