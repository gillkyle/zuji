# Zuji

A lightweight number formatting utility built on top of `Intl.NumberFormat`.

## Installation

```bash
npm install zuji
```

## Usage

```js
import { zuji } from "zuji";

// Format currency
zuji(1234.56, "compact-currency-usd"); // "$1,234.56"

// Format number
zuji(1234, "standard-integer"); // "1,234"

// Format percentage
zuji(0.1234, "compact-percent"); // "12.3%"
```

## Name

sūji is the Japanese word for numeral. zuji is a phonetically modified version of the Japanese word, that happened to be:

1. short
2. easy to type
3. an unclaimed npm package name
