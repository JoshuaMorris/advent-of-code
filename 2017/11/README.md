# --- Day 11: Hex Ed ---

![Advent Calendar Day 11][calendar]

## --- Part One ---

Crossing the bridge, you've barely reached the other side of the stream when a program comes up to you, clearly in distress. "It's my child process," she says, "he's gotten lost in an infinite grid!"

Fortunately for her, you have plenty of experience with infinite grids.

Unfortunately for you, it's a [hex grid](https://en.wikipedia.org/wiki/Hexagonal_tiling).

The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the north, northeast, southeast, south, southwest, and northwest:
```
  \ n  /
nw +--+ ne
  /    \
-+      +-
  \    /
sw +--+ se
  / s  \
```

You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to reach him. (A "step" means to move from the hex you are in to any adjacent hex.)

For example:

- `ne,ne,ne` is `3` steps away.
- `ne,ne,sw,sw` is `0` steps away (back where you started).
- `ne,ne,s,s` is `2` steps away (`se`,`se`).
- `se,sw,se,sw,sw` is `3` steps away (`s`,`s`,`sw`).

To begin, get your puzzle input.

That's the right answer! You are **one gold star** closer to debugging the printer.

Your puzzle answer was `675`.

**The first half of this puzzle is complete! It provides one gold star: `*`**

## --- Part Two ---

**How many steps away** is the **furthest** he ever got from his starting position?

Your puzzle answer was `1424`.

That's the right answer! You are **one gold star** closer to debugging the printer.

You have completed Day 11!

[calendar]: https://github.com/JoshuaMorris/advent-of-code/raw/master/2017/11/advent-day-11.png "Advent of Code Day 11"
