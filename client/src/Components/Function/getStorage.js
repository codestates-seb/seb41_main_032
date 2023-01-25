/**
 * 로컬 스토리지 또는 세션 스토리지에 저장된 데이터를 반환하는 함수
 * @param {string} data - 'memberId', 'username', 'authorization', 'refresh' 중 하나
 * @return {string}
 */
const getStorage = (data) => {
  return localStorage.getItem(data) || sessionStorage.getItem(data);
};

export default getStorage;
