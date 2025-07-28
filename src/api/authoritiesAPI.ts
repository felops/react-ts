interface Authorities {
  LocalAuthorityId: number,
  LocalAuthorityIdCode: string,
  Name: string,
  EstablishmentCount: number,
  SchemeType: number,
  links: [
    {
      rel: string,
      href: string
    },
   {
      rel: string,
      href: string
    }
 ]
}

interface AuthoritiesType {
  authorities: Authorities[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: [
    {
      rel: string;
      href: string;
    }
  ];
};

export function getAuthorities(): Promise<AuthoritiesType> {
  return fetch(
    `http://api.ratings.food.gov.uk/Authorities/basic`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}
