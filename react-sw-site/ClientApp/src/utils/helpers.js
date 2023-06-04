export const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/; // 10 digits with hyphens
    return phoneNumberPattern.test(phoneNumber);
};
