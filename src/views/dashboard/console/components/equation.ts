export const equations = [
  {
    value: '\\f\\relax{x}\\displaystyle= \\frac{k(k+1)}{2}+k+1',
    options: {
      displayMode: true,
      fleqn: true,
      macros: {
        '\\f': '#1f(#2)',
      },
    },
    id: 1,
  },
  {
    value: `\\f\\relax{x} = \\int_{-\\infty}^\\infty
    \\f\\hat\\xi\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`,
    options: {
      displayMode: true,
      fleqn: true,
      macros: {
        '\\f': '#1f(#2)',
      },
    },
    id: 3,
  },
  {
    value: `c = \\pm\\sqrt{a^2 + b^2}`,
    options: {
      throwOnError: false,
    },
    id: 3,
  },
];
