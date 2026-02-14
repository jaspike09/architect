import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const maxDuration = 30; // Allows for deeper "Architect" thinking

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key Missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `You are the Sovereign Architect. 
      Your mission is to pivot user ideas into high-margin $39/mo digital products.
      You must respond in a way that provides clear directives for three distinct roles.
      BE BLUNT, ROI-FOCUSED, AND STRATEGIC.`
    });

    // 1. Get the Architect's Main Directive
    const architectResult = await model.generateContent(
      `ACT AS THE MASTER ARCHITECT: 
      Audit this idea: "${prompt}". 
      If it is low-leverage (physical goods, low margins), force a PIVOT to a $39/mo digital offer. 
      Provide a high-level 30-day roadmap with 4 weekly sprints.`
    );

    // 2. Get the Board Member Perspectives
    const boardResult = await model.generateContent(
      `Based on the mission "${prompt}", provide two brief, sharp insights:
      1. THE MENTOR: A warning about potential failure and how to avoid it.
      2. THE COACH: A viral acquisition strategy to get the first 10 customers.
      Format your response exactly like this:
      MENTOR: [insight]
      COACH: [insight]`
    );

    const boardText = boardResult.response.text();
    
    // Simple parsing for the UI
    const mentorInsight = boardText.split("COACH:")[0].replace("MENTOR:", "").trim();
    const coachInsight = boardText.split("COACH:")[1]?.trim() || "Strategy pending...";

    return NextResponse.json({
      architect: architectResult.response.text(),
      board: [
        { name: "THE MENTOR", text: mentorInsight },
        { name: "THE COACH", text: coachInsight }
      ]
    });

  } catch (error: any) {
    console.error("Architect Error:", error);
    return NextResponse.json({ error: "System recalibrating..." }, { status: 500 });
  }
}
