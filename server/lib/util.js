const ObjectId = require("mongoose").Types.ObjectId;
const { validate } = require("uuid");

function is_valid_object_id(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

function id_valid_id(id) {
  return validate(id);
}

function find_paginated(options, page, limit) {
  page = Math.abs(parseInt(page));
  limit = Math.abs(parseInt(limit));

  limit = limit > 50 ? 50 : limit || 10;
  page = page >= 1 ? page - 1 : 0;

  options.skip = page * limit;
  options.limit = limit;
  return { options, page, limit };
}

const validate_enum = (value, enum_values) => {
  const is_valid = enum_values.find((val) => value === val);
  return is_valid || false;
};

module.exports = {
  is_valid_object_id,
  id_valid_id,
  find_paginated,
  validate_enum,
};
