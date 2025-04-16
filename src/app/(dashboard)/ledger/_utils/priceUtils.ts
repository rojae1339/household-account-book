//10000과 같은 수를 1000단위로 10,000이 되도록 콤마를 찍어주는 함수
export const makePriceWithComma = (price: number) => {
    const regex = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
    return price.toString().replace(regex, ',');
};
