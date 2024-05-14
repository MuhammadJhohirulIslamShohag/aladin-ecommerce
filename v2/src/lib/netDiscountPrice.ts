const netDiscountPrice = (
    price: number,
    discount: number,
    quantity: number
) => {
    const discountPrice = Math.ceil(price * (discount / 100));
    const netPrice = Math.ceil(price - discountPrice) * quantity;

    return {
        discountPrice: discountPrice ? discountPrice : 0,
        netPrice: netPrice ? netPrice : 0,
    };
};

export default netDiscountPrice;
