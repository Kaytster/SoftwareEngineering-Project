import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/db";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";