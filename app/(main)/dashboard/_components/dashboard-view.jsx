"use client";

import React, { useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Download,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import html2pdf from 'html2pdf.js';

const DashboardView = ({ insights }) => {
  const dashboardRef = useRef(null);

  const handleDownload = async () => {
    if (!dashboardRef.current) return;

    // Add PDF-specific class to the container
    dashboardRef.current.classList.add('pdf-export');

    const opt = {
      margin: 1,
      filename: 'industry-insights.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(dashboardRef.current).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      // Remove the PDF-specific class after generation
      dashboardRef.current.classList.remove('pdf-export');
    }
  };

  console.log("DashboardView received insights:", insights);

  if (!insights) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading insights...</p>
      </div>
    );
  }

  // Transform salary data for the chart
  const salaryData = insights.salaryRanges?.map((range) => ({
    name: range.role,
    min: range.min,
    max: range.max,
    median: range.median
  })) || [];

  console.log("Transformed salary data:", salaryData);

  const getDemandLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook?.toLowerCase()) {
      case "positive":
      case "growing":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
      case "stable":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
      case "declining":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  // Format dates using date-fns with error handling
  const lastUpdatedDate = insights.lastUpdated 
    ? format(new Date(insights.lastUpdated), "dd/MM/yyyy")
    : "Not available";
    
  const nextUpdateDistance = insights.nextUpdate
    ? formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true })
    : "Not available";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
        <Button onClick={handleDownload} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      <div ref={dashboardRef} className="pdf-container">
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Market Outlook
              </CardTitle>
              <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.marketOutlook || "N/A"}</div>
              <p className="text-xs text-muted-foreground">
                Next update {nextUpdateDistance}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Industry Growth
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof insights.growthRate === 'number' ? `${insights.growthRate.toFixed(1)}%` : 'N/A'}
              </div>
              <Progress value={insights.growthRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.demandLevel || "N/A"}</div>
              <div
                className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                  insights.demandLevel
                )}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {insights.topSkills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                )) || "No skills data"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Salary Ranges Chart */}
        {salaryData.length > 0 && (
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Salary Ranges by Role</CardTitle>
              <CardDescription>
                Displaying minimum and maximum salaries (in thousands)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border rounded-lg p-2 shadow-md">
                              <p className="font-medium">{label}</p>
                              {payload.map((item) => (
                                <p key={item.name} className="text-sm">
                                  {item.name}: ${item.value}K
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
                    <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Industry Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Industry Trends</CardTitle>
              <CardDescription>
                Current trends shaping the industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {insights.keyTrends?.map((trend, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <span>{trend}</span>
                  </li>
                )) || "No trends data"}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
              <CardDescription>Skills to consider developing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills?.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                )) || "No recommendations data"}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .pdf-container {
          background: white;
        }
        
        .pdf-export {
          background: white !important;
        }
        
        .pdf-export * {
          color: #000000 !important;
        }
        
        .pdf-export .bg-primary {
          background-color: #3b82f6 !important;
        }
        
        .pdf-export .bg-green-500 {
          background-color: #22c55e !important;
        }
        
        .pdf-export .bg-yellow-500 {
          background-color: #eab308 !important;
        }
        
        .pdf-export .bg-red-500 {
          background-color: #ef4444 !important;
        }
        
        .pdf-export .bg-gray-500 {
          background-color: #6b7280 !important;
        }
        
        .pdf-export .text-green-500 {
          color: #22c55e !important;
        }
        
        .pdf-export .text-yellow-500 {
          color: #eab308 !important;
        }
        
        .pdf-export .text-red-500 {
          color: #ef4444 !important;
        }
        
        .pdf-export .text-gray-500 {
          color: #6b7280 !important;
        }
      `}</style>
    </div>
  );
};

export default DashboardView;