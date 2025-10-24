import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function validateAuth(request: NextRequest) {
  const authHeader = request.headers.get("authorization") || "";
  const jwt = authHeader.replace("Bearer ", "").trim();
  
  if (!jwt) {
    return { error: "missing_token", status: 401 };
  }

  try {
    // Validar o JWT com o Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(jwt);
    
    if (error || !user) {
      return { error: "invalid_token", status: 401 };
    }

    // Garantir que o usuário existe no nosso banco
    await ensureUserInDatabase(user);
    
    return { userId: user.id };
  } catch (error) {
    console.error("Error validating auth:", error);
    return { error: "invalid_token", status: 401 };
  }
}

async function ensureUserInDatabase(supabaseUser: any) {
  try {
    // Verificar se o usuário já existe no nosso banco
    const existingUser = await db.user.findUnique({
      where: { id: supabaseUser.id }
    });

    if (!existingUser) {
      // Criar usuário no nosso banco
      await db.user.create({
        data: {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0]
        }
      });
    }
  } catch (error) {
    console.error("Error ensuring user in database:", error);
  }
}

export async function checkSubscription(userId: string) {
  try {
    const subscription = await db.subscription.findFirst({
      where: {
        userId,
        status: "active",
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      }
    });

    return !!subscription;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}