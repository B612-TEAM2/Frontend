import { atom } from "recoil";

export const previewOpen = atom({
  key: "previewOpen",
  default: false,
});

export const clickedId = atom({
  key: "clickedId",
  default: null,
});

export const isHomeMap = atom({
  key: "isHomeMap",
  default: false,
});
