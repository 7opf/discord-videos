import path from 'path';

interface Config {
    outFile: string;
    inFile: string;
}

const {IN_FILE, OUT_FILE} = process.env;

if (!OUT_FILE) {
    throw new Error('OUT_FILE not set');
}

if (!IN_FILE) {
    throw new Error('IN_FILE not set');
}

const config: Config = {
    outFile: path.resolve(process.cwd(), process.env.OUT_FILE),
    inFile: path.resolve(process.cwd(), process.env.IN_FILE)
};

export default config;
