const GenderOption = (props) => {
  return (
    <>
      {props.genderData.map((gen) =>
        <option key={gen.id} value={gen.value}>{gen.label}</option>
      )}
    </>
  );
}

export default GenderOption;
