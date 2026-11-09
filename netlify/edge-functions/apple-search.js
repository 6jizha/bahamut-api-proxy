// Vercel 版 Apple Music 搜索代理
export default async function handler(req, res) {
  // 处理跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const keyword = req.query.keyword;
  const limit = req.query.limit || "20";

  if (!keyword) {
    return res.status(400).json({ error: "Missing keyword" });
  }

  const appleUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(keyword)}&entity=song&limit=${limit}&country=cn`;

  try {
    const response = await fetch(appleUrl);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Proxy fetch failed" });
  }
}
