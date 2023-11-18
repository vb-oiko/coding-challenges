const expect = {
  array(source) {
    return {
      toEqual(target) {
        return isArrayEqual(source, target);
      },

      toHaveMembers(target) {
        if (source.length !== target.length) {
          return false;
        }

        for (let i = 0; i < source.length; i++) {
          if (!target.includes(source[i])) {
            return false;
          }
        }

        return true;
      },
    };
  },
};

function isArrayEqual(source, target) {
  if (!Array.isArray(source) || !Array.isArray(target)) {
    throw new Error(
      `Either or both of the arguments is not an array (source: ${JSON.stringify(
        source
      )}, target: ${JSON.stringify(target)})`
    );
  }

  if (source.length !== target.length) {
    return false;
  }

  for (let i = 0; i < source.length; i++) {
    if (!isEqual(source[i], target[i])) {
      return false;
    }
  }

  return true;
}

function isEqual(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return isArrayEqual(a, b);
  }

  if (typeof a === typeof b) {
    return a === b;
  }

  return false;
}

module.exports = {
  expect,
};
