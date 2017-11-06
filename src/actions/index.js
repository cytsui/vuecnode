import 'whatwg-fetch'

function getApiUrl(str) {
  return `https://cnodejs.org/api/v1${str}`
}

export function getTopic(params = null) {
  const url = new URL(getApiUrl('/topics'))
  if (params) {
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key])
    })
  }
  return fetch(url).then(res => res.json())
}

export function getTopicDetail(id) {
  const url = new URL(
    getApiUrl(`/topic/${id}?accesstoken=cb382618-a01a-47cd-a5ef-e3c9ccd425d1`)
  )
  return fetch(url).then(res => res.json())
}

// 验证accesstoken
export function verifyAtk(params) {
  const url = getApiUrl(`/accesstoken`)
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  }).then(res => res.json())
}

// 获取用户信息
export function getUserInfo(loginname) {
  const url = getApiUrl(`/user/${loginname}`)
  return fetch(url).then(res => res.json())
}
