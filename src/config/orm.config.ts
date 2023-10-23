import * as dotenv from 'dotenv'
import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import {Cart, Order, Product, User} from "../online-shop/entities";

dotenv.config();

const options: Options<PostgreSqlDriver> = {
    entities: ['./dist/online-shop/entities'], // path to your JS entities (dist), relative to `baseDir`
    entitiesTs: [User, Cart, Product, Order], // path to our TS entities (src), relative to `baseDir`
    migrations: {
        path: './dist/online-shop/migrations', // path to the folder with migrations
        pathTs: './src/online-shop/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    },
    type: 'postgresql',
    seeder: {
        path: './src/online-shop/seeders', // path to the folder with seeders
        pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
        defaultSeeder: 'DatabaseSeeder', // default seeder class name
        glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
        emit: 'ts', // seeder generation mode
        fileName: (className: string) => className, // seeder file naming convention
    },
};

export default options;