const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.handler = async () => {
  const ADMIN_EMAIL = "grandthaft5@gmx.de";
  const ADMIN_PASSWORD = "Test123";
  const NETLIFY_API_KEY = "nfp_1nqB1k5sKAnPhvvgVp8bFG8LeiZXMt3ne3ec";
  const SITE_ID = "0a30388b-d165-47d4-9c03-27f5b5b6a728";

  try {
    // Schritt 1: Benutzer anlegen
    const createUser = await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/identity/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NETLIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: ADMIN_EMAIL })
    });

    const userData = await createUser.json();
    const userId = userData.id;

    if (!userId) throw new Error("Benutzer konnte nicht erstellt werden");

    // Schritt 2: Passwort setzen
    await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/identity/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${NETLIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password: ADMIN_PASSWORD })
    });

    // Schritt 3: Rolle setzen
    await fetch(`https://api.netlify.com/api/v1/sites/${SITE_ID}/identity/users/${userId}/roles`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${NETLIFY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(["admin"])
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Admin erfolgreich erstellt!", userId })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
