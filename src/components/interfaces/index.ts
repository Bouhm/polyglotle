export default interface GameResponse {
  _id: string,
  classicAnswer: string,
  messagesAnswer: string
}

export default interface CharacterResponse {
  _id: string,
  name: string,
  weapon: string,
  sex: string,
  faction: string,
  element: string,
  rarity: number
}

export default interface MessageResponse {
  id: number,
  contacts: {
    id: number,
    name: string,
    icon: string,
    signature: string,
    type: string
  },
  relatedMessages: number[],
  startingMessageId: number,
  messages: {
    id: number,
    type: string,
    sender: string,
    senderContactId: number,
    text: string,
    image: string,
    next: number
  }[],
  participatingContactIds: number[]
}