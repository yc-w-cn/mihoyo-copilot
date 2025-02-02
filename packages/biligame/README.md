# biligame

## Game YS

### download ys characters

```bash
ts-node -r tsconfig-paths/register ./src/cli.ts --game sr --outputDir ./output
```

### download ys characters with cache

use html cache from output folder.

```bash
pnpx ts-node -r tsconfig-paths/register ./src/cli.ts --game ys --outputDir ./output --cache
```

### download ys character detail

```bash
pnpx ts-node -r tsconfig-paths/register ./src/cli.ts --game ys --target character-detail --name 夏沃蕾 --outputDir ./output
```

### download ys character detail with cache

use html cache from output folder.

```bash
pnpx ts-node -r tsconfig-paths/register ./src/cli.ts --game ys --target character-detail --name 闲云 --outputDir ./output --cache
```

