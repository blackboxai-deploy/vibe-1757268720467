import { NextRequest, NextResponse } from 'next/server';

// GET /api/workflows - Get all workflows
export async function GET() {
  try {
    // Mock workflow data - in production this would come from database
    const mockWorkflows = [
      {
        id: 'workflow_1',
        name: 'Q2 Product Launch Strategy',
        description: 'Comprehensive strategy development and execution plan for new product launch.',
        status: 'active',
        priority: 'high',
        assignedTo: ['user_1', 'user_2', 'user_3'],
        dueDate: '2024-03-30',
        progress: 67,
        steps: [
          {
            id: 'step_1',
            name: 'Market Research',
            description: 'Conduct comprehensive market analysis',
            status: 'completed',
            assignedTo: 'user_1',
            dueDate: '2024-02-15',
            dependencies: [],
            estimatedHours: 40,
            actualHours: 42,
          },
          {
            id: 'step_2',
            name: 'Product Positioning',
            description: 'Define product positioning and messaging',
            status: 'in_progress',
            assignedTo: 'user_2',
            dueDate: '2024-02-28',
            dependencies: ['step_1'],
            estimatedHours: 24,
            actualHours: 16,
          }
        ],
        metrics: {
          completionRate: 67,
          averageTimePerStep: 29,
          bottlenecks: ['step_2'],
          efficiency: 92,
          resourceUtilization: 85,
        },
        createdBy: 'user_admin',
        createdAt: '2024-01-15',
        updatedAt: '2024-02-10',
      },
      {
        id: 'workflow_2',
        name: 'Team Performance Review Cycle',
        description: 'AI-driven performance evaluation and feedback compilation system.',
        status: 'active',
        priority: 'medium',
        assignedTo: ['user_1', 'user_4'],
        dueDate: '2024-04-15',
        progress: 89,
        steps: [],
        metrics: {
          completionRate: 89,
          averageTimePerStep: 11,
          bottlenecks: [],
          efficiency: 98,
          resourceUtilization: 92,
        },
        createdBy: 'user_admin',
        createdAt: '2024-01-20',
        updatedAt: '2024-02-12',
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockWorkflows
    });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch workflows'
      },
      { status: 500 }
    );
  }
}

// POST /api/workflows - Create new workflow
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, description'
        },
        { status: 400 }
      );
    }

    // Create new workflow
    const newWorkflow = {
      id: `workflow_${Date.now()}`,
      name: body.name,
      description: body.description,
      status: body.status || 'draft',
      priority: body.priority || 'medium',
      assignedTo: body.assignedTo || [],
      dueDate: body.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      steps: body.steps || [],
      metrics: {
        completionRate: 0,
        averageTimePerStep: 0,
        bottlenecks: [],
        efficiency: 0,
        resourceUtilization: 0,
      },
      createdBy: body.createdBy || 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newWorkflow
    });
  } catch (error) {
    console.error('Error creating workflow:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create workflow'
      },
      { status: 500 }
    );
  }
}