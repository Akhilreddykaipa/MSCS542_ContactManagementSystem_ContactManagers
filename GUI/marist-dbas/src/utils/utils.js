function newID() {
  return (Date.now() + Math.random()).toString().substr(4);
}

function formatDate(date) {
  console.log(date);
  let newIsoDate = new Date(date).toISOString();
  newIsoDate = newIsoDate.substring(0, newIsoDate.indexOf('T'));
  return newIsoDate;
}

function caesarEncrypt(str, shift) {
  let encrypted = "";
    for (var i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        encrypted += String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        encrypted += String.fromCharCode(((code - 97 + shift) % 26) + 97);
      } else {
        encrypted += str.charAt(i).toString();
      }
    }
    return String(encrypted);
}

function caesarDecrypt(str, shift) {
    let plain = '';
    shift = (26 - shift) % 26;
    plain = caesarEncrypt(str, shift);
    return plain;
}

module.exports = {
  newID,
  formatDate,
  caesarEncrypt,
  caesarDecrypt,
};
