// AES 加密
import { encrypt } from 'crypto-js/aes';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import ECB from 'crypto-js/mode-ecb';
import UTF8 from 'crypto-js/enc-utf8';
import HEX from 'crypto-js/enc-hex';
import { SECRET_KEY } from '@/settings/encryption';

// AES 加密
export const encryptByAES = (cipherText: string) => {
  return encrypt(UTF8.parse(cipherText), HEX.parse(SECRET_KEY), {
    mode: ECB,
    padding: Pkcs7,
  }).toString();
};
