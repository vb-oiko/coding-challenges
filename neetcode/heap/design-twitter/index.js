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
  const mpq = new MaxPriorityQueue();

  const user = this.getOrCreateUser(userId);

  user.followees.forEach((id) => {
    const followee = this.getOrCreateUser(id);
    const recentTweets = followee.tweets.slice(
      Math.max(0, followee.tweets.length - 10),
      followee.tweets.length
    );

    recentTweets.forEach((tweet) => mpq.enqueue(tweet.id, tweet.time));
  });

  const result = [];

  for (let i = 0; i < 10; i++) {
    if (mpq.size() === 0) {
      break;
    }

    result.push(mpq.dequeue().element);
  }

  return result;
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

var { MaxPriorityQueue } = require("@datastructures-js/priority-queue");

const tests = [
  //   {
  //     commands: [
  //       "Twitter",
  //       "postTweet",
  //       "getNewsFeed",
  //       "follow",
  //       "postTweet",
  //       "getNewsFeed",
  //       "unfollow",
  //       "getNewsFeed",
  //     ],

  //     params: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
  //     output: [null, null, [5], null, null, [6, 5], null, [5]],
  //   },
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

  console.warn(twitter);
  const isValid = expect.array(results).toEqual(output);

  console.warn({ commands, params, results, output, isValid });
}
