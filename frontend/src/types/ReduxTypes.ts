import { StateType as AuthState } from "./AuthTypes";
import { StateType as BlockState } from "./PageTypes";

export interface RootState {
  auth: {
    auth: AuthState;
  };
  block: {
    blocks: BlockState;
  };
}
