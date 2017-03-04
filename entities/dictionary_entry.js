class DictionaryEntry {
    constructor(key, value) {
      this.key = key;
      this.value = value;
    }

    toString(){
      return `(Entry ${this.key.toString()}, ${this.value.toString()})`;
    }
}
