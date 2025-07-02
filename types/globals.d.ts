export { };

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "student" | "mentor";
    };
  }
}
