import {DiscordMessage, OutFile} from 'discord-videos';
import fs from 'fs';
import config from './config';
import urlParser from "js-video-url-parser";


const urlRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/ig
const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/i

const chatLog: { messages: DiscordMessage[] } = JSON.parse(fs.readFileSync(config.inFile).toString());

const urlSet: Set<string> = new Set<string>();

for (const message of chatLog.messages) {
    const matches: RegExpMatchArray = message.content.match(urlRegex);

    if (!matches) {
        continue;
    }

    for (const match of matches) {
        urlSet.add(match);
    }
}

const urls: string[] = Array.from(urlSet.values());

const ytLinks = urls.filter((l: string) => ytRegex.test(l));

const out: OutFile = {
    urls,
    youtubePlaylists: ytLinks.reduce((acc: string[], l: string, i: number) => {
        const parsed = urlParser.parse(l);
        if (i % 50 === 0) {
            acc.push(`https://youtube.com/watch_videos?video_ids=${parsed.id}`);
        } else {
            acc[acc.length - 1] += ',' + parsed.id;
        }

        return acc;
    }, [])
}

console.log('Links:', urls.length);
console.log('YouTube:', ytLinks.length);

fs.writeFileSync(config.outFile, JSON.stringify(out, null, 2));
