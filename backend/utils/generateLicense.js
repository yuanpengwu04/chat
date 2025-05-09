import crypto from "crypto"

function generateLicenseKey(segments = 4, segmentLength = 4) {
    const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded confusing characters
    let key = '';
    
    for (let i = 0; i < segments; i++) {
        for (let j = 0; j < segmentLength; j++) {
            const randomIndex = crypto.randomInt(0, charset.length);
            key += charset[randomIndex];
        }
        if (i < segments - 1) key += '-';
    }
    
    return key;
}

function generateChecksum(key) {
    return crypto.createHash('sha256')
        .update(key)
        .digest('hex')
        .substring(0, 8)
        .toUpperCase();
}

export {generateLicenseKey, generateChecksum};