import CryptoJS from 'crypto-js';


//-------------------------普通方式，无iv----------------------------------------
// 如下函数应用于它们之间或与go配合，都是可以的。
//将key的前16字节作为iv
//加密
function Encrypt(data:any,key:any) {
    const KEY = CryptoJS.enc.Utf8.parse(key);
    const iv = key.slice(0,16)
    //console.log("iv:",iv)
    let encrypted = CryptoJS.AES.encrypt(data, KEY,         //CryptoJS.AES.encrypt已将iv隐藏在密文的前16个字节中。
        {
          iv: CryptoJS.enc.Utf8.parse(iv),  //偏移量
          mode: CryptoJS.mode.CBC,          //加密模式
          padding: CryptoJS.pad.Pkcs7       //填充
        }
    );
    return encrypted.toString();
    //return encrypted.toString(CryptoJS.enc.Utf8.);
    //return CryptoJS.enc.Utf8.stringify(encrypted.toString())
}

//解密
//准备工作：
//    解密前需了解密文来源，了解加密者的加密算法,如iv生成办法、iv存储方式,block填充方式等等。
//    例如：有些加密者会采用随机数用为iv，并隐藏在密文件的前12或16字节中，或其它位置。
//    而有些加密者会直接采用key的前16字节作为iv。
//
//本例的解密操作，是针对密文件为basse64格式，并 iv 隐藏在密文件的前16字节中
//取IV
function getIV(data:any) {
    const encoder = new TextEncoder()
    const DataByte = encoder.encode(data)                  //将密文转字节切片
    const ivByte = DataByte.slice(0, 16)                   //取字节切片前16字节，即iv字节切片
    const ivStr = new TextDecoder('utf-8').decode(ivByte)  //将iv字节切片转字串
    return ivStr
}
//解密
function Decrypt(data:any,key:any) {
    //iv提取：办法一，从密文中提取前16字节。通用。
    /*
    const KEY = CryptoJS.enc.Utf8.parse(key);
    const iv = getIV(data)
    */
    //由于本次解密的密文的iv是由key的前16字节组成，可从key中直接提取。
    const KEY = CryptoJS.enc.Utf8.parse(key);
    const iv = key.slice(0,16)
    //console.log("iv:",iv)

    const decrypted = CryptoJS.AES.decrypt(data, KEY, {
          iv : CryptoJS.enc.Utf8.parse(iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
    //return CryptoJS.enc.Utf8.stringify(decrypted)   //此类书写也是可以的。
}



//---------------------------iv版，加解密双方明确录入iv值--------------------------------------
// 如下函数应用于它们之间或与go配合，都是可以的。
//加密
function EncryptIV(data:any,key:any,iv:any) {
    const KEY = CryptoJS.enc.Utf8.parse(key)
    const IV = CryptoJS.enc.Utf8.parse(iv)
    let encrypted = CryptoJS.AES.encrypt(data, KEY, 
        {
          iv: IV,                      //偏移量
          mode: CryptoJS.mode.CBC,     //加密模式
          padding: CryptoJS.pad.Pkcs7  //填充
        }
    );
    return encrypted.toString();
}

//解密
function DecryptIV(data:any,key:any,iv:any) {
    const KEY = CryptoJS.enc.Utf8.parse(key)
    const IV = CryptoJS.enc.Utf8.parse(iv)
    let decrypted = CryptoJS.AES.decrypt(data, KEY, 
        {
          iv: IV,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
    //return CryptoJS.enc.Utf8.stringify(decrypted)   //此类书写也是可以的。
}


//对外开放定义的函数
export {
    Encrypt,
    Decrypt,
    EncryptIV,
    DecryptIV,
}