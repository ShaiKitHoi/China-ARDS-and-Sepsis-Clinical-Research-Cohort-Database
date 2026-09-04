const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

function withTimeout(ms = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { controller, timer };
}

function normalizeCategory(input) {
  const value = String(input || "").trim();
  if (value === "综述" || value === "临床研究" || value === "基础研究") return value;
  return "临床研究";
}

function safeParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = String(text || "").match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "DEEPSEEK_API_KEY is missing" });
    return;
  }

  const { title = "", abstract = "" } = req.body || {};
  const systemPrompt = "你是一个医学文献助手。请根据文章的标题和摘要，将其分类为'综述'、'临床研究'或'基础研究'，并将摘要翻译成简体中文。严格按以下 JSON 格式返回，不要包含任何其他文字：{\"category\": \"综述|临床研究|基础研究\", \"chinese_abstract\": \"翻译后的中文摘要\"}";
  const userPrompt = `标题：${title}\n摘要：${abstract}`;

  const { controller, timer } = withTimeout(20000);
  try {
    const upstream = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      }),
      signal: controller.signal
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      res.status(503).json({ error: `DeepSeek upstream error: ${upstream.status}`, detail: text.slice(0, 500) });
      return;
    }

    const data = await upstream.json();
    const rawContent = data?.choices?.[0]?.message?.content || "";
    const parsed = safeParseJSON(rawContent);
    const category = normalizeCategory(parsed?.category);
    const chinese_abstract = String(parsed?.chinese_abstract || "").trim();

    res.status(200).json({
      category,
      chinese_abstract
    });
  } catch (error) {
    const message = error?.name === "AbortError" ? "DeepSeek request timeout" : (error?.message || "Unknown error");
    res.status(503).json({ error: message });
  } finally {
    clearTimeout(timer);
  }
}

