const TableCell = (props) => {
  return (
    <>
      <tr>
        <th scope="row">{props.rowNum}</th>
        <td>{props.ID}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>
          <button className="btn btn-warning">
            Edit
          </button>
        </td>
        <td>
          <button className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableCell;
