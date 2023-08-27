import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// API response limit
export const config = {
  api: {
    responseLimit: false,
  },
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body.prompt);

  const prompt = body.prompt;

  try {
    const res = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = res.data[0].b64_json;

    return NextResponse.json({ photo: image });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
