/**
 * @param { Promise } promise
 * @param { Object } improved - If you need to enhance the error.
 * @return { Promise }
 */
const to = (promise: any, improved?: any) => {
  return promise
    .then((data: any) => [null, data])
    .catch((err: any) => {
      improved && Object.assign(err, improved);

      return [err]; // which is same as [err, undefined];
    });
};

export default to;
