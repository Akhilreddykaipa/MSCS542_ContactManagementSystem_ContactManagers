import "../css/Dashboard.css";

const Dashboard = (props) => {
  return (
    <>
      <div id="dashboard" className="container">
        <h2>Dashboard</h2>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>wqosbpjegnegnr</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>qpgj294gjwg2mg</td>
              <td>test</td>
              <td>test</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>koweqgopwinjgr</td>
              <td>test</td>
              <td>test</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
