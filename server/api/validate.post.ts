export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const captchaToken = body?.captchaToken
  if (!captchaToken) {
    throw createError({ status: 400, statusText: 'Captcha token required' })
  }

  const verify = await fetch('https://smartcaptcha.cloud.yandex.ru/validate', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: config.smartCaptchaSecret,
      token: captchaToken
    }).toString()
  })

  const result = (await verify.json()) as { status?: string }

  if (!verify.ok || result.status !== 'ok') {
    throw createError({ status: 403, statusText: 'Captcha validation failed' })
  }

  return { ok: true }
})
