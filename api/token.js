const { RtcTokenBuilder, RtcRole } = require("agora-token");

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const appId = process.env.AGORA_APP_ID;
  const cert = process.env.AGORA_APP_CERT;
  if (!appId || !cert) return res.status(500).json({ error: "env missing" });

  const channel = req.query.channel;
  if (!channel) return res.status(400).json({ error: "channel required" });

  const expire = Math.floor(Date.now() / 1000) + 86400;
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId, cert, channel, 0, RtcRole.PUBLISHER, expire, expire
  );
  res.status(200).json({ token });
};
