export class Logger {
  private tag: string;
 
  constructor(tag: string) {
    this.tag = tag;
  }
 
  info(msg: string) {
    console.log(`[${this.timestamp()}] [${this.tag}] ${msg}`);
  }
 
  warn(msg: string) {
    console.warn(`[${this.timestamp()}] [${this.tag}] WARN: ${msg}`);
  }
 
  error(msg: string) {
    console.error(`[${this.timestamp()}] [${this.tag}] ERROR: ${msg}`);
  }
 
  private timestamp(): string {
    return new Date().toISOString().slice(11, 23);
  }
}