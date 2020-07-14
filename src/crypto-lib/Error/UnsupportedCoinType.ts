class UnsupportedCoinType extends Error {
  constructor() {
    super();

    this.message = "Unsupported CoinType";
    this.name = "UnsupportedCoinType";
  }
}

export default UnsupportedCoinType;
