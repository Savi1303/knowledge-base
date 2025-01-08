import { NextRequest, NextResponse } from 'next/server';
import supabase from '../../../pages/supabase/Config/supabase';

interface RequestBody {
  interaction_id: string;
  vapi: string;
  campaign_id: string;
  company_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as RequestBody;
    
    if (!body.interaction_id?.trim()) {
      return NextResponse.json({ error: 'Interaction ID is required and must be a non-empty string' }, { status: 400 });
    }
    // if (!body.company_id?.trim()) {
    //   return NextResponse.json({ error: 'Company ID is required and must be a non-empty string' }, { status: 400 });
    // }

    const { data, error } = await supabase.schema('camieai')
      .from('ai_interaction')
      .insert([{ 
        interaction_id: body.interaction_id,
        vapi: body.vapi,
        campaign_id: body.campaign_id,
        company_id: body.company_id
      }]);

    if (error) {
      console.error('Database error:', error.message);
      return NextResponse.json({ error: 'Failed to insert data into the database' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Data inserted successfully', data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase.schema('camieai').from('ai_interaction').select('*')
  
    if (error) {
      console.error('Database error:', error.message);
      return NextResponse.json({ error: 'Failed to fetch data from the database' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
