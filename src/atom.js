import { atom } from "recoil";

export const previewOpen = atom({
  key: "previewOpen",
  default: false,
});

export const clickedId = atom({
  key: "clickedId",
  default: [],
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

export const isPublicMap = atom({
  key: "isPublicMap",
  default: false,
});

//버블 클릭된 친구의 id정보
//css 조건부 활용을 위한 데이터
export const clickedFriend = atom({
  key: "clickedFriend",
  default: null,
});

export const isAllClicked = atom({
  key: "isAllClicked",
  default: true,
});

//friend list에서 __ 님은 이런 글을 썼어요에 사용
export const clickedName = atom({
  key: "clickedName",
  default: null,
});

//public page에서 사용을 위한 사용자 현위치 정보
export const curLat = atom({
  key: "curLat",
  default: null,
});
export const curLng = atom({
  key: "curLng",
  default: null,
});

//side menubar data

export const isHomePage = atom({
  key: "isHomePage",
  default: true,
});

export const isFriendPage = atom({
  key: "isFriendPage",
  default: false,
});

export const isPublicPage = atom({
  key: "isPublicPage",
  default: false,
});

export const isAccountPage = atom({
  key: "isAccountPage",
  default: false,
});