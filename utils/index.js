const expect = {
  array(source) {
    return {
      toEqual(target) {
        if (source.length !== target.length) {
          return false;
        }

        for (let i = 0; i < source.length; i++) {
          if (source[i] !== target[i]) {
            return false;
          }
        }

        return true;
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

module.exports = { expect };
