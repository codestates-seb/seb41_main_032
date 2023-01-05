const CommaGenerator = (data) => {
    return data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

export default CommaGenerator;
