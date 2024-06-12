// 9. In the role-playing game, a particular dungeon has a bunch of rooms designated by the grid.
// Each room in the dungeon is represented by an object with two properties:
//   m: The amount of damage done by the monster lurking in that room.
//   g: The amount of gold available for you to collect in that room.

// Dungeon can be 1*1 (one room), 2*2 (4 rooms), 3*3 (9 rooms), etc.
// Hero enters the dungeon, from any room at the "edge" of the dungeon, with a certain amount of health hp.
// By "edge" means an outer perimeter: for 2*2 - all rooms are outer perimeter; for 3*3 - central room is NOT outer perimeter, but all other rooms are.
// During each turn hero can:
//   1. Can go to any room (north, east, south, or west) as long as that room exists (it is preferable to avoid repetitive visits of the same room).
//   2. Collect the gold in that room.
//   3. Fight the monster in that room, losing health equivalent to the monster's value.
//   4. If your health is then less than or equal to 0, you die. Otherwise, continue.
//   5. Exit dungeon with gathered gold.

// Given a dungeon "grid" and a starting health "hp", write the function "dungeonCrawl(grid, hp)" to determine the maximum amount of gold you could obtain.
// (by entering the dungeon at any of the edge rooms  and continuing until you can no longer make a move)

// Log all hero actions for a legend and bard songs!

// Check on 4*4 or 5*5 dungeon size.

// Bonus: some "rooms" can be collapsed (no access)
// Bonus2: some rooms can be empty
// Bonus3: some rooms can be entered/exited from limited sides (not all 4 sides)

function dungeonCrawl(grid, hp) {
    const n = grid.length;
    const m = grid[0].length;
    const visited = Array(n).fill().map(() => Array(m).fill(false));
    let maxGold = 0;

    const dfs = (row, col, hp, gold) => {
        if (row < 0 || row >= n || col < 0 || col >= m || visited[row][col] || hp <= 0 || !grid[row][col] || grid[row][col].collapsed) {
            return;
        }
    
        visited[row][col] = true;
        if (grid[row][col].m) {
            hp -= grid[row][col].m;
        }
        if (grid[row][col].g) {
            gold += grid[row][col].g;
        }
    
        if (hp > 0) {
            maxGold = Math.max(maxGold, gold);
            if (grid[row][col].doors && grid[row][col].doors.north) dfs(row - 1, col, hp, gold);
            if (grid[row][col].doors && grid[row][col].doors.south) dfs(row + 1, col, hp, gold);
            if (grid[row][col].doors && grid[row][col].doors.west) dfs(row, col - 1, hp, gold);
            if (grid[row][col].doors && grid[row][col].doors.east) dfs(row, col + 1, hp, gold);
        }
    
        visited[row][col] = false;
    };
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            dfs(i, j, hp, 0);
        }
    }

    return maxGold;
}

const grid = [
    [{m: 1, g: 2, doors: {north: false, east: true, south: true, west: false}}, {m: 2, g: 3, doors: {north: false, east: false, south: true, west: true}}, {m: 3, g: 1, doors: {north: false, east: false, south: true, west: false}}],
    [{m: 2, g: 1, doors: {north: true, east: true, south: true, west: false}, collapsed: true}, {m: 3, g: 2, doors: {north: true, east: false, south: false, west: true}}, {m: 1, g: 3, doors: {north: true, east: false, south: true, west: false}}],
    [{m: 3, g: 3, doors: {north: true, east: true, south: false, west: false}}, {}, {m: 2, g: 2, doors: {north: true, east: false, south: false, west: true}}]
];
console.log(dungeonCrawl(grid, 10)); // 7