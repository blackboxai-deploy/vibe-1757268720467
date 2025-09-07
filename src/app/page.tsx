"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Dashboard() {
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarAction, setSidebarAction] = useState("");
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [billingDialogOpen, setBillingDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  // Mock data states
  const [workflows, setWorkflows] = useState([
    {
      id: "workflow_1",
      name: "Q2 Product Launch Strategy",
      description: "Comprehensive strategy development and execution plan for new product launch.",
      status: "active",
      progress: 67,
      dueDate: "Mar 30, 2024"
    },
    {
      id: "workflow_2", 
      name: "Team Performance Review Cycle",
      description: "AI-driven performance evaluation and feedback compilation system.",
      status: "active",
      progress: 89,
      dueDate: "Apr 15, 2024"
    }
  ]);

  const [insights] = useState([
    {
      id: "insight_1",
      category: "opportunity",
      title: "Resource Optimization Opportunity",
      description: "Analysis shows 15% efficiency gain possible by redistributing Team A workload to Q2.",
      priority: "High Impact",
      time: "2 hours ago"
    },
    {
      id: "insight_2",
      category: "risk", 
      title: "Deadline Risk Alert",
      description: "Project Alpha timeline shows 23% risk of delay. Recommend resource reallocation.",
      priority: "Risk",
      time: "4 hours ago"
    },
    {
      id: "insight_3",
      category: "success",
      title: "Strategic Milestone Achieved", 
      description: "Q1 objectives exceeded by 112%. Automated report generated and stakeholders notified.",
      priority: "Success",
      time: "1 day ago"
    }
  ]);

  // Interactive handlers
  const handleSidebarAction = (action: string) => {
    setSidebarAction(action);
    
    switch(action) {
      case "strategic-plan":
        setIsCreatingWorkflow(true);
        toast.success("Opening Strategic Plan Creator...");
        setTimeout(() => {
          setIsCreatingWorkflow(false);
          toast.success("Strategic Plan template loaded successfully!");
        }, 2000);
        break;
        
      case "generate-report":
        setIsGeneratingReport(true);
        toast.success("Generating AI-powered report...");
        setTimeout(() => {
          setIsGeneratingReport(false);
          toast.success("Executive Report generated and ready for review!");
        }, 3000);
        break;
        
      case "create-workflow":
        toast.success("Workflow Creator opened!");
        const newWorkflow = {
          id: `workflow_${Date.now()}`,
          name: "New Strategic Initiative",
          description: "AI-generated workflow for strategic planning",
          status: "draft",
          progress: 0,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
        };
        setWorkflows(prev => [...prev, newWorkflow]);
        setActiveTab("workflows");
        break;
        
      case "team-communication":
        toast.success("Communication Hub activated!");
        setActiveTab("communication");
        break;
        
      default:
        toast.info(`${action} feature activated`);
    }
  };

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected!`);
  };

  const handleBillingAction = (action: string) => {
    switch(action) {
      case "view-history":
        setBillingDialogOpen(true);
        toast.success("Loading billing history...");
        break;
      case "update-payment":
        setPaymentDialogOpen(true);
        toast.success("Payment method update opened");
        break;
      default:
        toast.info(`${action} processed`);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    toast.success(`Switched to ${tab.charAt(0).toUpperCase() + tab.slice(1)} view`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Chief of Staff AI</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Executive Assistant Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors">
              ✓ Active Subscription
            </Badge>
            <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
              <AvatarFallback className="bg-blue-100 text-blue-700">COS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Interactive Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start hover:bg-blue-600 transition-colors" 
                  variant="default"
                  onClick={() => handleSidebarAction("strategic-plan")}
                  disabled={isCreatingWorkflow}
                >
                  {isCreatingWorkflow ? "Creating..." : "+ New Strategic Plan"}
                </Button>
                
                <Button 
                  className="w-full justify-start hover:bg-slate-100 transition-colors" 
                  variant="outline"
                  onClick={() => handleSidebarAction("generate-report")}
                  disabled={isGeneratingReport}
                >
                  {isGeneratingReport ? "Generating..." : "📊 Generate Report"}
                </Button>
                
                <Button 
                  className="w-full justify-start hover:bg-slate-100 transition-colors" 
                  variant="outline"
                  onClick={() => handleSidebarAction("create-workflow")}
                >
                  🎯 Create Workflow
                </Button>
                
                <Button 
                  className="w-full justify-start hover:bg-slate-100 transition-colors" 
                  variant="outline"
                  onClick={() => handleSidebarAction("team-communication")}
                >
                  💬 Team Communication
                </Button>
                
                <Separator />
                
                <div className="text-sm space-y-2">
                  <p className="font-medium text-slate-700 dark:text-slate-300">AI Capabilities</p>
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                      ✓ Strategic Analysis
                    </div>
                    <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                      ✓ Workflow Automation
                    </div>
                    <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                      ✓ Resource Optimization
                    </div>
                    <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                      ✓ Risk Assessment
                    </div>
                    <div className="flex items-center hover:text-blue-600 cursor-pointer transition-colors">
                      ✓ Performance Tracking
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content with Interactive Tabs */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-800">
                <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="workflows" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Workflows
                </TabsTrigger>
                <TabsTrigger value="strategy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Strategy
                </TabsTrigger>
                <TabsTrigger value="communication" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Communication
                </TabsTrigger>
                <TabsTrigger value="billing" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Billing
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardDescription>Active Workflows</CardDescription>
                      <CardTitle className="text-3xl font-bold text-blue-600">{workflows.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-green-600">
                        ↗ +12% from last month
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardDescription>Task Completion Rate</CardDescription>
                      <CardTitle className="text-3xl font-bold text-green-600">94%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={94} className="h-2" />
                      <div className="flex items-center text-sm text-green-600 mt-2">
                        ↗ +5% improvement
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardDescription>Strategic Initiatives</CardDescription>
                      <CardTitle className="text-3xl font-bold text-purple-600">8</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-slate-600">
                        3 completed, 5 in progress
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent AI Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent AI Insights & Recommendations</CardTitle>
                    <CardDescription>Proactive analysis and strategic recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {insights.map((insight) => (
                      <div 
                        key={insight.id}
                        className={`border-l-4 pl-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors rounded-r ${
                          insight.category === 'opportunity' ? 'border-blue-500' :
                          insight.category === 'risk' ? 'border-yellow-500' : 'border-green-500'
                        }`}
                      >
                        <p className="font-medium text-slate-900 dark:text-white">{insight.title}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{insight.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge 
                            variant={insight.category === 'risk' ? 'destructive' : 
                                   insight.category === 'opportunity' ? 'secondary' : 'outline'}
                            className={insight.category === 'success' ? 'text-green-700 border-green-200' : ''}
                          >
                            {insight.priority}
                          </Badge>
                          <span className="text-xs text-slate-500">{insight.time}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Workflow Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Strategic Planning</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Task Execution</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Communication</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Team Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Engineering Team</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">On Track</span>
                      </div>
                      
                      <div className="flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Marketing Team</span>
                        </div>
                        <span className="text-sm font-medium text-yellow-600">At Risk</span>
                      </div>
                      
                      <div className="flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Operations Team</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600">Ahead</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Interactive Workflows Tab */}
              <TabsContent value="workflows" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Workflows</CardTitle>
                    <CardDescription>AI-managed workflow orchestration and execution tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workflows.map((workflow) => (
                        <div 
                          key={workflow.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{workflow.name}</h3>
                            <Badge className={`${
                              workflow.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                              workflow.status === 'draft' ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{workflow.description}</p>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <Progress value={workflow.progress} className="w-32 h-2 inline-block mr-2" />
                              <span>{workflow.progress}% Complete</span>
                            </div>
                            <span className="text-sm text-slate-500">Due: {workflow.dueDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interactive Strategy Tab */}
              <TabsContent value="strategy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategic Analysis & Planning</CardTitle>
                    <CardDescription>AI-powered strategic insights and decision support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Market Opportunity Analysis</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                          AI analysis identifies 32% growth opportunity in target market segment. Recommend resource allocation adjustment.
                        </p>
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 transition-colors"
                          onClick={() => toast.success("Detailed analysis loaded!")}
                        >
                          View Detailed Analysis
                        </Button>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-950 border-l-4 border-purple-500 p-4 rounded hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Competitive Intelligence</h3>
                        <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                          Competitor analysis shows strategic vulnerability in Q3. Actionable recommendations available.
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-purple-300 text-purple-700 hover:bg-purple-100 transition-colors"
                          onClick={() => toast.success("Action plan generated!")}
                        >
                          Generate Action Plan
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interactive Communication Tab */}
              <TabsContent value="communication" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Hub</CardTitle>
                    <CardDescription>Centralized team coordination and stakeholder management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
                        <div>
                          <p className="font-medium">Board Meeting Preparation</p>
                          <p className="text-sm text-slate-600">Automated agenda compilation and briefing materials</p>
                        </div>
                        <Badge 
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors cursor-pointer"
                          onClick={() => toast.success("Board meeting materials prepared!")}
                        >
                          Scheduled
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all">
                        <div>
                          <p className="font-medium">Stakeholder Updates</p>
                          <p className="text-sm text-slate-600">Weekly progress reports distributed automatically</p>
                        </div>
                        <Badge 
                          className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer"
                          onClick={() => toast.success("Stakeholder reports sent successfully!")}
                        >
                          Sent
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Interactive Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Plan */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Subscription</CardTitle>
                      <CardDescription>Professional Plan - Active</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Plan:</span>
                        <span className="font-medium">Professional</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Billing:</span>
                        <span className="font-medium">$299/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next billing:</span>
                        <span className="font-medium">Apr 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment method:</span>
                        <span className="font-medium">PayPal •••• 4567</span>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Button 
                          className="w-full hover:bg-blue-600 transition-colors" 
                          variant="outline"
                          onClick={() => handleBillingAction("view-history")}
                        >
                          View Billing History
                        </Button>
                        <Button 
                          className="w-full hover:bg-blue-600 transition-colors" 
                          variant="outline"
                          onClick={() => handleBillingAction("update-payment")}
                        >
                          Update Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Usage Analytics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Usage Analytics</CardTitle>
                      <CardDescription>Current month utilization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>AI Analysis Requests</span>
                          <span>847 / 1000</span>
                        </div>
                        <Progress value={84.7} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Workflow Automations</span>
                          <span>23 / 50</span>
                        </div>
                        <Progress value={46} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Strategic Reports</span>
                          <span>12 / 25</span>
                        </div>
                        <Progress value={48} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Interactive Pricing Plans */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>Choose the plan that fits your executive needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Starter Plan */}
                      <div className={`border-2 rounded-lg p-6 transition-all cursor-pointer hover:shadow-lg ${
                        selectedPlan === 'starter' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 scale-105' : 'border-slate-200 hover:border-blue-300'
                      }`}>
                        <div className="text-center">
                          <h3 className="text-lg font-medium">Starter</h3>
                          <div className="mt-4 mb-6">
                            <span className="text-4xl font-bold">$99</span>
                            <span className="text-slate-600">/month</span>
                          </div>
                          <ul className="text-sm space-y-2 mb-6 text-left">
                            <li>✓ Basic AI Analysis</li>
                            <li>✓ 10 Workflows</li>
                            <li>✓ Email Support</li>
                            <li>✓ Basic Reporting</li>
                          </ul>
                          <Button 
                            className="w-full transition-colors" 
                            variant={selectedPlan === 'starter' ? 'default' : 'outline'}
                            onClick={() => handlePlanSelection('starter')}
                          >
                            {selectedPlan === 'starter' ? 'Current Plan' : 'Select Plan'}
                          </Button>
                        </div>
                      </div>

                      {/* Professional Plan */}
                      <div className={`border-2 rounded-lg p-6 relative transition-all cursor-pointer hover:shadow-lg ${
                        selectedPlan === 'professional' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 scale-105' : 'border-slate-200 hover:border-blue-300'
                      }`}>
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 transition-colors">
                          Most Popular
                        </Badge>
                        <div className="text-center">
                          <h3 className="text-lg font-medium">Professional</h3>
                          <div className="mt-4 mb-6">
                            <span className="text-4xl font-bold">$299</span>
                            <span className="text-slate-600">/month</span>
                          </div>
                          <ul className="text-sm space-y-2 mb-6 text-left">
                            <li>✓ Advanced AI Analysis</li>
                            <li>✓ 50 Workflows</li>
                            <li>✓ Priority Support</li>
                            <li>✓ Advanced Reporting</li>
                            <li>✓ Strategic Planning</li>
                            <li>✓ API Integrations</li>
                          </ul>
                          <Button 
                            className="w-full transition-colors" 
                            variant={selectedPlan === 'professional' ? 'default' : 'outline'}
                            onClick={() => handlePlanSelection('professional')}
                          >
                            Current Plan ✓
                          </Button>
                        </div>
                      </div>

                      {/* Enterprise Plan */}
                      <div className={`border-2 rounded-lg p-6 transition-all cursor-pointer hover:shadow-lg ${
                        selectedPlan === 'enterprise' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 scale-105' : 'border-slate-200 hover:border-blue-300'
                      }`}>
                        <div className="text-center">
                          <h3 className="text-lg font-medium">Enterprise</h3>
                          <div className="mt-4 mb-6">
                            <span className="text-4xl font-bold">$699</span>
                            <span className="text-slate-600">/month</span>
                          </div>
                          <ul className="text-sm space-y-2 mb-6 text-left">
                            <li>✓ Enterprise AI Suite</li>
                            <li>✓ Unlimited Workflows</li>
                            <li>✓ 24/7 Dedicated Support</li>
                            <li>✓ Custom Integrations</li>
                            <li>✓ Advanced Security</li>
                            <li>✓ Custom Training</li>
                          </ul>
                          <Button 
                            className="w-full transition-colors" 
                            variant={selectedPlan === 'enterprise' ? 'default' : 'outline'}
                            onClick={() => handlePlanSelection('enterprise')}
                          >
                            {selectedPlan === 'enterprise' ? 'Current Plan' : 'Upgrade'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Interactive Billing History Dialog */}
      <Dialog open={billingDialogOpen} onOpenChange={setBillingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Billing History</DialogTitle>
            <DialogDescription>
              Your recent payment transactions and invoices
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border rounded p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">March 2024 - Professional Plan</p>
                  <p className="text-sm text-gray-600">Paid via PayPal</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$299.00</p>
                  <Badge className="bg-green-100 text-green-700">Paid</Badge>
                </div>
              </div>
            </div>
            <div className="border rounded p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">February 2024 - Professional Plan</p>
                  <p className="text-sm text-gray-600">Paid via PayPal</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$299.00</p>
                  <Badge className="bg-green-100 text-green-700">Paid</Badge>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={() => setBillingDialogOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      {/* Interactive Payment Method Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Method</DialogTitle>
            <DialogDescription>
              Change your billing information and payment method
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="user@company.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="credit">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={() => {
                setPaymentDialogOpen(false);
                toast.success("Payment method updated successfully!");
              }}
            >
              Update Payment Method
            </Button>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}