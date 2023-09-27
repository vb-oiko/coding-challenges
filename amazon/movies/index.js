function minimumTimeSpent(
  comedyReleaseTime,
  comedyDuration,
  dramaReleaseTime,
  dramaDuration
) {
  const comedies = comedyReleaseTime
    .map((release, i) => ({
      release,
      duration: comedyDuration[i],
    }))
    .sort((a, b) => a.release - b.release);

  const dramas = dramaReleaseTime
    .map((release, i) => ({
      release,
      duration: dramaDuration[i],
    }))
    .sort((a, b) => a.release - b.release);

  let minTimeSpent = Infinity;

  function iterateForSecondMovie(movies, currentTimeSpent) {
    let i = 0;
    while (
      i < movies.length &&
      movies[i].release < currentTimeSpent &&
      movies[i].release < minTimeSpent
    ) {
      const timeSpent =
        Math.max(currentTimeSpent, movies[i].release) + movies[i].duration;
      if (timeSpent < minTimeSpent) {
        minTimeSpent = timeSpent;
      }
      i++;
    }
  }

  function iterateForFirstMovie(firstMovies, secondMovies) {
    let currentIndex = 0;
    while (
      currentIndex < firstMovies.length &&
      firstMovies[currentIndex].release < minTimeSpent
    ) {
      iterateForSecondMovie(
        secondMovies,
        firstMovies[currentIndex].release + firstMovies[currentIndex].duration
      );
      currentIndex++;
    }
  }

  iterateForFirstMovie(comedies, dramas);
  iterateForFirstMovie(dramas, comedies);

  return minTimeSpent;
}

const comedyReleaseTime = [1, 2, 3];
const comedyDuration = [1, 1, 1];
const dramaReleaseTime = [1, 2, 3];
const dramaDuration = [10, 5, 1];

const result = minimumTimeSpent(
  comedyReleaseTime,
  comedyDuration,
  dramaReleaseTime,
  dramaDuration
);

console.log("RESULT: ", result);
