/**
 * Capability classification for auth-sensitive access control.
 * public: browsing allowed without token
 * identity: requires token but not sensitive ownership
 * private: requires authenticated user and sensitive actions
 */
export type AuthCapability = "public" | "identity" | "private";
