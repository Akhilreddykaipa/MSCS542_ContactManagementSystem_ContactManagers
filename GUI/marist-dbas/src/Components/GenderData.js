const utils = require('../utils/utils.js');

const GenderData = [
    {
      id: utils.newID(),
      label: "-",
      value: null
    },
    {
      id: utils.newID(),
      label: "Male",
      value: "M"
    },
    {
      id: utils.newID(),
      label: "Female",
      value: "F"
    },
    {
      id: utils.newID(),
      label: "Other",
      value: "O"
    }
];

export default GenderData;
