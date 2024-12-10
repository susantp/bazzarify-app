import { find } from "underscore";

export const getById = <T extends { id: string }>(
  id: string,
  collection: T[],
): T | undefined => collection.find((item) => item.id === id);

export const findChildren = <T extends { id: string; children?: T[] }>(
  collection: T[],
  keys: string[],
): T[] => {
  let currentLevel: T[] = collection;

  for (const key in keys) {
    const value = keys[key];

    const matchingNode = find(currentLevel, (node: T) => node.id === value);

    if (!matchingNode) {
      return [];
    }

    currentLevel = matchingNode.children || [];
  }

  return currentLevel;
};
