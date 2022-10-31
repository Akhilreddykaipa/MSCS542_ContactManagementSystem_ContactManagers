import { Link } from "react-router-dom";

const SideNavItem = (props) => {
  function setAsActive() {
    props.getActive(props.listItem);
  }

  return (
      <Link
        to={props.path}
        className={`sideNavButton ${props.toggleClass}`}
        onClick={setAsActive}
      >
        <div>
          {props.icon}
        </div>
        <span>
          {props.title}
        </span>
      </Link>
  )
};

export default SideNavItem;
