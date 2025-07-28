import { Outlet } from "react-router";
import Background from "../static/logo.svg";
import { FavoritesContext } from "../contexts/favorites";
import { useContext } from "react";

const logoStyle: { [key: string]: string | number } = {
  width: "20rem",
  height: "6.25rem",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "5rem auto",
};

const contentWrapper = {
  flexGrow: 1,
  background: "#82C7AF",
  padding: "2rem",
  width: "90%",
  marginLeft: "50px",
  color: "white",
  borderRadius: "5px",
};

const Wrapper = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <header style={logoStyle} />
      <div style={contentWrapper}>
        <Outlet />
        {
          favorites.length > 0 && (
            <>
              <div style={{ margin: "2rem" }}>
                <hr></hr>
              </div>
              <h1>Favorites</h1>
              <table>
                <thead>
                  <tr>
                    <th>Business Name</th>
                    <th>Rating Value</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {favorites.map(establishment => (
                    <tr key={establishment.FHRSID}>
                      <td>{establishment.BusinessName}</td>
                      <td>{establishment.RatingValue}</td>
                      <td><button onClick={() => toggleFavorite(establishment)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Wrapper;
