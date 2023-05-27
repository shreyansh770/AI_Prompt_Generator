import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const oldPrompt = await Prompt.findById(params.id);


    if (!oldPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    oldPrompt.prompt = prompt;
    oldPrompt.tag = tag;

    await oldPrompt.save();
    return new Response(oldPrompt, { status: 201 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};


export const DELETE = async (request , {params})=>{

    try {

        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt deleted successfully", { status: 200 });
        
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}
