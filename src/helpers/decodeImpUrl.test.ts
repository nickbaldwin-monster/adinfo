import { getDataFromUrl } from "./decodeImpUrl";

const url = "https://prod.monsterview.com/i.gif?e=eyJ2IjoiMS45IiwiYXYiOjE2MjY1MjEsImF0IjoxNjIsImJ0IjowLCJjbSI6MzIwNjk1MTMsImNoIjo1MDQ3NSwiY2siOnt9LCJjciI6NDgyNDA4ODIsImRpIjoiYmFkOWNjZGI4OTU0NGQwMGI0MDExZjA4M2JkZDY2ZmEiLCJkaiI6MiwiaWkiOiJjMGM5Y2E3NDhmMTk0MjVhYmRiMWE5NTlhMGNkNzQ2MCIsImRtIjozLCJmYyI6NzM1Njk5OTQsImZsIjo2NTY3OTYzMiwiaXAiOiIxMDcuMjIuMjUxLjIxNSIsIm53IjoxMDUxNSwicGMiOjEuMTgsImRwIjozNS41Nzc5OTk5OTk5OTk5OTYsImRuIjozNS41Nzc5OTk5OTk5OTk5OTYsImRnIjozNS41Nzc5OTk5OTk5OTk5OTYsImVjIjo0MS43MTUzNiwiZ20iOjAsImVwIjpudWxsLCJwciI6MjE3OTEzLCJydCI6MywicnMiOjUwMCwic2EiOiJ1bmRlZmluZWQiLCJzYiI6ImktMGYyZTdhYWUzYzExZTE1MTUiLCJzcCI6MzgzNDc4OSwic3QiOjExMjk3MTIsInVrIjoiMWExZWE3OWYtYWZmYS00YzBmLWI1ODAtNzczYjMxODQ4ZTg5IiwidHMiOjE2MzMxNTg2MDkyMjgsInBuIjoibW9uc3RlcjpKU1JfU1BMSVRfVklFVyIsImdjIjp0cnVlLCJnQyI6dHJ1ZSwiZ3MiOiJub25lIiwiYmkiOjEsInR6IjoiVVRDIiwiYmEiOjQxLCJmcSI6MH0&s=TL1CIallRX846ACDHR9-zSQuIhY&property%3Aaid=ffd67fadfdd4a389b63ed608af877db5&property%3Aapp=monster&property%3Acname=Senior+Engineer%2C+Software+Engineering&property%3Acsrc=ppc.now&property%3Acmp=JSR_SPLIT_VIEW&property%3Acur=USD&property%3Aexr=1.0&property%3Ajid=c5787828-a7f2-449a-84a9-4936d8990628&property%3Ajloc=%5B%7B%22city%22%3A%22Boston%22%2C%22state%22%3A%22MA%22%2C%22country%22%3A%22US%22%2C%22zipcode%22%3A%2202112%22%2C%22latitude%22%3A%2242.336%22%2C%22longitude%22%3A%22-71.018%22%7D%5D&property%3Ajmsc=1500127001001&property%3Ajtit=Senior+Engineer%2C+Software+Engineering&property%3Asid=a9b4cff9-ea5e-45bb-a38e-56c22958cfd1&property%3Alat=39.0481&property%3Alng=-77.4728&property%3Apcd=capitalmarketsftpin&property%3Aua=Java-http-client%2F11.0.12&property%3Arip=107.22.251.215&property%3Asname=Web&property%3Asdate=2021-10-02T04%3A40%3A26.633&property%3Aac=US&property%3Aap=GCTS_ADQUERY&property%3Azip=511&property%3Asp=Software+Engineer&property%3Asl=Boston%2C+MA%23%2F";
const str = "eyJ2IjoiMS45IiwiYXYiOjE2MjY1MjEsImF0IjoxNjIsImJ0IjowLCJjbSI6MzIwNjk1MTMsImNoIjo1MDQ3NSwiY2siOnt9LCJjciI6NDgyNDA4ODIsImRpIjoiYmFkOWNjZGI4OTU0NGQwMGI0MDExZjA4M2JkZDY2ZmEiLCJkaiI6MiwiaWkiOiJjMGM5Y2E3NDhmMTk0MjVhYmRiMWE5NTlhMGNkNzQ2MCIsImRtIjozLCJmYyI6NzM1Njk5OTQsImZsIjo2NTY3OTYzMiwiaXAiOiIxMDcuMjIuMjUxLjIxNSIsIm53IjoxMDUxNSwicGMiOjEuMTgsImRwIjozNS41Nzc5OTk5OTk5OTk5OTYsImRuIjozNS41Nzc5OTk5OTk5OTk5OTYsImRnIjozNS41Nzc5OTk5OTk5OTk5OTYsImVjIjo0MS43MTUzNiwiZ20iOjAsImVwIjpudWxsLCJwciI6MjE3OTEzLCJydCI6MywicnMiOjUwMCwic2EiOiJ1bmRlZmluZWQiLCJzYiI6ImktMGYyZTdhYWUzYzExZTE1MTUiLCJzcCI6MzgzNDc4OSwic3QiOjExMjk3MTIsInVrIjoiMWExZWE3OWYtYWZmYS00YzBmLWI1ODAtNzczYjMxODQ4ZTg5IiwidHMiOjE2MzMxNTg2MDkyMjgsInBuIjoibW9uc3RlcjpKU1JfU1BMSVRfVklFVyIsImdjIjp0cnVlLCJnQyI6dHJ1ZSwiZ3MiOiJub25lIiwiYmkiOjEsInR6IjoiVVRDIiwiYmEiOjQxLCJmcSI6MH0";
const dodgyurl = "https://prod.monsterview.com/i.gif?e=eyJ2IjoiMS45IiwiYXYiOjE2MjY1MjEsImFaAAAa0IjowLCJjbSI6M1MTMsImNoIjo1MDQ3NSwiY2siOnt9LCJjciI6NDgyNDA4ODIsImRpIjoiYmFkOWNjZGI4OTU0NGQwMGI0MDExZjA4M2JkZDY2ZmEiLCJkaiI6MiwiaWkiOiJjMGM5Y2E3NDhmMTk0MjVhYmRiMWE5NTlhMGNkNzQ2MCIsImRtIjozLCJmYyI6NzM1Njk5OTQsImZsIjo2NTY3OTYzMiwiaXAiOiIxMDcuMjIuMjUxLjIxNSIsIm53IjoxMDUxNSwicGMiOjEuMTgsImRwIjozNS41Nzc5OTk5OTk5OTk5OTYsImRuIjozNS41Nzc5OTk5OTk5OTk5OTYsImRnIjozNS41Nzc5OTk5OTk5OTk5OTYsImVjIjo0MS43MTUzNiwiZ20iOjAsImVwIjpudWxsLCJwciI6MjE3OTEzLCJydCI6MywicnMiOjUwMCwic2EiOiJ1bmRlZmluZWQiLCJzYiI6ImktMGYyZTdhYWUzYzExZTE1MTUiLCJzcCI6MzgzNDc4OSwic3QiOjExMjk3MTIsInVrIjoiMWExZWE3OWYtYWZmYS00YzBmLWI1ODAtNzczYjMxODQ4ZTg5IiwidHMiOjE2MzMxNTg2MDkyMjgsInBuIjoibW9uc3RlcjpKU1JfU1BMSVRfVklFVyIsImdjIjp0cnVlLCJnQyI6dHJ1ZSwiZ3MiOiJub25lIiwiYmkiOjEsInR6IjoiVVRDIiwiYmEiOjQxLCJmcSI6MH0&s=TL1CIallRX846ACDHR9-zSQuIhY&property%3Aaid=ffd67fadfdd4a389b63ed608af877db5&property%3Aapp=monster&property%3Acname=Senior+Engineer%2C+Software+Engineering&property%3Acsrc=ppc.now&property%3Acmp=JSR_SPLIT_VIEW&property%3Acur=USD&property%3Aexr=1.0&property%3Ajid=c5787828-a7f2-449a-84a9-4936d8990628&property%3Ajloc=%5B%7B%22city%22%3A%22Boston%22%2C%22state%22%3A%22MA%22%2C%22country%22%3A%22US%22%2C%22zipcode%22%3A%2202112%22%2C%22latitude%22%3A%2242.336%22%2C%22longitude%22%3A%22-71.018%22%7D%5D&property%3Ajmsc=1500127001001&property%3Ajtit=Senior+Engineer%2C+Software+Engineering&property%3Asid=a9b4cff9-ea5e-45bb-a38e-56c22958cfd1&property%3Alat=39.0481&property%3Alng=-77.4728&property%3Apcd=capitalmarketsftpin&property%3Aua=Java-http-client%2F11.0.12&property%3Arip=107.22.251.215&property%3Asname=Web&property%3Asdate=2021-10-02T04%3A40%3A26.633&property%3Aac=US&property%3Aap=GCTS_ADQUERY&property%3Azip=511&property%3Asp=Software+Engineer&property%3Asl=Boston%2C+MA%23%2F";


