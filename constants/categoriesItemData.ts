import * as Crypto from "expo-crypto";

export type CategoriesItemData = {
  id: string;
  uuid: string;
  name: string;
  slug: string;
  children?: CategoriesItemData[];
};

export const categoriesItemData: CategoriesItemData[] = [
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-1",
    name: "Category 1",
    children: [
      {
        uuid: Crypto.randomUUID(),
        slug: Crypto.randomUUID(),
        name: "Child Category 1 Child Category 1",
        id: "child-category 1",
        children: [
          {
            uuid: Crypto.randomUUID(),
            slug: Crypto.randomUUID(),
            id: "Sub Child Category 1",
            name: "sub-child-category 1",
          },
          {
            uuid: Crypto.randomUUID(),
            slug: Crypto.randomUUID(),
            id: "Sub Child Category 2",
            name: "sub-child-category 2",
          },
          {
            uuid: Crypto.randomUUID(),
            slug: Crypto.randomUUID(),
            id: "Sub Child Category 3",
            name: "sub-child-category 3",
          },
          {
            uuid: Crypto.randomUUID(),
            slug: Crypto.randomUUID(),
            id: "Sub Child Category 4",
            name: "sub-child-category 4",
          },
          {
            uuid: Crypto.randomUUID(),
            slug: Crypto.randomUUID(),
            id: "Sub Child Category 5",
            name: "sub-child-category 5",
          },
        ],
      },
      {
        uuid: Crypto.randomUUID(),
        slug: Crypto.randomUUID(),
        id: "Child Category 2",
        name: "child-category 2",
      },
      {
        uuid: Crypto.randomUUID(),
        slug: Crypto.randomUUID(),
        id: "Child Category 3",
        name: "child-category 3",
      },
      {
        uuid: Crypto.randomUUID(),
        slug: Crypto.randomUUID(),
        id: "Child Category 4",
        name: "child-category 4",
      },
      {
        uuid: Crypto.randomUUID(),
        slug: Crypto.randomUUID(),
        id: "Child Category 5",
        name: "child-category 5",
      },
    ],
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-2",
    name: "Category 2",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-3",
    name: "Category 3",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-4",
    name: "Category 4",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-5",
    name: "Category 5",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-6",
    name: "Category 6",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-7",
    name: "Category 7",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-8",
    name: "Category 8",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-9",
    name: "Category 9",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-10",
    name: "Category 10",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-11",
    name: "Category 11",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-12",
    name: "Category 12",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-13",
    name: "Category 13",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-14",
    name: "Category 14",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-15",
    name: "Category 15",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-16",
    name: "Category 16",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-17",
    name: "Category 17",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-18",
    name: "Category 18",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-19",
    name: "Category 19",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-20",
    name: "Category 20",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-21",
    name: "Category 21",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-22",
    name: "Category 22",
  },
  {
    uuid: Crypto.randomUUID(),
    slug: Crypto.randomUUID(),
    id: "category-23",
    name: "Category 23",
  },
];
