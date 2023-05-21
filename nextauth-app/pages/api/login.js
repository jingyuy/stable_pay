export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  // Perform authentication logic here...

  // If authentication succeeds, set a session cookie
  return res.status(200).json({ message: "Login successful", user: email });
}
