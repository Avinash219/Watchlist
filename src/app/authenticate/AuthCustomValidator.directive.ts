export function forbiddenName(nameRe: RegExp) {
  return (control) => {
    const forbidden = nameRe.test(control.value);
    return forbidden
      ? {
          forbiddenName: {
            value: control.value,
          },
        }
      : null;
  };
}
