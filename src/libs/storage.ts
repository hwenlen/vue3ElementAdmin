/**
  * @description 为localStorage添加过期时间
  * @param {number}  expires 过期时间，单位：天  默认为0就是不设过期时间
*/
const _localStorage = localStorage
export class webLocalStorage {
  private expires: number;
  constructor(expire: number = 0) {
    this.expires = expire
  }
  setItem(key: string, value: string) {
    const data = {
      ...JSON.parse(value),
      expires: this.expires && Date.now() + (this.expires * 1000 * 60 * 60 * 24)
    };
    return _localStorage.setItem(key, JSON.stringify(data));
  }
  getItem(key: string) {
    const value = _localStorage.getItem(key);
    if (!value) {
      return null;
    }
    const data = JSON.parse(value);
    if (this.expires && Date.now() > data.expires) {
      _localStorage.removeItem(key);
      return null;
    }
    return data;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
