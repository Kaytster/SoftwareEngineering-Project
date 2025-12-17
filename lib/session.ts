"use server"

import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

const cookie = {
  name: "loginSession",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 1000 * 60 * 30, // 30 mins
}

interface LoginPayload extends JWTPayload {
  userId: string,
  userRole: string
}

export async function encryptCookie(payload: LoginPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30 mins")
    .sign(secretKey);
}

export async function decryptCookie(encryptedCookie: string | Uint8Array): Promise<LoginPayload | null> {
  try {
    const { payload, protectedHeader } = await jwtVerify(encryptedCookie, secretKey, {
      algorithms: ["HS256"]
    })
    return payload as LoginPayload;
  } catch (err) {
    return null;
  }
}

export async function createSession(userId: string, userRole: string) {
  try {
    const expires = Date.now() + cookie.duration;
    const encryptedCookie = await encryptCookie({ userId, userRole });

    const cookieStore = await cookies();
    cookieStore.set(cookie.name, encryptedCookie, { httpOnly: true, secure: true, expires, sameSite: "lax" });
    return true
  } catch (err) {
    return null
  }
}

export async function verifySession(): Promise<LoginPayload | false | null> {
  const cookieStore = await cookies();
  const encryptedCookie = cookieStore.get(cookie.name)?.value

  // no cookie =(
  if (!encryptedCookie) {
    return null
  }

  const res = await decryptCookie(encryptedCookie);

  if (!res) {
    return false
  } else {
    return { userId: res.userId, userRole: res.userRole }
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookie.name);
    return true;
  } catch (err) {
    return null
  }
}
