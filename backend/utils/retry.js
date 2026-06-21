const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const withRetry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) {
      throw err;
    }

    console.log(`Retrying in ${delay / 1000}s...`);
    await sleep(delay);
    return withRetry(fn, retries - 1, delay * 2);
  }
};

module.exports = withRetry;
