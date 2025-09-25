"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Database, Server, Users, Activity } from "lucide-react";

interface SystemStatus {
  database: boolean;
  supabase: boolean;
  server: boolean;
  userCount?: number;
  lastChecked?: string;
}

export function StatusDashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    database: false,
    supabase: false,
    server: true,
  });
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      // Check Supabase connection
      const supabaseResponse = await fetch("/api/test-supabase");
      const supabaseData = await supabaseResponse.json();
      
      setStatus({
        database: supabaseResponse.ok,
        supabase: supabaseResponse.ok,
        server: true,
        userCount: supabaseData.userCount,
        lastChecked: new Date().toISOString(),
      });
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        database: false,
        supabase: false,
        lastChecked: new Date().toISOString(),
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const StatusIcon = ({ isActive }: { isActive: boolean }) => {
    if (isActive) return <CheckCircle className="h-5 w-5 text-green-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const StatusBadge = ({ isActive }: { isActive: boolean }) => {
    if (isActive) return <Badge className="bg-green-100 text-green-800">Online</Badge>;
    return <Badge variant="destructive">Offline</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">System Status</h2>
          <p className="text-gray-600">Monitor the health of your FitAI application</p>
        </div>
        <Button onClick={checkStatus} disabled={loading}>
          {loading ? "Checking..." : "Refresh Status"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <StatusIcon isActive={status.database} />
              </div>
              <StatusBadge isActive={status.database} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              PostgreSQL via Supabase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supabase</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <StatusIcon isActive={status.supabase} />
              </div>
              <StatusBadge isActive={status.supabase} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Auth & Database Service
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Application</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                <StatusIcon isActive={status.server} />
              </div>
              <StatusBadge isActive={status.server} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Next.js Server
            </p>
          </CardContent>
        </Card>
      </div>

      {status.userCount !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{status.userCount}</div>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {status.database && status.supabase ? "100%" : "0%"}
                </div>
                <p className="text-sm text-gray-600">System Health</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {status.lastChecked && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Last Checked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {new Date(status.lastChecked).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      )}

      {!status.database && !status.supabase && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Connection Issues Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-red-700">
              <p>• Unable to connect to Supabase database</p>
              <p>• Please check your environment variables</p>
              <p>• Verify your Supabase project is active</p>
              <p>• Ensure your database URL is correct</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}