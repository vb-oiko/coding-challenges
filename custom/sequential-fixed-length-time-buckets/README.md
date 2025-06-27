**Problem Definition**

Implement a class `MessageWindow` that tracks time-stamped messages and organizes them into fixed-size historical windows.

### Constructor

The constructor takes a single argument:

- `windowInMinutes` (number): the size of each fixed time window (e.g. 60 for 1 hour).

### Method

The class exposes one method:

```ts
addMessage(message: string): string[]
```

- Returns an array of strings, where each string is a comma-separated list of messages that fall into the same window.

### Time Window Grouping

Time is divided into **fixed-length, non-overlapping windows**, counting backward from the current moment:

- Window 0: `[now - window, now)`
- Window 1: `[now - 2*window, now - window)`
- Window 2: `[now - 3*window, now - 2*window)`
- ...

Each call to `addMessage` returns the updated state of **all** windows containing at least one message, ordered from newest to oldest.

### Example

Assume `windowInMinutes = 60` and the following events happen at:

- **03:15** → `addMessage("hello")`
  → returns: `['hello']`

- **03:20** → `addMessage("hello1")`
  → returns: `['hello, hello1']`

- **04:17** → `addMessage("hello2")`
  → returns: `['hello2, hello1', 'hello']`

### Constraints

- The method uses the system clock to determine the message timestamp.
- Messages are only grouped by their respective time windows (not overlapping).
- Only windows with at least one message should be returned.
- Returned groups are ordered from newest to oldest.
