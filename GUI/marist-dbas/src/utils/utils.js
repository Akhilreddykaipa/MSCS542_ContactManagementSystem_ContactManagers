function newID() {
  return (Date.now() + Math.random()).toString().substr(4);
}

function formatDate(date) {
  let newDate = new Date(date);
  let m = newDate.getMonth();
  let d = newDate.getDate();
  let y = newDate.getFullYear().toString().slice(2,4);
  return m + "/" + d + "/" + y;
}

class CaesarCipher {
  constructor(str, offset) {
    this.str = str;
    this.offset = offset;
    this.encrypted = this.encrypt(str, offset);
  }

  encrypt() {
    let res = "";
    for (let i = 0; i < this.str.length; i++) {
      let code = this.str.charCodeAt(i);
      // Capital letter codes
      if ((code >= 65) && (code <= 90)) {
        res += String.fromCharCode(((code - 65 + this.offset) % 26) + 65);
      // Lowercase letter codes
      } else if ((code >= 97) && (code <= 122)) {
        res += String.fromCharCode(((code - 97 + this.offset) % 26) + 97);
      }
    }
    return res;
  }

  decrypt() {
    let res = "";
    for (let i = 0; i < this.encrypted.length; i++) {
      let code = this.encrypted.charCodeAt(i);
      // Capital letter codes
      if ((code >= 65) && (code <= 90)) {
        res += String.fromCharCode(((code - 65 - this.offset) % 26) + 65);
      // Lowercase letter codes
      } else if ((code >= 97) && (code <= 122)) {
        res += String.fromCharCode(((code - 97 - this.offset) % 26) + 97);
      }
    }
    return res;
  }
}

let ces = new CaesarCipher("testString", 12);
ces.decrypt();

module.exports = {
  newID,
  formatDate,
  CaesarCipher,
};
