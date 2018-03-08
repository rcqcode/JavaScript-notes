# JavaScript-ECS

一、示例
		for (var i = 0; i < 5; i++) {
		    setTimeout(function() {
		      console.log(new Date, i);
		    }, 1000);
		}
		console.log(new Date, i);





二、JavaScript事件循环机制

		(function test() {
		    setTimeout(function() {console.log(4)}, 0);
		    new Promise(function executor(resolve) {
		        console.log(1);
		        for( var i=0 ; i<10000 ; i++ ) {
		            i == 9999 && resolve();
		        }
		        console.log(2);
		    }).then(function() {
		        console.log(5);
		    });
		    console.log(3);
		})()
		在这段代码里面，setTimeout和Promise都被称之为任务源，来自不同任务源的回调函数会被放进不同的任务队列里面。

		setTimeout的回调函数被放进setTimeout的任务队列之中。而对于Promise,它的回调函数并不是传进去的executer函数，而是其异步执行的then方法里面的参数，被放进Promise的任务队列之中。也就是说Promise的第一个参数并不会被放进Promise的任务队列之中，而会在当前队列就执行。

		其中setTimeout和Promise的任务队列叫做macro-task(宏任务)，当然如我们所想，还有micro-task(微任务)。

		macro-task包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。

		micro-task包括：process.nextTick, Promises, Object.observe, MutationObserver

		其中上面的setImmediate和process.nextTick是Node.JS里面的API,浏览器里面并没有，这里就当举例，不必纠结具体是怎么实现的。

		事件循环的顺序是从script开始第一次循环，随后全局上下文进入函数调用栈，碰到macro-task就将其交给处理它的模块处理完之后将回调函数放进macro-task的队列之中，碰到micro-task也是将其回调函数放进micro-task的队列之中。直到函数调用栈清空只剩全局执行上下文，然后开始执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次执行macro-task中的一个任务队列，执行完之后再执行所有的micro-task，就这样一直循环。

	总结 JavaScript事件循环机制

		1、不同的任务会放进不同的任务队列之中。

		2、先执行macro-task，等到函数调用栈清空之后再执行所有在队列之中的micro-task。

		3、等到所有micro-task执行完之后再从macro-task中的一个任务队列开始执行，就这样一直循环。

		4、当有多个macro-task(micro-task)队列时，事件循环的顺序是按上文macro-task(micro-task)的分类中书写的顺序执行的。
 		
 		5、在一个任务中如果又生成新的任务，则再次放入任务队列中（往后排）；

 		6、同一个任务队列先按照优先级执行 同一个优先级则先进入先执行








