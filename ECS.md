什么是执行上下文

	JavaScript是一个单线程语言，意味着同一时间只能执行一个任务。当JavaScript解释器初始化执行代码时， 它首先默认进入全局执行环境（execution context），从此刻开始，函数的每次调用都会创建一个新的执行环境。




执行环境的分类

	全局环境——JavaScript代码运行时首次进入的环境。
	函数环境——当函数被调用时，会进入当前函数中执行代码。
	Eval——eval内部的文本被执行时(因为eval不被鼓励使用，此处不做详细介绍)。
	执行上下文栈

	当JavaScript代码执行的时候，会进入不同的执行上下文，这些执行上下文会构成了一个执行上下文栈（Execution context stack，ECS）。栈底永远都是全局上下文，而栈顶就是当前正在执行的上下文。

	代码在执行过程时遇到以上三种执行环境的代码时，都会生成一个对应的执行上下文，压入执行上下文栈中，当栈顶的上下文执行完毕之后，会自动出栈。下面用一个例子说明。

			var a = 1;
			function fn1() {
			  function fn2() {
			   console.log(a);
			 }
			 fn2();
			}
			fn1();
			第一步，全局执行上下文入栈。

			第二步，遇到fn1(),执行代码，创建自己的执行上下文，入栈。

			第三步，fn1的上下文入栈之后，接着执行其中的代码，遇到fn2()，创建自己的执行上下文，入栈。

			第四步，在fn2的执行上下文中未创建新的执行上下文，代码执行完毕之后,fn2的执行上下文出栈。

			第五步，fn2的执行上下文出栈之后，继续执行fn1r的可执行代码，也未创建新的执行上下文，出栈。这个时候栈中只剩下全局执行上下文了。

	有5个需要记住的关键点，关于执行栈（调用栈）：

			单线程。
			同步执行。所有的执行上下文都得等到栈顶的执行之后才能顺序执行
			只有一个全局执行上下文。
			函数上下文是无限制的。
			每次函数被调用时都会创建新的执行上下文，包括调用自己。









深入了解执行上下文

	执行上下文的构成

		可以将每个执行上下文抽象为一个对象并有三个属性。

		executionContextObj = {
		    scopeChain: { /* 变量对象（variableObject）+ 所有父执行上下文的变量对象*/ }, 
		    variableObject: { /*函数 arguments/参数，内部变量和函数声明 */ }, 
		    this: {} 
		}


	执行上下文的产生

			在JavaScript解释器内部，每次调用执行上下文，分为两个阶段：

				创建阶段(此时函数被调用，但未执行内部代码)：

					设置[[Scope]]属性的值
					设置变量对象VO，创建变量，函数和参数。
					设置this的值。

				激活/代码执行阶段：

					在当前上下文上运行/解释函数代码，并随着代码一行行执行指派变量的值和函数的引用。

			创建阶段

					1.根据函数的参数，创建并初始化arguments object。

					2.扫描上下文的函数声明：对于找到的函数声明，将函数名和函数引用存入VO中，如果VO中已经有同名函数，那么就进行覆盖。

					3.扫面上下文的变量声明：对于找到的每个变量声明，将变量名存入VO中，并且将变量的值初始化为undefined。如果变量的名字已经在变量对象里存在，不会进行任何操作并继续扫描。

					要记住：函数扫描是在变量之前。

			让我们举一个栗子来说明：

			function person(age) {
			    var name = 'abby';
			    var getName = function getName() {
			    };
			    function getAge() {
			    	return age
			    }
			}
			person(20);
			首先，当我调用person(20)的时候，创建的状态是这样:

			fooExecutionContext = {
			    scopeChain: { ... },
			    variableObject: {
			        arguments: {
			            0: 20,
			            length: 1
			        },
			        age: 20,
			        getAge: pointer to function getAge(),
			        name: undefined,
			        getName: undefined,
			    },
			    this: { ... }
			}
			刚创建的时候，首先是指出函数的引用，然后按顺序对变量进行定义，初始化为undefined。当创建完成之后，执行流进入函数并且在上下文中运行/解释代码，指定函数的引用和变量的值，如下：

			fooExecutionContext = {
			    scopeChain: { ... },
			    variableObject: {
			        arguments: {
			            0: 20,
			            length: 1
			        },
			        age: 20,
			        getAge: pointer to function getAge(),
			        name: 'Abby',
			        getName: pointer to function getName(),
			    },
			    this: { ... }
			}


			
	提升（Hoisting）

	很多书上只说了变量提升是将变量提至当前上下文的最顶端，却未说明原因，现在理解了执行环境的创建、激活阶段，由此也可以解释函数、变量的提升了。