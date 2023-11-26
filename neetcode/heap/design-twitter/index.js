var Twitter = function () {
  this.users = new Map();
  this.time = 0;
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function (userId, tweetId) {
  const user = this.getOrCreateUser(userId);
  user.tweets.push({ id: tweetId, time: this.getTime() });
  return null;
};

/**
 * @param {void} userId
 * @return {number}
 */
Twitter.prototype.getTime = function () {
  this.time += 1;
  return this.time;
};

/**
 * @param {number} userId
 * @return {{followees:  Set<number>, tweets: number[]}}
 */
Twitter.prototype.getOrCreateUser = function (userId) {
  if (!this.users.has(userId)) {
    this.users.set(userId, {
      followees: new Set([userId]),
      tweets: [],
    });
  }

  return this.users.get(userId);
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function (userId) {
  const user = this.getOrCreateUser(userId);
  let tweets = [...user.followees.values()].map((id) => {
    const followee = this.getOrCreateUser(id);
    return followee.tweets.slice(
      Math.max(0, followee.tweets.length - 10),
      followee.tweets.length
    );
  });

  while (tweets.length > 1) {
    const merged = [];
    for (let k = 0; k < tweets.length; k += 2) {
      let a = tweets[k];
      let b = k + 1 < tweets.length ? tweets[k + 1] : null;

      if (!b) {
        merged.push(a);
        break;
      }

      const arr = [];
      let i = 0;
      let j = 0;

      while (i < a.length || j < b.length) {
        if (i >= a.length) {
          arr.push(b[j]);
          j++;
          continue;
        }

        if (j >= b.length) {
          arr.push(a[i]);
          i++;
          continue;
        }

        if (a[i].time < b[j].time) {
          arr.push(a[i]);
          i++;
          continue;
        }

        arr.push(b[j]);
        j++;
      }

      merged.push(arr);
    }

    tweets = merged;
  }

  const feed = tweets[0];
  const res = feed
    .slice(Math.max(0, feed.length - 10), feed.length)
    .map(({ id }) => id)
    .reverse();
  return res;
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function (followerId, followeeId) {
  const user = this.getOrCreateUser(followerId);
  user.followees.add(followeeId);
  return null;
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function (followerId, followeeId) {
  const user = this.getOrCreateUser(followerId);
  user.followees.delete(followeeId);
  return null;
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

const tests = [
  {
    commands: [
      "Twitter",
      "postTweet",
      "getNewsFeed",
      "follow",
      "postTweet",
      "getNewsFeed",
      "unfollow",
      "getNewsFeed",
    ],

    params: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
    output: [null, null, [5], null, null, [6, 5], null, [5]],
  },
  {
    commands: [
      "Twitter",
      "postTweet",
      "postTweet",
      "postTweet",
      "postTweet",
      "postTweet",
      "postTweet",
      "postTweet",
      "postTweet",
      "postTweet",
      "getNewsFeed",
    ],

    params: [
      [],
      [1, 5],
      [1, 3],
      [1, 101],
      [1, 13],
      [1, 10],
      [1, 2],
      [1, 94],
      [1, 505],
      [1, 333],
      [1],
    ],
    output: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      [333, 505, 94, 2, 10, 13, 101, 3, 5],
    ],
  },
];

const { expect } = require("../../../utils");

for (const { commands, params, output } of tests) {
  let twitter;

  function execute(command, params) {
    switch (command) {
      case "Twitter":
        twitter = new Twitter();
        return null;

      case "postTweet": {
        const [userId, tweetId] = params;
        return twitter.postTweet(userId, tweetId);
      }

      case "getNewsFeed": {
        const [userId] = params;
        return twitter.getNewsFeed(userId);
      }

      case "follow": {
        const [followerId, followeeId] = params;
        return twitter.follow(followerId, followeeId);
      }

      case "unfollow": {
        const [followerId, followeeId] = params;
        return twitter.unfollow(followerId, followeeId);
      }

      default:
        throw new Error("Unknown command");
    }
  }

  let results = [];

  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const param = params[i];
    const result = execute(command, param);
    results.push(result);
  }

  const isValid = expect.array(results).toEqual(output);

  console.warn({ commands, params, results, output, isValid });
}
