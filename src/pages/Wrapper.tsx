import { Outlet } from "react-router";
import Background from "../static/logo.svg";
import { FavoritesContext } from "../contexts/favorites";
import { useContext } from "react";

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
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div>
      <header style={logoStyle} />
      <div style={tableStyle}>
        <Outlet />
        <h2>Favorites</h2>
        {
          favorites.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Business Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {favorites.map(establishment => (
                  <tr key={establishment.FHRSID}>
                    <td>{establishment.BusinessName}</td>
                    <td><button onClick={() => toggleFavorite(establishment)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        }
      </div>
    </div>
  );
};

export default Wrapper;
