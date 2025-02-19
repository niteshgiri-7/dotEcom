
export const generateCoupon = (prefix: string, length: string,setCouponCode:React.Dispatch<React.SetStateAction<string>>): string => {
    const letters: string[] = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
    ];

    let coupon: string = prefix;

    if (prefix.length > 10 || Number(length) > 20) return "Too long";

    if (Number(length) < prefix.length) return "invalid input";

    for (let i = 0; i < (Number(length) - prefix.length); i++) {
        const idx = Math.floor(Math.random() * (letters.length));
        coupon += letters[idx];
    }
    setCouponCode(coupon);
    return coupon;
}