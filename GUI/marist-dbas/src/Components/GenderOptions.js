import React from 'react';

const GenderOptions = (props) => {
  return (
    <>
      <option defaultValue>-</option>
      {props.genderData.map((gen) =>
        <option key={gen.id} value={gen.value}>{gen.value}</option>
      )}
    </>
  );
}

export default GenderOptions;
