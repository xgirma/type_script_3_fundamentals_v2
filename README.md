# TypeScript 3 Fundamentals V2
Frontend Masters: TypeScript 3 Fundamentals, V2

## Introduction

### Flags

    ./node_modules/.bin/tsc src/index.ts
    
    ./node_modules/.bin/tsc src/index.ts --target ES2015
    
    node src/index.js
    
    ./node_modules/.bin/tsc src/index.ts --target ES2017 --module commonjs 
    
    node src/index.js
    
    ./node_modules/.bin/tsc src/index.ts --target ES2017 --module commonjs --watch
    
    
 Compiler options: https://www.typescriptlang.org/docs/handbook/compiler-options.html
 
 ### Configuring TypeScript
 
    ./node_modules/.bin/tsc --project tsconfig.json
    
    ...