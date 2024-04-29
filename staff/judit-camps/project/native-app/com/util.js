// @ts-nocheck
import { decode } from 'base-64';
function extractJwtPayload(token) {
    const [, payloadB64] = token.split(".");
    const payloadJSON = decode(payloadB64);
    const payload = JSON.parse(payloadJSON);
    return payload;
}
const util = {
    extractJwtPayload
};
export default util;
