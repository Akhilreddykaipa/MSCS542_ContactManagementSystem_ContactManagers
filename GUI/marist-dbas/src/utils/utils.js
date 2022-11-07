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

function caesarEncrypt(str, shift) {
  let encrypted = "";
  console.log("utils str: " + str);
  console.log(typeof str);
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
