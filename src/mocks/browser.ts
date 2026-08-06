// ブラウザで発生したAPIリクエストを監視するMSWの機能
import { setupWorker } from "msw/browser";

// handlers.tsに定義した仮APIの処理を読み込む
import { handlers } from "./handlers";

// handlersに登録されている仮APIを、ブラウザ上で使用できるようにする
export const worker = setupWorker(...handlers);


//handlersをMSWへ登録してworkerを作る役割