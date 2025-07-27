const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable = ({
  establishments
}: {
  establishments: { [key: string]: string }[] | null | undefined;
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
      </thead>
      <tbody>
        {establishments && establishments?.map(establishment => (
          <tr style={{ fontSize: "20px" }}>
            <td>{establishment?.BusinessName}</td>
            <td>{establishment?.RatingValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
