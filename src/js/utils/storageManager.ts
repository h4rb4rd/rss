class StorageManager {
  prefix = 'ls#-';

  set = <T>(key: string, value: T) => localStorage.setItem(this.prefix + key, JSON.stringify(value));

  get = <T>(key: string): T => {
    const data: string | null = localStorage.getItem(this.prefix + key);
    return data ? JSON.parse(data) : '';
  };

  delete = (key: string) => {
    localStorage.removeItem(this.prefix + key);
  };
}

export default StorageManager;
