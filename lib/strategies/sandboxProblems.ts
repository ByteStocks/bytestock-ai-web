export interface SandboxProblem {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topics: string[];
    description: string[];
    example: string;
    constraints: string[];
    starterCode: string;
    testInput: string;
    solution?: string;
}

export const SANDBOX_PROBLEMS: SandboxProblem[] = [
    {
        id: 'simple-moving-average',
        title: 'Simple Moving Average',
        difficulty: 'Easy',
        topics: ['arrays', 'math'],
        description: [
            'Given a list of daily closing prices and a window size k, return a list of the simple moving averages of each window.',
            'For each index i the SMA is the average of the prices from i-k+1 to i (inclusive). Indexes where the window is incomplete must be skipped (do not include them in the output).',
        ],
        example: 'Input:  prices = [1, 2, 3, 4, 5, 6], k = 3\nOutput: [(1+2+3)/3, (2+3+4)/3, (3+4+5)/3, (4+5+6)/3]\n       = [2.0, 3.0, 4.0, 5.0]',
        constraints: ['1 <= len(prices) <= 10^5', '1 <= k <= len(prices)', '0 <= prices[i] <= 10^6'],
        starterCode: `def simple_moving_average(prices, k):
    result = []

    # your code here

    return result
`,
        testInput: `prices = [1, 2, 3, 4, 5, 6]
k = 3
print(simple_moving_average(prices, k))`,
    },
    {
        id: 'max-profit-one-transaction',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        topics: ['array', 'two pointers'],
        description: [
            'You are given an array prices where prices[i] is the price of a given stock on the i-th day.',
            'You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
            'Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
        ],
        example: `
Input:  prices = [7, 1, 5, 3, 6, 4]
Output: 5
Buy on day 2 (price 1) and sell on day 5 (price 6), profit = 6 - 1 = 5.`,
        constraints: ['1 <= len(prices) <= 10^5', '0 <= prices[i] <= 10^4'],
        starterCode: `def max_profit(prices):
    max_profit = 0

    # your code here

    return max_profit
`,
        testInput: `prices = [7, 1, 5, 3, 6, 4]
print(max_profit(prices))`,
    },
    {
        id: 'rsi',
        title: 'RSI Indicator',
        difficulty: 'Medium',
        topics: ['math', 'indicator'],
        description: [
            'Implement the Relative Strength Index (RSI) with a lookback period of n.',
            'RSI measures the magnitude of recent gains versus recent losses. It is 100 - 100 / (1 + avg_gain / avg_loss).',
            'Use the simple average version: average the gains/losses over the trailing n periods. Values before n periods are incomplete; you may return None for them.',
        ],
        example: `
Input:  closes = [44.34, 44.09, 44.15, 43.61, 44.33, 44.83], n = 3
Compute per-step gains/losses, average the last n of each, then
RSI = 100 - 100 / (1 + gain_avg / loss_avg). Handle loss_avg == 0 by returning 100.`,
        constraints: ['2 <= n <= 100', '1 <= len(closes) <= 10^5', '0 < closes[i] <= 10^6'],
        starterCode: `def rsi(closes, n):
    result = []

    # your code here

    return result
`,
        testInput: `closes = [44.34, 44.09, 44.15, 43.61, 44.33, 44.83]
n = 3
print(rsi(closes, n))`,
    },
    {
        id: 'drawdown',
        title: 'Maximum Drawdown',
        difficulty: 'Medium',
        topics: ['arrays', 'risk'],
        description: [
            'Maximum drawdown is defined as the largest drop from a peak to a later trough in an equity curve.',
            'Given a list of daily portfolio values, compute the maximum drawdown as a percentage (0-100).',
            'It measures the largest peak-to-trough decline relative to the peak.',
        ],
        example: `
Input:  values = [100, 120, 110, 90, 130, 50]
Peak 120 drops to 90  -> 25.0%
Peak 130 drops to 50  -> 61.54%
Maximum drawdown = 61.538461...`,
        constraints: ['1 <= len(values) <= 10^5', '0 <= values[i] <= 10^7'],
        starterCode: `def max_drawdown(values):
    max_dd = 0.0

    # your code here

    return max_dd
`,
        testInput: `values = [100, 120, 110, 90, 130, 50]
print(max_drawdown(values))`,
    },
    {
        id: 'squeeze-sort',
        title: 'Merge Two Sorted Price Lists',
        difficulty: 'Medium',
        topics: ['sorting', 'two pointers'],
        description: [
            'You are given two way prices lists which are each sorted in ascending order. Merge them into a single ascending list.',
            'Return the merged sorted list. Do not use the built-in sort for the final answer — you must implement merging yourself.',
        ],
        example: `
Input:  a = [1, 2, 4], b = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]`,
        constraints: ['0 <= len(a), len(b) <= 10^4', '0 <= a[i], b[i] <= 10^9'],
        starterCode: `def merge_sorted(a, b):
    merged = []

    # your code here

    return merged
`,
        testInput: `a = [1, 2, 5]
b = [1, 2, 4]
print(merge_sorted(a, b))`,
    },
    {
        id: 'breakout',
        title: 'N-Day Breakout',
        difficulty: 'Hard',
        topics: ['arrays', 'strategy'],
        description: [
            'A breakout occurs when today close price is strictly greater than the maximum close of the previous N days (the channel).',
            'Given daily closes, return the list of day indexes (0-based) at which a breakout occurs.',
        ],
        example: `
Input:  closes = [10, 11, 12, 11, 13, 14], n = 2
Day 1: close 11 > max(10) -> breakout
Day 2: close 12 > max(10, 11) -> breakout
Day 3: close 11 not > max(11, 12)
Day 4: close 13 > max(12, 11) -> breakout
Day 5: close 14 > max(11, 13) -> breakout
Output: [1, 2, 4, 5]`,
        constraints: ['2 <= n < len(closes)', '1 <= len(closes) <= 10^4'],
        starterCode: `def breakout(closes, n):
    result = []

    # your code here

    return result
`,
        solution: `def breakout(closes, n):
    result = []
    for i in range(n, len(closes)):
        if closes[i] > max(closes[i - n : i]):
            result.append(i)
    return result
`,
        testInput: `closes = [10, 11, 12, 11, 13, 14]
n = 2
print(breakout(closes, n))`,
    },
];