// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//     });
// }
//
// timeout(10000).then((value) => {
//     console.log(value);
// });

const {
    SyncHook,
    SyncLoopHook,
    SyncBailHook,
    SyncWaterfallHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
} = require("tapable");

class Car{
    constructor(){
        this.speed = 10;
        this.hooks = {
            accelerate: new SyncHook(),
            accelerate_loop: new SyncLoopHook(),
            accelerate_bail: new SyncBailHook(),
            accelerate_waterfall: new SyncWaterfallHook(['arg1', 'arg2']),
            accelerate_async_parallel: new AsyncParallelHook(),
            accelerate_async_parallel_bail: new AsyncParallelBailHook(),
        }
    }
}

const car = new Car();

// SyncHook config
// car.hooks.accelerate.tap("accelerate1", ()=>{car.speed = car.speed + 2});
// car.hooks.accelerate.tap("accelerate2", ()=>{car.speed = car.speed + 2});
// car.hooks.accelerate.intercept({
//     register: (tapInfo)=>{
//         console.log(tapInfo);
//         return tapInfo;
//     }
// });
// car.hooks.accelerate.call();

// SyncLoopHook
// car.hooks.accelerate_loop.tap("loop1", ()=>{car.speed = car.speed + 2});
// car.hooks.accelerate_loop.call();


// sync bail hook config
// car.hooks.accelerate_bail.tap("bail1", ()=>{car.speed = car.speed + 2});
// car.hooks.accelerate_bail.tap("bail2", ()=>{car.speed = car.speed + 4});
// car.hooks.accelerate_bail.tap("bail3", ()=>{car.speed = car.speed + 6});
// car.hooks.accelerate_bail.call();

//water fall config
// car.hooks.accelerate_waterfall.tap("water_fall1", ()=>{car.speed = car.speed + 2});
// car.hooks.accelerate_waterfall.tap("water_fall2", ()=>{car.speed = car.speed + 4});
// car.hooks.accelerate_waterfall.tap("water_fall3", ()=>{car.speed = car.speed + 6});
// car.hooks.accelerate_waterfall.call();


// car.hooks.accelerate_async_parallel.tap("async_parallel_1", ()=>{car.speed = car.speed + 2});
// car.hooks.accelerate_async_parallel.tap("async_parallel_1", ()=>{car.speed = car.speed + 4});
// car.hooks.accelerate_async_parallel.promise();

car.hooks.accelerate_async_parallel_bail.tap("async_parallel_bail1", ()=>{car.speed = car.speed + 2});
car.hooks.accelerate_async_parallel_bail.tap("async_parallel_bail2", ()=>{car.speed = car.speed + 4});
car.hooks.accelerate_async_parallel_bail.callAsync();
console.log(car.speed);
