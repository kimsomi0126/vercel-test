import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const initState = {
  pushList: [],
};

const { persistAtom } = recoilPersist();
const pushState = atom({
  key: "pushState",
  default: initState,
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export default pushState;
