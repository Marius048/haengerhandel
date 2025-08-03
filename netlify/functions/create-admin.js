const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async () => {
  const ADMIN_EMAIL = "grandthaft5@gmx.de";
  const ADMIN_PASSWORD = "Test123";

  // Diesen Token brauchst du aus dem Netlify-Dashboard als „Personal Access Token“!
  const NETLIFY_API_KEY = "nfp_JSuH3fKkd39nMw9kf7W1jADeAjyG677P6942";

  const SITE_ID = "0a30388b-d165-47d4-9c03-27f5b5b6a728"; // Findest du unter Settings → Site Details

  const response = await fetch(
    `https://api.netlify.com/api/v1/sites/${SITE_ID}/identity/users`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        roles: ["admin"]
      })
    }
  );

  const result = await response.json();
  return {
    statusCode: response.status,
    body: JSON.stringify(result)
  };
};