const escaped = "{\"v\":\"1.9\",\"av\":1626521,\"at\":162,\"bt\":0,\"cm\":32069513,\"ch\":50475,\"ck\":{},\"cr\":48240882,\"di\":\"bad9ccdb89544d00b4011f083bdd66fa\",\"dj\":2,\"ii\":\"c0c9ca748f19425abdb1a959a0cd7460\",\"dm\":3,\"fc\":73569994,\"fl\":65679632,\"ip\":\"107.22.251.215\",\"nw\":10515,\"pc\":1.18,\"dp\":35.577999999999996,\"dn\":35.577999999999996,\"dg\":35.577999999999996,\"ec\":41.71536,\"gm\":0,\"ep\":null,\"pr\":217913,\"rt\":3,\"rs\":500,\"sa\":\"undefined\",\"sb\":\"i-0f2e7aae3c11e1515\",\"sp\":3834789,\"st\":1129712,\"uk\":\"1a1ea79f-affa-4c0f-b580-773b31848e89\",\"ts\":1633158609228,\"pn\":\"monster:JSR_SPLIT_VIEW\",\"gc\":true,\"gC\":true,\"gs\":\"none\",\"bi\":1,\"tz\":\"UTC\",\"ba\":41,\"fq\":0}";

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
    var bitmap, result = "", r1, r2, i = 0;
    for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12
            | (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255)
            : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255)
                : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
};






