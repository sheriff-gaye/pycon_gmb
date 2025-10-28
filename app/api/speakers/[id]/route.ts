import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { speakerSchema } from '@/hooks/speakers';

interface Context {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(req: NextRequest, context: Context) {
  try {
    const params = await context.params;
    const body = await req.json();

    // Validate the incoming data
    const validatedData = speakerSchema.parse(body);

    // Check if speaker exists
    const existingSpeaker = await db.speaker.findUnique({
      where: { id: params.id },
    });

    if (!existingSpeaker) {
      return NextResponse.json(
        { success: false, error: 'Speaker not found' },
        { status: 404 }
      );
    }

    // Update the speaker
    const speaker = await db.speaker.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        title: validatedData.title,
        company: validatedData.company || '',
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
      },
    });

    console.log(`Speaker updated successfully: ${speaker.id}`);

    return NextResponse.json({ 
      success: true, 
      data: speaker 
    });

  } catch (error: any) {
    console.error('Error updating speaker:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update speaker', 
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete a speaker by ID
export async function DELETE(req: NextRequest, context: Context) {
  try {
    const params = await context.params;
    
    // Check if speaker exists
    const existingSpeaker = await db.speaker.findUnique({
      where: { id: params.id },
    });

    if (!existingSpeaker) {
      return NextResponse.json(
        { success: false, error: 'Speaker not found' },
        { status: 404 }
      );
    }

    await db.speaker.delete({
      where: { id: params.id },
    });

    console.log(`Speaker deleted successfully: ${params.id}`);

    return NextResponse.json({
      success: true,
      message: 'Speaker deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting speaker:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete speaker', 
        message: error.message 
      },
      { status: 500 }
    );
  }
}