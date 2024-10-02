import { gql, TypedDocumentNode } from "@apollo/client";

export type MediaType = "ANIME" | "MANGA";

export interface PageResponse {
  Page: {
    media: {
      id: number;
      title: { english: string; native: string };
      coverImage: { extraLarge: string };
      averageScore: number;
      description: string;
      type: MediaType;
      genres: string[];
      externalLinks: { url: string }[];
    }[];

    pageInfo: { lastPage: number; currentPage: number };
  };
}

interface PageParams {
  page: number;
}

export const PER_PAGE = 50;

export const GET_PAGE: TypedDocumentNode<PageResponse, PageParams> = gql`
  query getPage($page: Int = 1) {
    Page(page: $page, perPage: ${PER_PAGE}) {
      pageInfo {
        lastPage
        currentPage
      }
      media {
        id
        averageScore
        type
        description
        genres
        title {
          english
          native
        }
        coverImage {
          extraLarge
        }
        externalLinks {
          url
        }
      }
    }
  }
`;
