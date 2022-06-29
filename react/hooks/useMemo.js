const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
