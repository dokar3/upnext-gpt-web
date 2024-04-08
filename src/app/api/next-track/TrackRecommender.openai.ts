import { TrackInfo } from "@/util/TrackInfo";
import { OpenAIStream, StreamingTextResponse } from "ai";
import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import {
  MODEL_SYSTEM_PROMPT,
  TrackRecommender,
  responseTextToTrack,
} from "./TrackRecommender";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export class OpenAITrackRecommender implements TrackRecommender {
  async next(queue: TrackInfo[]): Promise<TrackInfo> {
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL ?? "gpt-3.5-turbo",
      stream: true,
      temperature: 1.5,
      presence_penalty: 1,
      frequency_penalty: 1,
      messages: buildMessages(queue),
    });
    const stream = OpenAIStream(response);
    const text = await new StreamingTextResponse(stream).text();
    return responseTextToTrack(text);
  }
}

function buildMessages(queue: TrackInfo[]): ChatCompletionRequestMessage[] {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: MODEL_SYSTEM_PROMPT,
    },
  ];

  for (const track of queue) {
    let prefix: string;
    if (track.liked) {
      prefix = "[L]";
    } else if (track.disliked) {
      prefix = "[D]";
    } else {
      prefix = "";
    }
    messages.push({
      role: "user",
      content: `${prefix}${track.artist} - ${track.title}`,
    });
  }

  return messages;
}