// sanity tests
test('get url', () => {
    expect(typeof url).toEqual('string');
});
test('get domain', () => {
    let domain = "https://prod.monsterview.com";
    let match = url.match(/https:\/\/prod.monsterview.com/);
    expect(match).toContain(domain);
});

test('get string, for valid url', () => {
 let match = url.match(/(?:http(?:s)?):\/\/(?:www\.)?(?:prod|preprod|dev)?.monsterview.com\/i.gif\?e=([-a-zA-Z0-9]*)&s=([\s\S]*)/);
    if (match) {
        expect(match[1]).toContain(str);
    }
});


test('get null, for invalid url', () => {
    const invalid = "https://prod.monster.com/i.gif?e=eyJ2IjoiMS45I&s=eded";
    let match = invalid.match(/(?:http(?:s)?):\/\/(?:www\.)?(?:prod|preprod|dev)?.monsterview.com\/i.gif\?e=([-a-zA-Z0-9]*)&s=([\s\S]*)/);
    expect(match).toBeNull();

});


test('get rest of stuff, for valid url', () => {
    let match = url.match(/(?:http(?:s)?):\/\/(?:www\.)?(?:prod|preprod|dev)?.monsterview.com\/i.gif\?e=([-a-zA-Z0-9]*)&s=([\s\S]*)/);
    if (match) {
        expect(match[2]).toContain("TL1CIallRX846ACDHR9-zSQuIhY&property%3Aaid=ffd67fadfdd4a389b63ed608af877db5&property%3Aapp=monster&property%3Acname=Senior+Engineer%2C+Software+Engineering&property%3Acsrc=ppc.now&property%3Acmp=JSR_SPLIT_VIEW&property%3Acur=USD&property%3Aexr=1.0&property%3Ajid=c5787828-a7f2-449a-84a9-4936d8990628&property%3Ajloc=%5B%7B%22city%22%3A%22Boston%22%2C%22state%22%3A%22MA%22%2C%22country%22%3A%22US%22%2C%22zipcode%22%3A%2202112%22%2C%22latitude%22%3A%2242.336%22%2C%22longitude%22%3A%22-71.018%22%7D%5D&property%3Ajmsc=1500127001001&property%3Ajtit=Senior+Engineer%2C+Software+Engineering&property%3Asid=a9b4cff9-ea5e-45bb-a38e-56c22958cfd1&property%3Alat=39.0481&property%3Alng=-77.4728&property%3Apcd=capitalmarketsftpin&property%3Aua=Java-http-client%2F11.0.12&property%3Arip=107.22.251.215&property%3Asname=Web&property%3Asdate=2021-10-02T04%3A40%3A26.633&property%3Aac=US&property%3Aap=GCTS_ADQUERY&property%3Azip=511&property%3Asp=Software+Engineer&property%3Asl=Boston%2C+MA%23%2F");
    }
});


test('can b64 decode string', () => {
    let match = url.match(/(?:http(?:s)?):\/\/(?:www\.)?(?:prod|preprod|dev)?.monsterview.com\/i.gif\?e=([-a-zA-Z0-9]*)&s=([\s\S]*)/);
    if (match && match[1] === str) {
        expect(match[1]).toContain(str);
        let d = atobPollyfill(str);
        expect(d).toEqual(escaped);
    }
});

test('can parse string', () => {
    let u = JSON.parse(escaped)
    expect(u).toEqual(
        expect.objectContaining({
            di: "bad9ccdb89544d00b4011f083bdd66fa",
            dj: 2,
            pc: 1.18,
            ec: 41.71536
        })
    );
});


test('data from valid url', () => {
    let u = getDataFromUrl(url, 'fakeid-valid');
    expect(u).toEqual(
        expect.objectContaining({
            decisionId: "bad9ccdb89544d00b4011f083bdd66fa",
            decisionIndex: "2",
            price: "1.18",
            ecpm: "41.71536"
        })
    );
});

test('null from wrong domain', () => {
    let u = getDataFromUrl("https://monster.com/i.gif?e=frrfrfrfrfrrf&s=eeeeded", 'fakeid-invalid');
    expect(u).toMatchObject({ error: 'unknown' });
});

test('null from correct domain but incorrect string', () => {
    let u = getDataFromUrl(dodgyurl, 'fakeid-invalid');
    // expect(getDataFromUrl(dodgyurl)).toThrow();
    expect(u).toMatchObject({error: 'cannot decode url'});
});