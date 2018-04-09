语法
  arr.reduce(callback[, initialValue])


参数
  callback
    执行数组中每个值的函数，包含四个参数：
    accumulator
      累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。

    currentValue
      数组中正在处理的元素。
    currentIndex可选
      数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
    array可选
      调用reduce的数组

  initialValue可选
    用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

返回值
  函数累计处理的结果



数组里所有值的和
    var sum = [0, 1, 2, 3].reduce(function (a, b) {
      return a + b;
    }, 0);

    你也可以写成箭头函数的形式：
    var total = [ 0, 1, 2, 3 ].reduce(
      ( acc, cur ) => acc + cur,
      0
    );

将二维数组转化为一维
    var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
      function(a, b) {
        return a.concat(b);
      },
      []
    );

    你也可以写成箭头函数的形式：
    var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
     ( acc, cur ) => acc.concat(cur),
     []
    );

计算数组中每个元素出现的次数
    var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

    var countedNames = names.reduce(function (allNames, name) { 
      if (name in allNames) {
        allNames[name]++;
      }
      else {
        allNames[name] = 1;
      }
      return allNames;
    }, {});



数组去重
    let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
    let result = arr.sort().reduce((init, current)=>{
        if(init.length===0 || init[init.length-1]!==current){
            init.push(current);
        }
        return init;
    }, []);
    console.log(result); //[1,2,3,4,5]


使用reduce同时实现map和filter
    假设现在有一个数列，你希望更新它的每一项（map的功能）然后筛选出一部分（filter的功能）。如果是先使用map然后filter的话，你需要遍历这个数组两次。

    在下面的代码中，我们将数列中的值翻倍，然后挑选出那些大于50的数。
    const numbers = [10, 20, 30, 40];
    const doubledOver50 = numbers.reduce((finalList, num) => {
      num = num * 2; 
      if (num > 50) {
        finalList.push(num);
      }
      return finalList;
    }, []);
    doubledOver50; // [60, 80]
 

使用reduce匹配圆括号
    reduce的另外一个用途是能够匹配给定字符串中的圆括号。对于一个含有圆括号的字符串，我们需要知道 (和 )的数量是否一致，并且 (是否出现在 )之前。
  const isParensBalanced = (str) => {
    return str.split('').reduce((counter, char) => {
      if(counter < 0) { //matched ")" before "("
        return counter;
      } else if(char === '(') {
        return ++counter;
      } else if(char === ')') {
        return --counter;
      }  else { //matched some other char
        return counter;
      }
    }, 0); //<-- starting value of the counter
  }
  isParensBalanced('(())') // 0 <-- balanced
  isParensBalanced('(asdfds)') //0 <-- balanced
  isParensBalanced('(()') // 1 <-- not balanced
  isParensBalanced(')(') // -1 <-- not balanced



