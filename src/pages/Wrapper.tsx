import { Outlet } from "react-router";
import Background from "../static/logo.svg";

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "200px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const tableStyle = {
  background: "#82C7AF",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

const Wrapper = () => {
  return (
    <div>
      <header style={logoStyle} />
      <div style={tableStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default Wrapper;
