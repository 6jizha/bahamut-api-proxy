export default async (request, context) => {
  // 处理浏览器的跨域预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, User-Agent'
      }
    });
  }

  const url = new URL(request.url);
  
  // 1. 代理 Bangumi API 请求
  if (url.pathname.startsWith('/api/bangumi/')) {
    const targetUrl = `https://api.bgm.tv${url.pathname.replace('/api/bangumi', '')}${url.search}`;
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: { 'User-Agent': 'XingRong/1.0', 'Content-Type': 'application/json' },
      body: request.body
    });
    
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      headers: headers
    });
  }

  // 2. 代理 Bangumi 图片请求
  if (url.pathname.startsWith('/api/bangumi-img/')) {
    const targetUrl = `https://lain.bgm.tv${url.pathname.replace('/api/bangumi-img', '')}${url.search}`;
    const response = await fetch(targetUrl);
    
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.body, {
      status: response.status,
      headers: headers
    });
  }

  return context.next();
};
