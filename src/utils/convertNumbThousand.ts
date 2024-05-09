const convertNumbThousand = (x?: number): string => {
  if (typeof x !== 'number') {
    return '';
  }
  return x.toLocaleString('en-US');
};

export default convertNumbThousand;
