import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useKOSDAQList, useKOSPIList } from '../API/ReactQueryContainer';
import { stockList } from '../Function/userInfo';

/** map 자료구조를 이용하여 약 3000개정도 되는 주식리스트를 효율적으로 검색합니다
 * 각 주식의 첫글자만 가져와서 map 의 키값으로 할당합니다
 * setKeyword로 사용자가 검색창에 입력했을 경우 해당 키워드의와 일치하는 map 키값을 리턴합니다
 */
const useStockSearch = () => {
    console.time('createPDF');
    const [stock, setStock] = useRecoilState(stockList);
    const [keyword, setKeyword] = useState();
    const [dataMap, setDataMap] = useState();
    const [sortData, setSortData] = useState();
    const KOSPI = useKOSPIList();
    const KOSDAQ = useKOSDAQList();

    useEffect(() => {
        let map = new Map();
        if (KOSPI && KOSDAQ) {
            const stockList = [].concat(KOSPI, KOSDAQ);
            for (let i = 0; i < stockList.length; i++) {
                map.set(stockList[i].itmsNm[0], []);
            }
            for (let i = 0; i < stockList.length; i++) {
                map.set(stockList[i].itmsNm[0], [].concat(map.get(stockList[i].itmsNm[0]), stockList[i]));
            }
        }
        setDataMap(map);
    }, [KOSPI, KOSDAQ]);

    useEffect(() => {
        if (!keyword) {
            setSortData(null);
            return;
        }
        console.time('개선 이후');
        const sortData = dataMap.get(keyword[0].toUpperCase());
        const findData = sortData?.filter((el) => el.itmsNm.includes(keyword.toUpperCase()));
        setSortData(findData);
        console.timeEnd('개선 이후');
    }, [keyword]);
    return [sortData, setKeyword];
};

export default useStockSearch;
