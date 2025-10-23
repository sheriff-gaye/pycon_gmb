"use server";

import { db } from "@/lib/db";

export async function getAllSpeakers() {
  try {
    const speakers = await db.speaker.findMany({
      orderBy: [
        { isKeynote: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    const serializedSpeakers = speakers.map(speaker => ({
      ...speaker,
      createdAt: speaker.createdAt,
      updatedAt: speaker.updatedAt
    }));

    return { 
      success: true, 
      data: serializedSpeakers,
      count: serializedSpeakers.length 
    };
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return { 
      success: false, 
      error: "Failed to fetch speakers",
      data: [],
      count: 0
    };
  }
}

export async function getActiveSpeakers() {
  try {
    const speakers = await db.speaker.findMany({
      where: {
        isActive: true
      },
      orderBy: [
        { isKeynote: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    
    const serializedSpeakers = speakers.map(speaker => ({
      ...speaker,
      createdAt: speaker.createdAt,
      updatedAt: speaker.updatedAt
    }));

    return {
      success: true,
      data: serializedSpeakers,
      count: serializedSpeakers.length
    };
  } catch (error) {
    console.error("Error fetching active speakers:", error);
    return {
      success: false,
      error: "Failed to fetch active speakers",
      data: [],
      count: 0
    };
  }
}

export async function getKeynoteSpeakers() {
  try {
    const speakers = await db.speaker.findMany({
      where: {
        isActive: true,
        isKeynote: true
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return {
      success: true,
      data: speakers,
      count: speakers.length
    };
  } catch (error) {
    console.error("Error fetching keynote speakers:", error);
    return {
      success: false,
      error: "Failed to fetch keynote speakers",
      data: [],
      count: 0
    };
  }
}

export async function getSpeakersByTrack(track: string) {
  try {
    const speakers = await db.speaker.findMany({
      where: {
        isActive: true,
        sessionTrack: track
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return {
      success: true,
      data: speakers,
      count: speakers.length
    };
  } catch (error) {
    console.error("Error fetching speakers by track:", error);
    return {
      success: false,
      error: "Failed to fetch speakers",
      data: [],
      count: 0
    };
  }
}

export async function getActiveSpeakersCount() {
  try {
    return await db.speaker.count({
      where: {
        isActive: true
      }
    });
  } catch (error) {
    console.error("Error counting speakers:", error);
    return 0;
  }
}