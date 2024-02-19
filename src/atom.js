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

//back으로 부터 받아온 친구 글의 위도, 경도, pid 정보
export const friendMarkers = atom({
  key: "friendMarkers",
  default: null,
});

export const isFriendMap = atom({
  key: "isFriendMap",
  default: false,
});
