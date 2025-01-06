export enum MessageType {
  /**
   * 标签响应
   */
  TAB_RESPONSE = "TAB_RESPONSE",
  /**
   * 标签请求
   */
  TAB_REQUEST = "TAB_REQUEST",
  /**
   * 销毁
   */
  DESTROY = "DESTROY",
  /**
   * 参选
   */
  CAMPAIGN = "CAMPAIGN",
  /**
   * 链接完成
   */
  CONNECTED = "CONNECTED",
}

export type ReqId = string;
export const SharedHandleTypes = [MessageType.DESTROY, MessageType.CAMPAIGN];

export interface RequestPayload<T = any> {
  type?: MessageType;
  reqId: string;
  data?: T;
}

export interface ResponsePayload<T = any> {
  type?: MessageType;
  reqId: string;
  success: boolean;
  data?: T;
  message?: string;
}

export interface QueueElement<T = any> {
  tabId: string;
  payload: RequestPayload<T>;
}

//@ts-ignore
export interface SharedWorkerGlobalScope extends EventTarget {
  onconnect: ((this: SharedWorkerGlobalScope, ev: MessageEvent) => any) | null;
  addEventListener(
    type: "connect",
    listener: (this: SharedWorkerGlobalScope, ev: MessageEvent) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

export interface TabDescriptor {
  id: string;
  prot: MessagePort;
}
