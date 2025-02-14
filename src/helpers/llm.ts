import axios from "axios";

export async function callLLM(note: string) {
  try {
    const response = await axios.post("https://api.google.com/gemini", {
      prompt: `Extract actionable steps from the following medical note:\n\n${note}`,
    });

    return response.data; // Expected to return { checklist: [...], plan: [...] }
  } catch (error) {
    console.error("Error calling LLM:", error);
    return { checklist: [], plan: [] };
  }
}
