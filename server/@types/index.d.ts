declare interface IMessage {
  nickname: string | null
  value: string
}

declare interface ITyping {
  isTyping: boolean
  nickname: string
}

declare interface IClient {
  id: string
  nickname: string
}
