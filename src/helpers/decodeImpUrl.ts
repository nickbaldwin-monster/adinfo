
let data = {
    di: "bad9ccdb89544d00b4011f083bdd66fa",
    dj: 2,
    pc: 1.18,
    ec: 41.71536
}


// base64 character set, plus padding character (=)
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // Regular expression to check formal correctness of base64 encoded strings
    b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;


const atobPollyfill = function(string: string) {
    // atob can work with strings with whitespaces, even inside the encoded part,
    // but only \t, \n, \f, \r and ' ', which can be stripped.
    string = String(string).replace(/[\t\n\f\r ]+/g, "");

    if (!b64re.test(string))
        throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");


    // Adding the padding if missing, for semplicity
    string += "==".slice(2 - (string.length & 3));
    let bitmap, result = "", r1, r2, i = 0;
    for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
            | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
            : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
                : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
};


export const getDataFromUrl = (url: string) => {
        if (!url) {
            return null;
        }
        let match = url.match(/(?:http(?:s)?):\/\/(?:www\.)?(?:prod|preprod|dev)?.monsterview.com\/i.gif\?e=([-a-zA-Z0-9]*)&s=([\s\S]*)/);
        if (match && match[1]) {
            try {
                let d = atobPollyfill(match[1]);
                let u = JSON.parse(d);

                let { di, dj, pc, ec } = JSON.parse(d);

                return {
                    di: "" + di,
                    dj: "" + dj,
                    pc: "" + pc,
                    ec: "" + ec
                };

            } catch {
                //
                console.log('yikes');
                return null;
            }
        }
        else return null;
}