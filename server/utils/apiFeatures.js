class APIfeatures {
  constructor(data, query) {
    this.data = data;
    this.query = query;
  }

  pagination() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.data = this.data.skip(skip).limit(limit);
    return this;
  }
};

module.exports = APIfeatures;