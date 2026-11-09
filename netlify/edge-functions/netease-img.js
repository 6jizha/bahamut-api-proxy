// 网易云图片代理，绕过防盗链
export default async (request, context) => {
  const url = new URL(request.url);
  const imgUrl = url.searchParams.get("url");

  if (!imgUrl) {
    return new Response("Missing url", { status: 400 });
  }

  try {
    // 伪装成浏览器去请求图片，带上网易云的 Referer
    const response = await fetch(imgUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://music.163.com/"
      }
    });

    const blob = await response.blob();
    
    return new Response(blob, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch (error) {
    return new Response("Fetch failed", { status: 500 });
  }
};
