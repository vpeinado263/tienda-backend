"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = isValidUrl;
function isValidUrl(url) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}
