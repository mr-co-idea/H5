import createRequest from `@resources/providers/http-service.base`

const request = createRequest(process.env.BASE_URL)

export default request