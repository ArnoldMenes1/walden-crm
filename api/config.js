// Fonction serverless Vercel : expose uniquement l'URL et la clé PUBLIQUE (publishable) de Supabase.
// Ne mettez JAMAIS la clé "secret" / "service_role" dans ces variables.
module.exports = (req, res) => {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ error: "method" });
  if (!url || !key || /secret|service_role/i.test(key)) return res.status(500).json({ error: "config" });
  res.status(200).json({ url, key });
};
