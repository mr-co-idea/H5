import createRequest from `@common/modules/providers/http-service.base`

const request = createRequest(process.env.BASE_URL)

export default request