declare module 'discord-videos' {
    export interface DiscordMessage {
        "id": string;
        "type": string;
        "timestamp": string;
        "timestampEdited": unknown;
        "callEndedTimestamp": string;
        "isPinned": boolean;
        "content": string;
        "author": {
            "id": string;
            "name": string;
            "discriminator": string;
            "isBot": boolean;
            "avatarUrl": string
        };
        "attachments": unknown[];
        "embeds":
            {
                "title": string;
                "url": string;
                "timestamp": string | null;
                "description": string;
                "author": {
                    "name": string;
                    "url": string
                };
                "thumbnail": {
                    "url": string;
                    "width": number;
                    "height": number
                };
                "fields": unknown[]
            }[];
        "reactions": unknown[]
    }

    export interface OutFile {
        urls: string[];
        youtubePlaylists: string[];
    }
}