import "../css/Settings.css";
import TableCell from "../Components/TableCell"

const Settings = (props) => {
  return (
    <>
      <div id="settings" className="container">
        <h2>Settings</h2>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <TableCell
              rowNum={1}
              ID={"wqosbpjegnegnr"}
              firstName={"test1"}
              lastName={"test1"}
              />
            <TableCell
              rowNum={2}
              ID={"rewqerhywrhwer"}
              firstName={"test2"}
              lastName={"test2"}
              />
            <TableCell
              rowNum={3}
              ID={"wehwewjtwrtjjt"}
              firstName={"test3"}
              lastName={"test3"}
              />
            <TableCell
              rowNum={4}
              ID={"dghkdghtghkytt"}
              firstName={"test4"}
              lastName={"test4"}
              />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Settings;
