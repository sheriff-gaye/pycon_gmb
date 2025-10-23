import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { speakerSchema } from '@/hooks/speakers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const validatedData = speakerSchema.parse(body);

    const speaker = await db.speaker.create({
      data: {
        name: validatedData.name,
        title: validatedData.title,
        company: validatedData.company!,
        location: validatedData.location,
        image: validatedData.image,
        bio: validatedData.bio,
        expertise: validatedData.expertise,
        isKeynote: validatedData.isKeynote,
        isActive: validatedData.isActive,
        order: validatedData.order,
        sessionTitle: validatedData.sessionTitle,
        sessionDescription: validatedData.sessionDescription,
        sessionDuration: validatedData.sessionDuration,
        sessionTrack: validatedData.sessionTrack,
        sessionLevel: validatedData.sessionLevel,
        linkedin: validatedData.linkedin || null,
        twitter: validatedData.twitter || null,
        github: validatedData.github || null,
      }
    });

    return NextResponse.json({ success: true, data: speaker }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating speaker:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create speaker', message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');
    
    const speakers = await db.speaker.findMany({
      where: isActive ? { isActive: true } : {},
      orderBy: [
        { isKeynote: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({ success: true, data: speakers });
  } catch (error: any) {
    console.error('Error fetching speakers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch speakers' },
      { status: 500 }
    );
  }
}