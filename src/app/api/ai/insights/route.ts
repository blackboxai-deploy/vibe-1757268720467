import { NextRequest, NextResponse } from 'next/server';

// GET /api/ai/insights - Get recent insights (mock data for now)
export async function GET() {
  try {
    // Mock insights data - in production this would come from database and AI service
    const mockInsights = [
      {
        id: 'insight_1',
        category: 'opportunity',
        title: 'Resource Optimization Opportunity',
        description: 'Analysis shows 15% efficiency gain possible by redistributing Team A workload to Q2.',
        confidence: 0.85,
        impact: 'high',
        actionable: true,
        suggestedActions: ['Review Team A capacity', 'Redistribute Q2 workload'],
        dataPoints: { team: 'A', efficiency: 85 },
        generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 'insight_2', 
        category: 'risk',
        title: 'Deadline Risk Alert',
        description: 'Project Alpha timeline shows 23% risk of delay. Recommend resource reallocation.',
        confidence: 0.77,
        impact: 'high',
        actionable: true,
        suggestedActions: ['Reallocate resources to Project Alpha', 'Review project timeline'],
        dataPoints: { project: 'Alpha', riskLevel: 0.23 },
        generatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
      },
      {
        id: 'insight_3',
        category: 'optimization',
        title: 'Strategic Milestone Achieved', 
        description: 'Q1 objectives exceeded by 112%. Automated report generated and stakeholders notified.',
        confidence: 1.0,
        impact: 'medium',
        actionable: false,
        suggestedActions: [],
        dataPoints: { quarter: 'Q1', achievement: 1.12 },
        generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockInsights
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch insights'
      },
      { status: 500 }
    );
  }
}

// POST /api/ai/insights - Generate proactive insights
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.systemData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field: systemData'
        },
        { status: 400 }
      );
    }

    // Mock AI insight generation - in production this would call actual AI service
    const generatedInsight = {
      id: `insight_${Date.now()}`,
      category: 'analysis',
      title: 'System Analysis Complete',
      description: 'AI analysis of provided system data has identified key optimization opportunities.',
      confidence: 0.82,
      impact: 'medium',
      actionable: true,
      suggestedActions: ['Review system metrics', 'Implement suggested optimizations'],
      dataPoints: body.systemData,
      generatedAt: new Date()
    };

    return NextResponse.json({
      success: true,
      data: generatedInsight
    });
  } catch (error) {
    console.error('Error generating insights:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate insights'
      },
      { status: 500 }
    );
  }
}