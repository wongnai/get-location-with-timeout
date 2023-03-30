# Get Location With Timeout

[![semantic-release](https://img.shields.io/badge/semantic-release-e10079.svg?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Wrapper for navigator.geolocation.getCurrentPosition with ensure rejected the promise when timeout

## Installation

```
yarn add get-location-with-timeout
```

### Usage

```ts
import getCurrentLocationWithTimeout, { TiredFromWaitingPromiseResolveTooLongError } from 'get-location-with-timeout'

try {
    const { coords } = await getCurrentLocationWithTimeout()

    // logic
} catch (error) {
    if (error instanceof TimeoutError) {
        // handle timeout logic
    } else {
        // handle other reject logic
    }
}
```
