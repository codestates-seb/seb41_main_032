import { useIsOpen } from '../API/ReactQueryContainer';

const useStockTime = () => {
    const isOpen = useIsOpen();
    if (!isOpen) return '장마감';

    let date = new Date();
    const time = [date.getHours(), date.getMinutes()];
    const calculation = (time) => {
        if (time[0] === 8) {
            if (time[1] >= 30 && time[1] <= 39) return '장전 시간외 종가';
            if (time[1] >= 30 && time[1] <= 59) return '장 시작 동시호가';
        }
        if (time[0] === 15) {
            if (time[1] >= 20 && time[1] <= 29) return '장 마감 동시호가';
            if (time[1] >= 40 && time[1] <= 59) return '장후 시간외 종가';
            if (time[1] >= 30 && time[1] < 40) return '장마감';
        }
        if (time[0] >= 16 && time[0] < 18) return '시간외 단일가';
        if (time[0] < 9 || time[0] >= 18) return '장마감';
        return '실시간';
    };
    return calculation(time);
};

export default useStockTime;
