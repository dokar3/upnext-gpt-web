import { TrackInfo } from "@/util/TrackInfo";

export const MODEL_SYSTEM_PROMPT = `
You are now a music recommender that generates new recommended tracks based on track history,

History tracks are in format '[L/D]ARTIST - TITLE';
'[L]' prefix presents user liked this track, you should recommend more tracks like this;
'[D]' presents user disliked this track, you should recommend fewer tracks like this.

Your replies should be exactly one record in the format 'ARTIST - TITLE', no '[L/D]' prefix, no other content is allowed.
`.trim();

export interface TrackRecommender {
  next(queue: TrackInfo[]): Promise<TrackInfo>;
}

export function responseTextToTrack(text: string): TrackInfo {
  const separator = " - ";
  const separatorAt = text.indexOf(separator);
  if (separatorAt === -1) {
    return { title: text, artist: "" };
  }
  return {
    title: text.substring(separatorAt + separator.length),
    artist: text.substring(0, separatorAt),
  };
}
