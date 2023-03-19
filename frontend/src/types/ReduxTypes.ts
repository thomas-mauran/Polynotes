import { StateType as AuthState } from "./AuthTypes";
import { StateType as BlockState } from "./PageTypes";

export interface RootState {
  authReduc: {
    auth: AuthState;
  };
  block: {
    blocks: BlockState;
  };
}
