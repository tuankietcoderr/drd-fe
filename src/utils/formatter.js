import dayjs from 'dayjs';

dayjs.locale('vi');

class Formatter {
  static get currency() {
    return Intl.NumberFormat;
  }

  /**
   * @param {number | bigint} value
   * @param {Intl.NumberFormatOptions} opts
   * @returns
   */
  static currency = (value, opts) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      ...opts,
    }).format(value);
  };

  static number = (value, opts) => {
    return new Intl.NumberFormat('vi-VN', {
      ...opts,
    }).format(value);
  };

  static date = value => {
    return dayjs(value);
  };
}

export default Formatter;
