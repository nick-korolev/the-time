import { Time } from '../src';
import { assert } from 'chai';

describe('Time', () => {

  describe('#constructor()', () => {
    it('should throw error if timeString is invalid', () => {
      assert.throws(() => new Time('23:59:60'));
    });
  });

  describe('#toString()', () => {
    it('should return valid string with milliseconds', () => {
      const time = new Time('23:59:59');
      assert.equal(time.toString(), '23:59:59.000');
    });
  });

  describe('#toTimeString()', () => {
    it('should return valid string without milliseconds', () => {
      const time = new Time('23:59:59');
      assert.equal(time.toTimeString(), '23:59:59');
    });
  });

  describe('#getHours()', () => {
    it('should return valid hours', () => {
      const time = new Time('23:59:59');
      assert.equal(time.getHours(), 23);
    });
  });

  describe('#getMinutes()', () => {
    it('should return valid minutes', () => {
      const time = new Time('23:59:59');
      assert.equal(time.getMinutes(), 59);
    });
  });

  describe('#getSeconds()', () => {
    it('should return valid seconds', () => {
      const time = new Time('23:59:59');
      assert.equal(time.getSeconds(), 59);
    });
  });

  describe('#add()', () => {
    it('should add 1 minute', () => {
      const time = new Time('23:59:59');
      time.add(1, 'minutes');

      assert.equal(time.toTimeString(), '00:00:59');
    });

    it('should add 1 hour', () => {
      const time = new Time('23:59:59');
      time.add(1, 'hours');

      assert.equal(time.toTimeString(), '00:59:59');
    });

    it('should add 1 second', () => {
      const time = new Time('23:59:59');
      time.add(1, 'seconds');

      assert.equal(time.toTimeString(), '00:00:00');
    });

    it('should add 1 minute and 1 hour', () => {
      const time = new Time('23:59:59');
      time.add(1, 'minutes');
      time.add(1, 'hours');

      assert.equal(time.toTimeString(), '01:00:59');
    });

    it('should add 1 minute and 1 hour and 1 second with overflow=true', () => {
      const time = new Time('23:59:59', { overflow: false });
      time.add(1, 'minutes');
      time.add(1, 'hours');
      time.add(1, 'seconds');

      assert.equal(time.toTimeString(), '25:01:00');
    });

    it('should throw error if amount is greater than Number.MAX_SAFE_INTEGER', () => {
      const time = new Time('23:59:59');
      assert.throws(() => time.add(Number.MAX_SAFE_INTEGER + 1, 'seconds'));
    });

    it('should throw error if amount is less than 0', () => {
      const time = new Time('23:59:59');
      assert.throws(() => time.add(-1, 'seconds'));
    });

    it('should throw error if amount is not a number', () => {
      const time = new Time('23:59:59');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      assert.throws(() => time.add('string', 'seconds'));
    });
  });

  describe('#subtract()', () => {
    it('should subtract 1 minute', () => {
      const time = new Time('23:59:59');
      time.subtract(1, 'minutes');

      assert.equal(time.toTimeString(), '23:58:59');
    });

    it('should subtract 1 hour', () => {
      const time = new Time('23:59:59');
      time.subtract(1, 'hours');

      assert.equal(time.toTimeString(), '22:59:59');
    });

    it('should subtract 1 second', () => {
      const time = new Time('23:59:59');
      time.subtract(1, 'seconds');

      assert.equal(time.toTimeString(), '23:59:58');
    });

    it('should subtract 1 minute and 1 hour', () => {
      const time = new Time('23:59:59');
      time.subtract(1, 'minutes');
      time.subtract(1, 'hours');

      assert.equal(time.toTimeString(), '22:58:59');
    });

    it('should return time of previous day if subtract 1 second', () => {
      const time = new Time('00:00:00');
      time.subtract(1, 'seconds');

      assert.equal(time.toTimeString(), '23:59:59');
    });

    it('should return 00:00:00 if subtract 1 second and overflow is false', () => {
      const time = new Time('00:00:00', {
        overflow: false
      });
      time.subtract(1, 'seconds');

      assert.equal(time.toTimeString(), '00:00:00');
    });

    it('should throw error if amount is greater than Number.MAX_SAFE_INTEGER', () => {
      const time = new Time('23:59:59');
      assert.throws(() => time.subtract(Number.MAX_SAFE_INTEGER + 1, 'seconds'));
    });
  });

  describe('#now()', () => {
    it('should return current time', () => {
      const time = Time.now();
      const now = new Date();

      assert.equal(time.getMinutes(), now.getMinutes());
      assert.equal(time.getSeconds(), now.getSeconds());
    });
  });

  describe('#toSeconds()', () => {
    it('should return seconds', () => {
      const time = new Time('23:59:59');
      assert.equal(time.toSeconds(), 86399);
    });
  });

  describe('#isGreaterThan()', () => {
    it('should return true if time is greater than other', () => {
      const time = new Time('23:59:59');
      const other = new Time('00:00:00');

      assert.isTrue(time.isGreaterThan(other));
    });

    it('should return false if time is not greater than other', () => {
      const time = new Time('00:00:00');
      const other = new Time('23:59:59');

      assert.isFalse(time.isGreaterThan(other));
    });
  });

  describe('#isLessThan()', () => {
    it('should return true if time is less than other', () => {
      const time = new Time('00:00:00');
      const other = new Time('23:59:59');

      assert.isTrue(time.isLessThan(other));
    });

    it('should return false if time is not less than other', () => {
      const time = new Time('23:59:59');
      const other = new Time('00:00:00');

      assert.isFalse(time.isLessThan(other));
    });
  });

  describe('#isEqualTo()', () => {
    it('should return true if time is equal to other', () => {
      const time = new Time('23:59:59');
      const other = new Time('23:59:59');

      assert.isTrue(time.isEqualTo(other));
    });

    it('should return false if time is not equal to other', () => {
      const time = new Time('23:59:59');
      const other = new Time('00:00:00');

      assert.isFalse(time.isEqualTo(other));
    });
  });
});
