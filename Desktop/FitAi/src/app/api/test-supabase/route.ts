import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  try {
    console.log("Testing Supabase connection...");
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Service key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    
    // Test connection by getting a simple user count
    const { data, error, count } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Supabase connection error:", error);
      return NextResponse.json({ 
        error: "Connection failed", 
        details: error.message 
      }, { status: 500 });
    }
    
    console.log("Supabase connection successful!");
    console.log("User count:", count);
    
    return NextResponse.json({ 
      success: true, 
      message: "Supabase connection successful",
      userCount: count,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Test route error:", error);
    return NextResponse.json({ 
      error: "Server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}