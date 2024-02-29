import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const initState = {
  pushList: [{ iuser: 0, totalCnt: 0, data: [] }],
};

const { persistAtom } = recoilPersist();
const pushState = atom({
  key: "pushState",
  default: initState,
  effects_UNSTABLE: [persistAtom],
  dangerouslyAllowMutability: true,
});

export default pushState;
