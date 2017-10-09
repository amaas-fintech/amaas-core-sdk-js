const endpoint = {
  dev: 'https://api-dev.amaas.com',
  staging: 'https://api-staging.amaas.com',
  prod: 'https://api.amaas.com'
}

const userPoolConfig = {
  dev: {
    userPoolId: 'ap-southeast-1_De6j7TWIB',
    clientAppId: '2qk35mhjjpk165vssuqhqoi1lk'
  },
  staging: {
    userPoolId: 'ap-southeast-1_De6j7TWIB',
    clientAppId: '2qk35mhjjpk165vssuqhqoi1lk'
  },
  prod: {
    userPoolId: 'ap-southeast-1_0LilJdUR3',
    clientAppId: '6rn18a293mgnvgcfcepsqhr4a4'
  }
}

export { endpoint, userPoolConfig }
