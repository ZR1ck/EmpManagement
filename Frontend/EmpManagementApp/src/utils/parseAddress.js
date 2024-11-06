export const parseAddress = (address) => {
    const cityKeywords = ["thành phố", "tỉnh", "city"];
    const districtKeywords = ["quận", "huyện", "state"];
    const wardKeywords = ["phường", "xã", "county"];
    const streetKeywords = ["đường", "st", "street"];

    function findLocation(keywordList, address) {
        for (const keyword of keywordList) {
            const match = address.match(new RegExp(`${keyword} [^,]+`, 'i'));
            if (match) return match[0];
        }
        return '';
    }

    const city = findLocation(cityKeywords, address);
    const district = findLocation(districtKeywords, address);
    const ward = findLocation(wardKeywords, address);
    const street = address.match(new RegExp(`(?:số|no\\.?|\\d+\\s?) [^,]+|${streetKeywords.join('|')} [^,]+`, 'i'));

    return {
        ward: ward || '',
        district: district || '',
        city: city || '',
        street: street ? street[0] : '',
    };
};
