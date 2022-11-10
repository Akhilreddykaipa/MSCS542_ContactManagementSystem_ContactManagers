const DepartmentOption = (props) => {
  return (
    <>
      {props.departmentData.map((dep) =>
        <option key={dep.id} id={dep.value} value={dep.id}>{dep.label}</option>
      )}
    </>
  );
}

export default DepartmentOption;
