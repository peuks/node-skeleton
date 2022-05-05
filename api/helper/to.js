/**
 * @param { Promise } promise
 * @param { Object } improved - If you need to enhance the error.
 * @return { Promise }
 */
const to = (promise, improved) => {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      improved && Object.assign(err, improved);

      return [err]; // which is same as [err, undefined];
    });
};

export default to;
