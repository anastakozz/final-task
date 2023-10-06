export enum CardsPerPage {
  home = 6,
  limit = 9,
  default = 20
}

export enum CardMessage {
  inCart = 'Already in Cart',
  toCart = 'Add to Cart',
  inProgress = '...Sending to Cart...'
}

export enum RemoveMessage {
  inCart = 'Remove from Cart',
  inProgress = '...Removing...'
}

export enum tokenNames {
  userToken = 'userToken',
  userTokenRefresh = 'userTokenRefresh',
  anonymous = 'anonymousToken',
  anonymousRefresh = 'anonymousTokenRefresh'
}
