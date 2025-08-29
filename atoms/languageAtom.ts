import { atom } from "jotai";
import {
  languageList,
  LanguageType,
} from "@/components/account/setting/data/languageList";

export const languageAtom = atom<LanguageType[]>(languageList);

export const filteredDefaultLanguage = atom<LanguageType[]>((get) => {
  const list = get(languageAtom);
  return list.filter((item: LanguageType) => item.default);
});
