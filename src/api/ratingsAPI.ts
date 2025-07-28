import { Establishment } from "../models/Establishment";

type EstablishmentsType = {
  establishments: Establishment[];
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

type EstablishmentDetailType = {  
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  RatingDate: Date
  RatingValue: string
};

export const getEstablishmentRatings = async (
  pageNum: number
): Promise<EstablishmentsType> => {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export const getEstablishmentRatingsByAuthority = async (
  authority: string,
  pageNum: number
): Promise<EstablishmentsType> => {
  return fetch(
    `http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${authority}&pageNumber=${pageNum}&pageSize=10`,
    { headers: { "x-api-version": "2" } }
  ).then((res) => res.json());
}

export const getEstablishmentRatingsById = async (
  id?: string
): Promise<EstablishmentDetailType> => {
  if (!id) {
    return Promise.reject(new Error("Establishment ID is required"));
  }
  const res = await fetch(
    `http://api.ratings.food.gov.uk/Establishments/${id}`,
    { headers: { "x-api-version": "2" } }
  );
  return await res.json();
}
