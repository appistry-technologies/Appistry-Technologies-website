import {requireAdmin} from "@/lib/server-cms";
export const runtime="nodejs";
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        await requireAdmin(clientPayload || "");
        return {
          maximumSizeInBytes: 5 * 1024 * 1024,
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
          // optional payload you can pass to the onUploadCompleted hook
          tokenPayload: JSON.stringify({
            // user: decodedToken.uid
          }),
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
