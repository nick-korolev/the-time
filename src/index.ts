type TTimeValue = 'hours' | 'minutes' | 'seconds';

export interface ITime {
  toString(): string;
  toTimeString(): string;

  getHours(): number;
  getMinutes(): number;
  getSeconds(): number;
  toSeconds(): number;

  add(amount: number, d: TTimeValue): ITime;
  subtract(amount: number, d: TTimeValue): ITime;

  isGreaterThan(value: ITime): boolean;
  isLessThan(value: ITime): boolean;
  isEqualTo(value: ITime): boolean;
}

export interface ITimeOptions {
  // overflow: true - 23:59:59 + 1 minute = 00:00:59
  overflow?: boolean;
}

export class Time implements ITime {
  private hours = 0;
  private minutes = 0;
  private seconds = 0;
  private milliseconds = 0;
  private readonly overflow: boolean;

  constructor(timeString: string, options: ITimeOptions = {}) {
    Time.validate(timeString);
    this.overflow = typeof options.overflow === 'boolean' ? options.overflow : true;
    [this.hours, this.minutes, this.seconds, this.milliseconds] = Time.parse(timeString);
  }

  public toString(): string {
    const milliseconds = this.milliseconds.toString().padStart(3, '0');
    return `${this.toTimeString()}.${milliseconds}`;
  }

  public toTimeString(): string {
    const hours = this.hours.toString().padStart(2, '0');
    const minutes = this.minutes.toString().padStart(2, '0');
    const seconds = this.seconds.toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  public getHours(): number {
    return this.hours;
  }

  public getMinutes(): number {
    return this.minutes;
  }

  public getSeconds(): number {
    return this.seconds;
  }

  public add(amount: number, d: TTimeValue): ITime {
    this.validateAmount(amount);
    const multiplier = this.getMultiplierFor(d);
    const timeInSec = this.toSeconds();
    const newTimeInSec = timeInSec + (amount * multiplier);
    this.fromSeconds(newTimeInSec);
    return this;
  }

  public subtract(amount: number, d: TTimeValue): ITime {
    this.validateAmount(amount);
    const multiplier = this.getMultiplierFor(d);
    const timeInSec = this.toSeconds();
    let newTimeInSec = timeInSec - (amount * multiplier);
    if (newTimeInSec < 0) {
      if (this.overflow) {
        const timeInSecPerDay = 24 * 3600;
        newTimeInSec += timeInSecPerDay;
      } else {
        newTimeInSec = 0;
      }
    }
    this.fromSeconds(newTimeInSec);
    return this;
  }

  public static isValid(timeString: string): boolean {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return timeRegex.test(timeString);
  }

  public static now(): ITime {
    const date = new Date().toISOString();
    const [_,timeString] = date.split('T');
    const now = new Time(timeString.slice(0, 8));
    return now;
  }

  public isGreaterThan(value: ITime): boolean {
    const timeInSec = this.toSeconds();
    const valueInSec = value.toSeconds();
    return timeInSec > valueInSec;
  }

  public isLessThan(value: ITime): boolean {
    const timeInSec = this.toSeconds();
    const valueInSec = value.toSeconds();
    return timeInSec < valueInSec;
  }

  public isEqualTo(value: ITime): boolean {
    const timeInSec = this.toSeconds();
    const valueInSec = value.toSeconds();
    return timeInSec === valueInSec;
  }

  private validateAmount(amount: number): void {
    if (typeof amount !== 'number') {
      throw new Error('Amount is not a number');
    }
    if (amount < 0) {
      throw new Error('Amount is negative');
    }
    if (amount >= Number.MAX_SAFE_INTEGER) {
      throw new Error('Amount is too big');
    }
  }

  private getMultiplierFor(d: TTimeValue): number {
    switch (d) {
      case 'hours':
        return 3600;
      case 'minutes':
        return 60;
      case 'seconds':
        return 1;
    }
  }
  private static validate(timeString: string): void {
    const isValid = Time.isValid(timeString);
    if (!isValid) {
      throw new Error(`Invalid time format: ${timeString}`);
    }
  }

  private static parse(timeString: string): number[] {
    const [hh, mm, ss] = timeString.split(':').map((time) => parseInt(time, 10));
    return [hh, mm, ss, 0];
  }

  public toSeconds(): number {
    return this.hours * 3600 + this.minutes * 60 + this.seconds;
  }

  private fromSeconds(secondsVal: number): void {
    const hours = Math.floor(secondsVal / 3600);
    if (hours > 23 && this.overflow) {
      this.hours = hours % 24;
    } else {
      this.hours = hours;
    }
    this.minutes = Math.floor((secondsVal % 3600) / 60);
    this.seconds = secondsVal % 60;
  }
}
