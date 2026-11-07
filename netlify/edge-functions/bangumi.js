export default async (request, context) => {
  const url = new URL(request.url);
  
  // 1. 代理 Bangumi API 请求
  if (url.pathname.startsWith('/api/bangumi/')) {
    const targetUrl = `https://api.bgm.tv${url.pathname.replace('/api/bangumi', '')}${url.search}`;
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: { 'User-Agent': 'XingRong/1.0', 'Content-Type': 'application/json' },
      body: request.body
    });
    return new Response(response.body, {
      status: response.status,
      headers: { ...response.headers, 'Access-Control-Allow-Origin': '*' }
    });
  }

  // 2. 代理 Bangumi 图片请求（加速封面）
  if (url.pathname.startsWith('/api/bangumi-img/')) {
    const targetUrl = `https://lain.bgm.tv${url.pathname.replace('/api/bangumi-img', '')}${url.search}`;
    const response = await fetch(targetUrl);
    return new Response(response.body, {
      status: response.status,
      headers: { ...response.headers, 'Access-Control-Allow-Origin': '*' }
    });
  }

  // 其他请求正常放行
  return context.next();
};
