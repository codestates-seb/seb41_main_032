// 로컬 스토리지와 세션 스토리지에 저장된 데이터 제거하는 함수
const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export default clearStorage;
