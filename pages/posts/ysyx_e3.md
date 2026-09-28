---
layout: post
title: 一生一芯学习记录（E阶段）（三）
date: 2026-09-28 16:57
categories: 一生一芯
tags: 
    - Verilog
---

# 一生一芯学习记录（E 阶段）（三）

接下来开始学习硬件描述语言Verilog，主要是记录一些语法内容和习题的答案。当然我们并不是将HDLBits上的习题全部做完，而是按照讲义内容去完成相应的习题，做昏头了，忘了有的习题不用做，主要是组合逻辑部分基本做完了，需要哪一部分自取就行。由于HDLBits是英文的，所以我会给出相应习题的中文解释。

---

## E1 硬件描述语言

这部分内容的索引按照讲义的内容和HDLBits上的顺序进行。每小节内容都有相应的标题对应。

### Getting Started

#### Getting Started
> 习题：We're going to start with a small bit of HDL to get familiar with the interface used by HDLBits. Here's the description of the circuit you need to build for this exercise:
> 
> Build a circuit with no inputs and one output. That output should always drive 1 (or logic high).
> 
> 搭建一个没有输入，只有一个输出的电路。且输出始终为`1`即高电平。

```verilog
module top_module (output one)；

    assign one = 1'b1;

endmodule
```

#### Output Zero
> 习题：Build a circuit with no inputs and one output that outputs a constant 0.
> 
> 搭建一个没有输入，只有一个输出的电路。且输出始终为`0`。

```verilog
module top_module (output zero)；

    assign zero = 1'b0;

endmodule
```

### Verilog Language

#### Basics

##### Simple wire
> 习题：Create a module with one input and one output that behaves like a wire.
> 
> 搭建一个模块，具有一个输入和一个输出，并且这个模块表现出类似一根导线的形式。

> 和物理导线不同，Verilog中的导线或其他信号是方向性的，即信息只能从一个方向流向另一个方向，连续赋值将线右侧的值赋予左侧，且会实时变化。
>
> 模块的输入和输出端口同样也是有方向性的。

```verilog
module top_module (input in, output out)；

    assign out = in;

endmodule
```

##### Four wires
> 习题：Create a module with 3 inputs and 4 outputs that behaves like wires that makes these connections:
> 
> a $\rightarrow$ w
> 
> b $\rightarrow$ x
>
> b $\rightarrow$ y
>
> c $\rightarrow$ z
> 
> 搭建一个模块，具有三个输入和四个输出，输入输出的对应关系如下：
>
> a $\rightarrow$ w
> 
> b $\rightarrow$ x
>
> b $\rightarrow$ y
>
> c $\rightarrow$ z

> 当使用`assign`进行连续赋值时，赋值的顺序对程序没有影响，本质上`assign`是表示电路的连接而不是数值的拷贝。
>
> 另外，正常情况下应该对导线进行额外的声明。因此`assign`是对已有导线的连接而不是创造导线。

```verilog
module top_module(
    input a,b,c,
    output w,x,y,z
);

    assign w = a;
    assign x = b;
    assign y = b;
    assign z = c;

endmodule
```

##### Inverter
> 习题：Create a module that implements a NOT gate.
> 
> 搭建一个具有非门功能的模块。

```verilog
module top_module(input in, output out)；

    assign out = ~in;

endmodule
```

##### AND gate
> 习题：Create a module that implements an AND gate.
> 
> 搭建一个具有与门功能的模块。

```verilog
module top_module(
    input a, 
    input b, 
    output out
)；

    assign out = a & b;

endmodule
```

##### NOR gate
> 习题：Create a module that implements a NOR gate. A NOR gate is an OR gate with its output inverted. A NOR function needs two operators when written in Verilog.
> 
> 搭建一个具有或非门功能的模块。或非门是对一个或门的输出取反。或非门用Verilog描述时需要两步。

```verilog
module top_module(
    input a,
    input b,
    output out
);

    assign out = ~(a | b);

endmodule
```

##### XNOR gate
> 习题：Create a module that implements an XNOR gate.
> 
> 搭建一个具有同或门功能的模块。

```verilog
module top_module(
    input a,
    input b,
    output out
);

    assign out = ~(a ^ b);

endmodule
```

##### Declaring wires
> 当你需要使用导线时，需要在第一次使用之前在模块体内声明。在之后的学习中将会遇到更多类似的信号。

> 习题：Implement the following circuit. Create two intermediate wires (named anything you want) to connect the AND and OR gates together. Note that the wire that feeds the NOT gate is really wire out, so you do not necessarily need to declare a third wire here. Notice how wires are driven by exactly one source (output of a gate), but can feed multiple inputs.
> 
> If you're following the circuit structure in the diagram, you should end up with four assign statements, as there are four signals that need a value assigned.
>
> ![习题](/post-images/ysyx/verilog/Declaring_wires.png)
> 
> 实现以下电路。搭建两根中间导线连接与门和或门。注意向非门供电的线是`out`，所以你不需要再声明第三根线。注意导线恰好由一个源驱动（即某个门的输出），但可以供电给多个输入端。

```verilog
module top_module(
    input a,
    input b,
    input c,
    input d,
    output out,
    output out_n
);

    wire and_1;
    wire and_2;

    assign and_1 = a & b;
    assign and_2 = c & d;
    assign out = and_1 | and_2;
    assign out_n = ~out;

endmodule
```

##### 7458 chip
> 习题：Create a module with the same functionality as the 7458 chip. It has 10 inputs and 2 outputs. You may choose to use an assign statement to drive each of the output wires, or you may choose to declare (four) wires for use as intermediate signals, where each internal wire is driven by the output of one of the AND gates. For extra practice, try it both ways.
> 
> ![习题](/post-images/ysyx/verilog/7458.png)
> 
> 搭建一个和7458芯片具有相同功能的模块。它有10个输入和2个输出。你可以选择直接利用`assign`去驱动每一个输出，或者也可以选择声明4根导线作为中继信号，每根中间线被一个与门的输出驱动。作为额外的练习，请你尝试这两种方式。

首先是直接驱动输出的写法。
```verilog
module top_module(
    input p1a, p1b, p1c, p1d, p1e, p1f,
    output p1y,
    input p2a, p2b, p2c, p2d,
    output p2y
);

    assign p1y = (p1a & p1b & p1c) | (p1d & p1e & p1f);
    assign p2y = (p2a & p2b) | (p2c & p2d);

endmodule
```
接下来是利用中间导线的写法。
```verilog
module top_module(
    input p1a, p1b, p1c, p1d, p1e, p1f,
    output p1y,
    input p2a, p2b, p2c, p2d,
    output p2y
);

    wire w1, w2, w3, w4;

    assign w1 = p1a & p1b & p1c;
    assign w2 = p1d & p1e & p1f;
    assign p1y = w1 | w2;

    assign w3 = p2a & p2b;
    assign w4 = p2c & p2d;
    assign p2y = w3 | w4;

endmodule
```

#### Vectors

##### Vectors
> 向量用于将相关的信号集合起来，更方便地进行操作。和C语言不同，声明向量的宽度需要在向量名之前。

> 习题：Build a circuit that has one 3-bit input, then outputs the same vector, and also splits it into three separate 1-bit outputs. Connect output `o0` to the input vector's position 0, `o1` to position 1, etc. 
> 
> 搭建一个电路具有3位的输入，然后输出同样形式的向量，并且将输入分成3个1位的输出。连接输出`o0`和输入向量的位置0，`o1`和位置1，等等。

```verilog
module top_module ( 
    input wire [2:0] vec,
    output wire [2:0] outv,
    output wire o2,
    output wire o1,
    output wire o0  
); 

    assign outv = vec;
    assign o0 = vec[0];
    assign o1 = vec[1];
    assign o2 = vec[2];

endmodule
```

##### Vectors in more detail
> 向量的声明格式如下：
> ```
> 类型 [最高位:最低位] 向量名
> ```
> 类型指定了向量的数据格式，通常是`wire`或`reg`。如果要声明输入和输出，也可以额外添加端口类型。
>
> 在Verilog中，一个向量一旦以某种端序被声明，就必须自始至终以同样的方式使用。
>
> 在Verilog中，线网类型的信号可以被一条`assign`语句隐式创建，也可以因为把某个未声明的标识符接到模块端口上而被隐式创建。隐式线网永远都是1位宽的wire，所以如果你本意是想用一个向量，它就会带来bug。

> 习题：Build a combinational circuit that splits an input half-word (16 bits, [15:0] ) into lower [7:0] and upper [15:8] bytes.
> 
> 搭建一个组合电路，将输入的半字（16bits）分割成低8位和高8位。

```verilog
module top_module( 
    input wire [15:0] in,
    output wire [7:0] out_hi,
    output wire [7:0] out_lo 
);

    assign out_hi = in[15:8];
    assign out_lo = in[7:0];

endmodule
```

##### Vector part select
> 习题：A 32-bit vector can be viewed as containing 4 bytes (bits [31:24], [23:16], etc.). Build a circuit that will reverse the byte ordering of the 4-byte word.
> 
> 32位向量可以按照4个字节进行访问。搭建一个电路反转4个字节的顺序。

```verilog
module top_module( 
    input [31:0] in,
    output [31:0] out 
);

    assign out[31:24] = in[7:0];
    assign out[23:16] = in[15:8];
    assign out[15:8] = in[23:16];
    assign out[7:0] = in[31:24];

endmodule
```

##### Bitwise operators
> 习题：Build a circuit that has two 3-bit inputs that computes the bitwise-OR of the two vectors, the logical-OR of the two vectors, and the inverse (NOT) of both vectors. Place the inverse of `b` in the upper half of `out_not`(i.e., bits [5:3]), and the inverse of `a` in the lower half. 
> 
> 搭建一个有两个3位输入的电路，电路用于计算两个向量的按位或，两个向量的逻辑或和两个向量取反。将`b`取反后放在`out_not`的高位，将`a`取反后放在低位。

```verilog
module top_module( 
    input [2:0] a,
    input [2:0] b,
    output [2:0] out_or_bitwise,
    output out_or_logical,
    output [5:0] out_not
);

    assign out_or_bitwise = a | b;
    assign out_or_logical = a || b;
    assign out_not[2:0] = ~a;
    assign out_not[5:3] = ~b;

endmodule
```

##### Four-input gates
> 习题：Build a combinational circuit with four inputs,`in[3:0]`.
> 
> There are 3 outputs:
> - out_and: output of a 4-input AND gate.
> - out_or: output of a 4-input OR gate.
> - out_xor: output of a 4-input XOR gate.
> 
> 搭建一个有4个输入的组合逻辑电路，用`in[3:0]`表示。
>
> 有3个输出：
> - out_and：4输入与门的输出
> - out_or：4输入或门的输出
> - out_xor：4输入异或门的输出

```verilog
module top_module( 
    input [3:0] in,
    output out_and,
    output out_or,
    output out_xor
);

    assign out_and = in[3] && in[2] && in[1] && in[0];
    assign out_or = in[3] || in[2] || in[1] || in[0];
    assign out_xor = in[3] ^ in[2] ^ in[1] ^ in[0];

endmodule
```

##### Vector concatenation operator
> 拼接操作符`{a, b, c}`用于将小的向量拼接成更大的向量。拼接时需要知道每个分量的宽度。拼接操作符可以用于连续赋值的左值和右值。

> 习题：Given several input vectors, concatenate them together then split them up into several output vectors. There are six 5-bit input vectors: a, b, c, d, e, and f, for a total of 30 bits of input. There are four 8-bit output vectors: w, x, y, and z, for 32 bits of output. The output should be a concatenation of the input vectors followed by two 1 bits。
> 
> 给出一些输入向量，把它们拼接在一起然后分割成一些输出向量。有6个5位输入向量：a，b，c，d，e，f，总共30位的输入。有4个8位的输出向量：w，x，y，z，总共32位的输出。输出应该是输入向量的拼接和最后拼接的两个1。

```verilog
module top_module (
    input [4:0] a, b, c, d, e, f,
    output [7:0] w, x, y, z 
);

    assign {w, x, y, z} = {a, b, c, d, e, f, 2'b11};

endmodule
```

##### Vector reversal 1
> 习题：Given an 8-bit input vector [7:0], reverse its bit ordering.
> 
> 给出一个8位的输入向量，逆转它的顺序。

```verilog
module top_module( 
    input [7:0] in,
    output [7:0] out
);
    assign out = {in[0], in[1], in[2], in[3], in[4], in[5], in[6], in[7]};

endmodule
```

##### Replication operator
> 如果要将重复的向量拼接成一个更大的向量，采用上面的方法就显得过于冗长，因此，可以采用下面这种方式对重复的向量进行拼接。
> ```
> {num{vector}}
> ```

> 习题：Build a circuit that sign-extends an 8-bit number to 32 bits. This requires a concatenation of 24 copies of the sign bit (i.e., replicate bit[7] 24 times) followed by the 8-bit number itself.
> 
> 搭建一个电路用于将8位数字符号扩展到32位。这要求将8位数字的符号位扩展24次。

```verilog
module top_module (
    input [7:0] in,
    output [31:0] out 
);

    assign out = { {24{in[7]}}, in };

endmodule
```

##### More replecation
> 习题：Given five 1-bit signals (a, b, c, d, and e), compute all 25 pairwise one-bit comparisons in the 25-bit output vector. The output should be 1 if the two bits being compared are equal.
> 
> 给定五个1位向量，计算25对1位向量相比的结果。如果两个向量相等，那么输出应该是`1`。

```verilog
module top_module (
    input a, b, c, d, e,
    output [24:0] out 
);
    
    assign out = ~( { {5{a}}, {5{b}}, {5{c}}, {5{d}}, {5{e}} } ^ {5{a, b, c, d, e}} );

endmodule
```

#### Modules: Hierarchy

##### Modules
> 将多个模块连接起来形成层级时，有两种方法，一种是根据位置，另一种是根据名字。根据位置连接类似于C语言调用函数的写法。根据名字调用则类似于下面这种写法。
> ```verilog
> mod_a instance2 ( .out(wc), .in1(wa), .in2(wb) );
> ```

> 习题：You may connect signals to the module by port name or port position. For extra practice, try both methods.
>
> 通过端口名字或端口位置连接信号和模块。作为额外练习，采用两种方式。

两种方法直接写在同一个顶层模块中：
```verilog
module top_module ( input a, input b, output out );

    mod_a ( a, b, c );
    mod_a ( .in1(a), .in2(b), .out(out) );

endmodule
```

##### Connecting ports by position
> 习题：You are given a module named `mod_a` that has 2 outputs and 4 inputs, in that order. You must connect the 6 ports by position to your top-level module's ports `out1`, `out2`, `a`, `b`, `c`, and `d`, in that order.
> 
> You are given the following module:
> ```verilog
> module mod_a ( output, output, input, input, input, input );
> ```
>
> 已经给出名为`mod_a`的模块，这个模块有2个输出和4个输入，顺序如下。你需要将6个接口按照位置连接到顶层模块的端口。

```verilog
module top_module ( 
    input a, 
    input b, 
    input c,
    input d,
    output out1,
    output out2
);

    mod_a ( out1, out2, a, b, c, d );

endmodule
```

##### Connecting ports by name
> 习题：You are given a module named mod_a that has 2 outputs and 4 inputs, in some order. You must connect the 6 ports by name to your top-level module's ports:
> 
> | Port | Port in mod_a | Port in top_module |
> | :---: | :---: | :---: |
> | output | out1 | out1 |
> | output | out2 |	out2 |
> | input | in1 | a |
> | input | in2	| b |
> | input | in3	| c |
> | input | in4	| d |
>
> 已经给出名为`mod_a`的模块，这个模块有2个输出和4个输入，顺序如下。你需要将6个接口按照名字连接到顶层模块的端口。

```verilog
module top_module ( 
    input a, 
    input b, 
    input c,
    input d,
    output out1,
    output out2
);
	
    mod_a( .in1(a), .in2(b), .in3(c), .in4(d), .out1(out1), .out2(out2) );

endmodule
```

##### Three modules
> 习题：You are given a module `my_dff` with two inputs and one output (that implements a D flip-flop). Instantiate three of them, then chain them together to make a shift register of length 3. The `clk` port needs to be connected to all instances.
>
> The module provided to you is: `module my_dff ( input clk, input d, output q );`
> 
> Note that to make the internal connections, you will need to declare some wires. Be careful about naming your wires and module instances: the names must be unique.
> 
> 已经给出模块`my_dff`，有2个输入和1个输出。实例化3个这样的模块将它们连接起来形成一个长度为3的移位寄存器。`clk`接口需要连到所有的实体上。
>
> 在内部连线时可能会需要声明一些导线。注意导线和实例化的模块的名字必须是独一无二的。

```verilog
module top_module ( input clk, input d, output q );

    wire q1, q2;
    my_dff d1 ( clk, d, q1 );
    my_dff d2 ( clk, q1, q2);
    my_dff d3 ( clk, q2, q);

endmodule
```

##### Modules and vectors
> 习题：You are given a module `my_dff8` with two inputs and one output (that implements a set of 8 D flip-flops). Instantiate three of them, then chain them together to make a 8-bit wide shift register of length 3. In addition, create a 4-to-1 multiplexer (not provided) that chooses what to output depending on `sel[1:0]`: The value at the input d, after the first, after the second, or after the third D flip-flop. (Essentially, `sel` selects how many cycles to delay the input, from zero to three clock cycles.)
> 
> The module provided to you is: `module my_dff8 ( input clk, input [7:0] d, output [7:0] q );`
> 
> The multiplexer is not provided. One possible way to write one is inside an always block with a case statement inside.
>
> 给定一个模块`my_dff8`，它有2个输入和1个输出。实例化3个这样的模块，然后把它们连接起来形成一个8位的长度为3的移位寄存器。另外，搭建一个4选1多路选择器依靠`sel[1:0]`选择输出，选择的值分别是输入的d，第一个D触发器，第二个D触发器和第三个D触发器的输出。

```verilog
module top_module ( 
    input clk, 
    input [7:0] d, 
    input [1:0] sel, 
    output [7:0] q 
);
    
    wire [7:0] q1, q2, q3;
    
    my_dff8 d1 ( clk, d, q1 );
    my_dff8 d2 ( clk, q1, q2);
    my_dff8 d3 ( clk, q2, q3);
    
    always @(*)begin
        case(sel)
            2'b11:q = q3;
            2'b10:q = q2;
            2'b01:q = q1;
            2'b00:q = d;
        endcase
    end
        
endmodule
```

##### Adder1
> 习题：You are given a module `add16` that performs a 16-bit addition. Instantiate two of them to create a 32-bit adder. One add16 module computes the lower 16 bits of the addition result, while the second add16 module computes the upper 16 bits of the result, after receiving the carry-out from the first adder. Your 32-bit adder does not need to handle carry-in (assume 0) or carry-out (ignored), but the internal modules need to in order to function correctly. (In other words, the `add16` module performs 16-bit a + b + cin, while your module performs 32-bit a + b).
> 
> Connect the modules together as shown in the diagram below. The provided module `add16` has the following declaration: `module add16 ( input[15:0] a, input[15:0] b, input cin, output[15:0] sum, output cout );`
>
> 给定模块`add16`是一个16位加法器。实例化2个这样的模块搭建一个32位加法器。一个16位加法器计算结果的低16位，另一个加法器在接受来自第一个加法器的进位后计算出结果的高16位。32位加法器不需要处理来自低位的进位和产生的高位的进位，但是内部逻辑要求正确。

```verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);

	wire out1;
    add16 a1 ( a[15:0], b[15:0], 0, sum[15:0], out1 );
    add16 a2 ( a[31:16], b[31:16], out1, sum[31:16], );
    
endmodule
```

##### Adder2
> 习题：In this exercise, you will create a circuit with two levels of hierarchy. Your `top_module` will instantiate two copies of `add16` (provided), each of which will instantiate 16 copies of `add1` (which you must write). Thus, you must write two modules: `top_module` and `add1`.
>
> 在这个练习中，你需要搭建一个2个层次的电路。你的`top_module`模块将会实例化2个`add16`（已提供），每个`add16`将会实例化16个`add1`（需要你完成）。

```verilog
module top_module (
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);

	wire out1;
    add16 a1 ( a[15:0], b[15:0], 0, sum[15:0], out1 );
    add16 a2 ( a[31:16], b[31:16], out1, sum[31:16], );
    
endmodule

module add1 ( input a, input b, input cin, output sum, output cout );

    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (b & cin) | (a & cin);

endmodule
```

##### Carry-select adder
> 习题：In this exercise, you are provided with the same module `add16` as the previous exercise, which adds two 16-bit numbers with carry-in and produces a carry-out and 16-bit sum. You must instantiate three of these to build the carry-select adder, using your own 16-bit 2-to-1 multiplexer.
> 
> Connect the modules together as shown in the diagram below. The provided module `add16` has the following declaration:
> ```verilog
> module add16 ( input[15:0] a, input[15:0] b, input cin, output[15:0] sum, output cout );
> ```
> ![习题](/post-images/ysyx/verilog/Carry-select_adder.png)
> 
> 在这个练习中，提供了和之前练习相同的含有16位加法器，将2个16位数字相加求和得到16位数，并且包含进位输入和进位输出。你需要实例化3个这样的模块来搭建一个进位选择加法器，使用你自己的16位二选一多路选择器。

```verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    output [31:0] sum
);
    
	wire cout;
    wire [15:0] a2sum;
    wire [15:0] a3sum;
    
    add16 a1 ( a[15:0], b[15:0], 0, sum[15:0], cout);
    add16 a2 ( a[31:16], b[31:16], 0, a2sum, );
    add16 a3 ( a[31:16], b[31:16], 1, a3sum, );
    
    multiplexer ( a2sum, a3sum, cout, sum[31:16] );
    
endmodule

module multiplexer (
    input [15:0] a,
    input [15:0] b,
    input sel,
    output reg [15:0] out
);
    
    always @(*)begin
        if(sel == 0)begin
            out = a;
        end
        else begin
            out = b;
        end
    end

endmodule
```

##### Adder-subtractor
> 习题：Build the adder-subtractor below.
> 
> You are provided with a 16-bit adder module, which you need to instantiate twice:
> ```verilog
> module add16 ( input[15:0] a, input[15:0] b, input cin, output[15:0] sum, output cout );
> ```
> ![习题](/post-images/ysyx/verilog/Adder-subtractor.png)
> 
> 搭建下面的加减法器。

```verilog
module top_module(
    input [31:0] a,
    input [31:0] b,
    input sub,
    output [31:0] sum
);
	wire cout;
    reg [31:0] bin;
    
    always @(*)begin
        if(sub == 1'b1)begin
            bin = b ^ {32{sub}};
        end
        else begin
            bin = b;
        end
    end
    
    add16 a1 ( a[15:0], bin[15:0], sub, sum[15:0], cout );
    add16 a2 ( a[31:16], bin[31:16], cout, sum[31:16], );
    
endmodule
```

#### Procedures

##### Always blocks (combinational)
> 在组合逻辑块中始终使用敏感列表`(*)`，为了防止漏掉信号。
>
> 在`assign`语句中左值必须是net类型的，比如`wire`；而在过程块中的赋值的左值必须是变量类型的，比如`reg`。

> 习题：Build an AND gate using both an assign statement and a combinational always block.
>
> 使用`assign`语句和组合逻辑块实现与门。

直接写在同一个`module`中。
```verilog
module top_module(
    input a, 
    input b,
    output wire out_assign,
    output reg out_alwaysblock
);
    
	assign out_assign = a && b;
    
    always @(*)begin
        out_alwaysblock = a && b;
    end
    
endmodule
```

##### Always blocks (clocked)
> Verilog中有3种赋值：
> - 连续赋值(`assign x = y`)。只能用于过程块外面。
> - 阻塞赋值(`x = y`)。只能用在过程块中。
> - 非阻塞赋值(`x <= y`)。只能用在过程块中。
>
> 在组合逻辑块中，使用阻塞赋值；在时序逻辑块中，使用非阻塞赋值。

> 习题：Build an XOR gate three ways, using an assign statement, a combinational always block, and a clocked always block. Note that the clocked always block produces a different circuit from the other two: There is a flip-flop so the output is delayed.
> 
> 用3种方法搭建一个异或门，即连续赋值，组合逻辑块和时序逻辑块。注意，由于时序逻辑块种有触发器，所以输出会有延迟，因此电路和其他两个不同。

```verilog
module top_module(
    input clk,
    input a,
    input b,
    output wire out_assign,
    output reg out_always_comb,
    output reg out_always_ff   
);

    assign out_assign = a ^ b;
    
    always @(*)begin
        out_always_comb = a ^ b;
    end
    
    always @(posedge clk)begin
        out_always_ff = a ^ b;
    end
    
endmodule
```

##### If statement
> 习题：Build a 2-to-1 mux that chooses between `a` and `b`. Choose `b` if both `sel_b1` and `sel_b2` are true. Otherwise, choose `a`. Do the same twice, once using assign statements and once using a procedural if statement.
>
> 搭建一个二选一多路选择器。当`sel_b1`和`sel_b2`同时为真时选择`b`，否则选择`a`。完成两次，一次使用连续赋值，一次使用过程块。

```verilog
module top_module(
    input a,
    input b,
    input sel_b1,
    input sel_b2,
    output wire out_assign,
    output reg out_always   
); 
	
    assign out_assign = (sel_b1 && sel_b2) ? b : a;
    
    always @(*)begin
        if(sel_b1 && sel_b2)begin
            out_always = b;
        end
        else begin
            out_always = a;
        end
    end
    
endmodule
```

##### If statement latchs
> 组合逻辑电路在任何情况下都需要给所有的输出指定一个值。这样才不会额外引入不必要的锁存器。

> 习题：The following code contains incorrect behaviour that creates a latch. Fix the bugs so that you will shut off the computer only if it's really overheated, and stop driving if you've arrived at your destination or you need to refuel.
> ```verilog
> always @(*) begin
>     if (cpu_overheated)
>        shut_off_computer = 1;
> end
> 
> always @(*) begin
>     if (~arrived)
>        keep_driving = ~gas_tank_empty;
> end
> ```
> 下面的代码错误地产生了锁存器。修改这些bug，从而你可以只有在过热的时候关闭电脑；当你到达目的地时或者没有燃料时停止前进。

```verilog
module top_module (
    input      cpu_overheated,
    output reg shut_off_computer,
    input      arrived,
    input      gas_tank_empty,
    output reg keep_driving  
); 

    always @(*) begin
        if (cpu_overheated)
           shut_off_computer = 1;
        else shut_off_computer = 0;
    end

    always @(*) begin
        if (~arrived)
           keep_driving = ~gas_tank_empty;
        else keep_driving = 0;
    end

endmodule
```

##### Case statement
> 习题：Case statements are more convenient than if statements if there are a large number of cases. So, in this exercise, create a 6-to-1 multiplexer. When sel is between 0 and 5, choose the corresponding data input. Otherwise, output 0. The data inputs and outputs are all 4 bits wide.
> 
> Be careful of inferring latches.
>
> 如果有大量的情况下，case语句比if语句更加方便。因此，在本练习中，搭建一个6选1多路选择器。当sel在0到5之间时，选择相对应的数据输出，否则输出0。输入数据和输出数据都是4位的。

```verilog
module top_module ( 
    input [2:0] sel, 
    input [3:0] data0,
    input [3:0] data1,
    input [3:0] data2,
    input [3:0] data3,
    input [3:0] data4,
    input [3:0] data5,
    output reg [3:0] out   
);

    always@(*) begin
        case(sel)
            3'd0: out = data0;
            3'd1: out = data1;
            3'd2: out = data2;
            3'd3: out = data3;
            3'd4: out = data4;
            3'd5: out = data5;
            default: out = 0;
        endcase
    end

endmodule
```

##### Priority encoder
> 习题：Build a 4-bit priority encoder. For this problem, if none of the input bits are high (i.e., input is zero), output zero. Note that a 4-bit number has 16 possible combinations.
>
> 搭建一个4位优先编码器。在这个问题中，如果输入的数据中没有高电平，则输出是0.注意4位数有16中可能的组合。

```verilog
module top_module (
    input [3:0] in,
    output reg [1:0] pos  
);	
    
    always @(*)begin
    	case(in)
      	  	4'd0: pos = 2'd0;
      	  	4'd1: pos = 2'd0;
      	  	4'd2: pos = 2'd1;
        	4'd3: pos = 2'd0;
        	4'd4: pos = 2'd2;
        	4'd5: pos = 2'd0;
        	4'd6: pos = 2'd1;
        	4'd7: pos = 2'd0;
        	4'd8: pos = 2'd3;
        	4'd9: pos = 2'd0;
        	4'd10: pos = 2'd1;
        	4'd11: pos = 2'd0;
        	4'd12: pos = 2'd2;
        	4'd13: pos = 2'd0;
        	4'd14: pos = 2'd1;
        	4'd15: pos = 2'd0;
    	endcase
    end
    
endmodule
```

##### Priority encoder with casez
> 习题：Build a priority encoder for 8-bit inputs. Given an 8-bit vector, the output should report the first (least significant) bit in the vector that is 1. Report zero if the input vector has no bits that are high. 
>
> 搭建一个8位输入的优先编码器。指定一个8位向量，输出向量中最低位为1的位置。如果没有1，则输出0。

```verilog
module top_module (
    input [7:0] in,
    output reg [2:0] pos 
);
	
    always @(*)begin
        casez(in)
            8'bzzzzzzz1: pos = 0;
            8'bzzzzzz10: pos = 1;
            8'bzzzzz100: pos = 2;
            8'bzzzz1000: pos = 3;
            8'bzzz10000: pos = 4;
            8'bzz100000: pos = 5;
            8'bz1000000: pos = 6;
            8'b10000000: pos = 7;
            default: pos = 0;
        endcase
    end
    
endmodule
```

##### Avoiding latches
> 习题：Suppose you're building a circuit to process scancodes from a PS/2 keyboard for a game. Given the last two bytes of scancodes received, you need to indicate whether one of the arrow keys on the keyboard have been pressed. This involves a fairly simple mapping, which can be implemented as a case statement (or if-elseif) with four cases.
>
> | Scancode [15:0] | Arrow key |
> | :---: | :---: |
> | 16'he06b | left arrow |
> | 16'he072 | down arrow |
> | 16'he074 | right arrow |
> | 16'he075 | up arrow |
> | Anything else |	none |
> 
> Your circuit has one 16-bit input, and four outputs. Build this circuit that recognizes these four scancodes and asserts the correct output.
>
> 假设你正在搭建一个电路从PS/2的键盘处理扫描码。给定收到的扫描码的最后两位，你需要指出是否有方向键被按下。这涉及一个简单的映射，用一个case语句即可实现。
> 
> 你的电路有一个16位的输入和4个输出。搭建这个电路区分4个扫描码并且给出正确的输出。

> 为了避免创建锁存器，你可以给所有的输出一个默认的初始值。这样除了case引起输出的变化外，其他的输出保持这个初始值不变。

```verilog
module top_module (
    input [15:0] scancode,
    output reg left,
    output reg down,
    output reg right,
    output reg up  
); 

    always @(*)begin
        left = 1'b0;
        down = 1'b0;
        right = 1'b0;
        up = 1'b0;
        
        case(scancode)
            16'he06b: left = 1'b1;
            16'he072: down = 1'b1;
            16'he074: right = 1'b1;
            16'he075: up = 1'b1;
        endcase
    end
              
endmodule
```

#### More Verilog Features

##### Conditional ternary operator
> 习题：Given four unsigned numbers, find the minimum. Unsigned numbers can be compared with standard comparison operators (a < b). Use the conditional operator to make two-way min circuits, then compose a few of them to create a 4-way min circuit. You'll probably want some wire vectors for the intermediate results.
>
> 给出4个无符号数，找到最小值。无符号数可以用标准比较运算符进行比较。用条件运算符去搭建两路最小电路。然后用它们搭建4路最小电路。你可能会需要一些线向量作为中间结果。

```verilog
module top_module (
    input [7:0] a, b, c, d,
    output [7:0] min
);
    
    wire [7:0] min1;
    wire [7:0] min2;
    
    assign min1 = ( ( a < b ) ? a : b );
    assign min2 = ( ( min1 < c ) ? min1 : c );
    assign min = ( ( min2 < d ) ? min2 : d );
    
endmodule
```

##### Reduction operator
> 缩减运算符可以对向量中每个bit进行与，或和异或的操作。
>
> 这些操作符是一元操作符，你也可以将它们的输出反转，搭建成与非，或非和同或的门。

> 习题：Parity checking is often used as a simple method of detecting errors when transmitting data through an imperfect channel. Create a circuit that will compute a parity bit for a 8-bit byte (which will add a 9th bit to the byte). We will use "even" parity, where the parity bit is just the XOR of all 8 data bits.
>
> 奇偶校验经常被用来作为在不可靠的信道中传输数据时用来发现错误的简单方法。搭建一个用来计算一个8位数据的奇偶校验码的电路。我们将会用偶校验，即全部8个bit的异或。

```verilog
module top_module (
    input [7:0] in,
    output parity
);
    
    assign parity = ^ in[7:0];

endmodule
```

##### Reduction: Even wider gates
> 习题：Build a combinational circuit with 100 inputs, `in[99:0]`.
> 
> There are 3 outputs:
> - out_and: output of a 100-input AND gate.
> - out_or: output of a 100-input OR gate.
> - out_xor: output of a 100-input XOR gate.
>
> 搭建一个有100个输入的组合电路。
>
> 有3个输出：
> - 100个输入的与门的输出。
> - 100个输入的或门的输出。
> - 100个输入的异或门的输出。

```verilog
module top_module( 
    input [99:0] in,
    output out_and,
    output out_or,
    output out_xor 
);
	
    assign out_and = & in;
    assign out_or = | in;
    assign out_xor = ^ in;
    
endmodule
```

##### Combinational for-loop: Vector reversal 2
> 习题：Given a 100-bit input vector [99:0], reverse its bit ordering.
>
> 给出一个100bit的输入向量，调转每个bit的顺序。

```verilog
module top_module (
	input [99:0] in,
	output reg [99:0] out
);
	
	always @(*)begin
		int i;
        for (i = 0; i < 100; i = i + 1)
            out[i] = in[99-i];
    end
	
endmodule
```

在本题的官方答案中使用了一个函数`$bits()`，这个函数可以返回一个信号的宽度。

##### Combinational for-loop: 255-bit population count
> 习题：A "population count" circuit counts the number of '1's in an input vector. Build a population count circuit for a 255-bit input vector.
>
> 人口计数电路统计一个输入向量中有多少个`1`。搭建一个255位输入向量的人口计数电路。

```verilog
module top_module( 
    input [254:0] in,
    output [7:0] out 
);
	
    always @(*)begin
        int i;
        out = 1'b0;
        for (i = 0; i < 255; i = i + 1)
            if (in[i])
                out = out + 1'b1;
    end
    
endmodule
```

##### Generate for-loop: 100-bit binary adder 2
> 习题：Create a 100-bit binary ripple-carry adder by instantiating 100 full adders. 
>
> 通过实例化100个全加器，搭建一个100位二进制行波进位加法器。

```verilog
module top_module( 
    input [99:0] a, b,
    input cin,
    output [99:0] cout,
    output [99:0] sum 
);
    
    full_adder (a[0], b[0], cin, cout[0], sum[0]);
    genvar i;
    generate
        for(i = 1; i < 100; i = i + 1) begin : adder
            full_adder (a[i], b[i], cout[i-1], cout[i], sum[i]);
        end
    endgenerate
    
endmodule

module full_adder(
    input a,
    input b,
    input cin,
    output cout,
    output sum
);
    
    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (b & cin) | (a & cin);
    
endmodule
```

这个程序如果出现报错的话，大概率出现在`for`循环那一行，实际上是由于含声明的生成块必须具名。

##### Generate for-loop : 100-digit BCD adder
> 习题：You are provided with a BCD one-digit adder named `bcd_fadd` that adds two BCD digits and carry-in, and produces a sum and carry-out.
>
> Instantiate 100 copies of `bcd_fadd` to create a 100-digit BCD ripple-carry adder. Your adder should add two 100-digit BCD numbers (packed into 400-bit vectors) and a carry-in to produce a 100-digit sum and carry out.
>
> 已经提供给你了一个1个十进制数的BCD加法器，它将两个BCD数字和进位相加，然后产生一个求和值和进位。
>
> 实例化100个加法器搭建一个100个十进制数BCD的行波进位加法器。你的加法器应该将两个100十进制的BCD数字和进位相加得到100个十进制数的求和值和进位输出。

```verilog
module top_module( 
    input [399:0] a, b,
    input cin,
    output cout,
    output [399:0] sum 
);

    wire [99:0] cout_temp;
    
    bcd_fadd (a[3:0], b[3:0], cin, cout_temp[0], sum[3:0]);
    
    genvar i;
    generate
        for(i = 4; i < 400; i = i + 4) begin : bcd
            bcd_fadd (a[(i+3):i], b[(i+3):i], cout_temp[i/4-1], cout_temp[i/4], sum[(i+3):i]);
        end
    endgenerate
    
    assign cout = cout_temp[99];
    
endmodule
```

### Circuits

#### Combinational Logic

##### Basic Gates

###### Wire
> 习题：Implement the following circuit:
>
> ![习题](/post-images/ysyx/verilog/wire.png)
>
> 搭建以下电路

```verilog
module top_module (
    input in,
    output out
);

    assign out = in;

endmodule
```

###### GND
> 习题：Implement the following circuit:
>
> ![习题](/post-images/ysyx/verilog/GND.png)
>
> 搭建以下电路

```verilog
module top_module (
    output out
);
    
    assign out = 1'b0;

endmodule
```

###### NOR
> 习题：Implement the following circuit:
>
> ![习题](/post-images/ysyx/verilog/NOR.png)
>
> 搭建以下电路

```verilog
module top_module (
    input in1,
    input in2,
    output out
);
	
    assign out = ~(in1 | in2);
    
endmodule
```

###### Another gate
> 习题：Implement the following circuit:
>
> ![习题](/post-images/ysyx/verilog/Another_gate.png)
>
> 搭建以下电路

```verilog
module top_module (
    input in1,
    input in2,
    output out
);
    
    assign out = in1 & (~in2);

endmodule
```

###### Two gates
> 习题：Implement the following circuit:
>
> ![习题](/post-images/ysyx/verilog/Two_gates.png)
>
> 搭建以下电路

```verilog
module top_module (
    input in1,
    input in2,
    input in3,
    output out
);
    
    assign out = (~(in1 ^ in2)) ^ in3;

endmodule
```

###### More logic gates
> 习题：Ok, let's try building several logic gates at the same time. Build a combinational circuit with two inputs, `a` and `b`.
> 
> There are 7 outputs, each with a logic gate driving it:
> - out_and: a and b
> - out_or: a or b
> - out_xor: a xor b
> - out_nand: a nand b
> - out_nor: a nor b
> - out_xnor: a xnor b
> - out_anotb: a and-not b
>
> 接下来一次性搭建多个逻辑门。搭建一个组合逻辑电路，有两个输入，7个输出，包括与、或、异或、与非、或非、同或等。最后这个是`a`与`~b`。

```verilog
module top_module( 
    input a, b,
    output out_and,
    output out_or,
    output out_xor,
    output out_nand,
    output out_nor,
    output out_xnor,
    output out_anotb
);

    assign out_and = a & b;
    assign out_or = a | b;
    assign out_xor = a ^ b;
    assign out_nand = ~(a & b);
    assign out_nor = ~(a | b);
    assign out_xnor = ~(a ^ b);
    assign out_anotb = a & (~b);
    
endmodule
```

###### 7420 chip
> 习题：The 7400-series integrated circuits are a series of digital chips with a few gates each. The 7420 is a chip with two 4-input NAND gates.
> 
> Create a module with the same functionality as the 7420 chip. It has 8 inputs and 2 outputs.
> 
> ![习题](/post-images/ysyx/verilog/7420.png)
>
> 7400系列集成电路是一系列有若干门电路的数字芯片。7420有2个4输入与非门。
>
> 搭建一个与7420芯片有相同功能的电路，它有8个输入和2个输出。

```verilog
module top_module ( 
    input p1a, p1b, p1c, p1d,
    output p1y,
    input p2a, p2b, p2c, p2d,
    output p2y 
);

    assign p1y = ~(p1a & p1b & p1c & p1d);
    assign p2y = ~(p2a & p2b & p2c & p2d);
    
endmodule
```

###### Truth tables
> 习题：
> | Row number | Inputs x3 x2 x1 | Outputs f |
> | :---: | :---: | :---: |
> | 0 | 0 0 0 | 0 |
> | 1 | 0 0 1 | 0 |
> | 2 | 0 1 0 | 1 |
> | 3 | 0 1 1 | 1 |
> | 4 | 1 0 0 | 0 |
> | 5 | 1 0 1 | 1 |
> | 6 | 1 1 0 | 0 |
> | 7 | 1 1 1 | 1 |
>
> Create a combinational circuit that implements the above truth table.
>
> 搭建一个组合逻辑电路，符合上面的真值表。

```verilog
module top_module( 
    input x3,
    input x2,
    input x1,
    output f
);
	
    assign f = (x1 & x3) | (x2 & (~x3));
    
endmodule
```

###### Two-bit equality
> 习题：Create a circuit that has two 2-bit inputs `A[1:0]` and `B[1:0]`, and produces an output `z`. The value of `z` should be 1 if `A = B`, otherwise `z` should be 0.
>
> 搭建一个电路有两个输入和一个输出。当输入相等时输出为1，否则为0。

```verilog
module top_module ( input [1:0] A, input [1:0] B, output z ); 

    assign z = (A == B);
    
endmodule
```

###### Simple circuit A
> 习题：Module A is supposed to implement the function `z = (x^y) & x`. Implement this module.
>
> 模块A实现了`z = (x^y) & x`这个逻辑式，实现这个模块。

```verilog
module top_module (input x, input y, output z);

    assign z = (x ^ y) & x;
    
endmodule
```

###### Simple circuit B
> 习题：Circuit B can be described by the following simulation waveform:
> 
> ![习题](/post-images/ysyx/verilog/Simple_circuit_B.png)
>
> Implement this circuit.
>
> 电路B可以描述成下面的仿真波形图，实现这个电路。

很容易的看出电路B是同或电路。
```verilog
module top_module ( input x, input y, output z );
	
    assign z = ~(x ^ y);
    
endmodule
```

###### Combine circuits A and B
> 习题：The top-level design consists of two instantiations each of subcircuits A and B, as shown below.
>
> ![习题](/post-images/ysyx/verilog/Combine_circuits_A_and_B.png)
>
> Implement this circuit.
>
> 顶层模块由实例化两个子模块A和B组成，如图所示。实现这个电路。

```verilog
module top_module (input x, input y, output z);
	
    wire z1, z2, z3, z4;
    module_a a1 (x, y, z1);
    module_b b1 (x, y, z2);
    module_a a2 (x, y, z3);
    module_b b2 (x, y, z4);
    assign z = (z1 | z2) ^ (z3 & z4);
    
endmodule

module module_a (input x, input y, output z);

    assign z = (x ^ y) & x;
    
endmodule

module module_b ( input x, input y, output z );
	
    assign z = ~(x ^ y);
    
endmodule
```

###### Ring or vibrate?
> 习题：Suppose you are designing a circuit to control a cellphone's ringer and vibration motor. Whenever the phone needs to ring from an incoming call (`input ring`), your circuit must either turn on the ringer (`output ringer = 1`) or the motor (`output motor = 1`), but not both. If the phone is in vibrate mode (`input vibrate_mode = 1`), turn on the motor. Otherwise, turn on the ringer.
>
> 假设你正在设计一个电路控制电话铃声和震动马达。每当来电话需要响铃的时候，你的电路必须响铃或者马达震动，但是不能同时进行。如果电话处于震动模式，就打开马达。否则响铃。

```verilog
module top_module (
    input ring,
    input vibrate_mode,
    output ringer,
    output motor
);

    assign ringer = ring & (~vibrate_mode);
    assign motor = ring & vibrate_mode;
    
endmodule
```

###### Thermostat
> 习题：A heating/cooling thermostat controls both a heater (during winter) and an air conditioner (during summer). Implement a circuit that will turn on and off the heater, air conditioning, and blower fan as appropriate.
> 
> The thermostat can be in one of two modes: heating (`mode = 1`) and cooling (`mode = 0`). In heating mode, turn the heater on when it is too cold (`too_cold = 1`) but do not use the air conditioner. In cooling mode, turn the air conditioner on when it is too hot (`too_hot = 1`), but do not turn on the heater. When the heater or air conditioner are on, also turn on the fan to circulate the air. In addition, the user can also request the fan to turn on (`fan_on = 1`), even if the heater and air conditioner are off.
> 
> Try to use only `assign` statements, to see whether you can translate a problem description into a collection of logic gates.
>
> 一个冷热恒温器控制一个加热器和一个空调，实现一个电路可以打开和关闭加热器以及空调，并且在合适的时候打开风扇。
>
> 恒温器处于两个模式之一：加热模式和制冷模式。在加热模式下，当特别冷的时候打开加热器并且不使用空调。在制冷模式下，当特别热的时候打开空调并且不使用加热器。当加热器或空调打开的时候，同时打开风扇循环空气。此外，即使加热器和空调都是关闭的，用户也可以要求打开风扇。
>
> 尝试只用`assign`语句，看看你如何将一个问题描述成一系列逻辑门。

```verilog
module top_module (
    input too_cold,
    input too_hot,
    input mode,
    input fan_on,
    output heater,
    output aircon,
    output fan
); 
	
    assign heater = mode & too_cold;
    assign aircon = (~mode) & too_hot;
    assign fan = heater | aircon | fan_on;
        
endmodule
```

###### 3-bit population count
> 习题：A "population count" circuit counts the number of '1's in an input vector. Build a population count circuit for a 3-bit input vector.
>
> 人口计数电路计算一个输入向量中`1`的个数。搭建一个输入向量是3位的人口计数电路。

```verilog
module top_module( 
    input [2:0] in,
    output [1:0] out 
);
    
    always @(*) begin
        int i;
        out = 0;
        for (i = 0; i < 3; i = i + 1) begin
            out = out + in[i];
        end
    end

endmodule
```

###### Gates and vectors
> 习题：You are given a four-bit input vector `in[3:0]`. We want to know some relationships between each bit and its neighbour:
> - out_both: Each bit of this output vector should indicate whether both the corresponding input bit and its neighbour to the left (higher index) are '1'. For example, `out_both[2]` should indicate if `in[2]` and `in[3]` are both 1. Since `in[3]` has no neighbour to the left, the answer is obvious so we don't need to know `out_both[3]`.
> - out_any: Each bit of this output vector should indicate whether any of the corresponding input bit and its neighbour to the right are '1'. For example, `out_any[2]` should indicate if either `in[2]` or `in[1]` are 1. Since `in[0]` has no neighbour to the right, the answer is obvious so we don't need to know `out_any[0]`.
> - out_different: Each bit of this output vector should indicate whether the corresponding input bit is different from its neighbour to the left. For example, `out_different[2]` should indicate if `in[2]` is different from `in[3]`. For this part, treat the vector as wrapping around, so `in[3]`'s neighbour to the left is `in[0]`.
>
> 给定4位的输入向量。我们想知道每个bit和它邻近的bit之间的关系。
> - out_both：输出向量的每个bit应当表明与之相对应的输入bit和它左边的bit是不是都为`1`。例如，`out_both[2]`应该表明`in[2]`和`in[3]`是不是同为`1`。因为`in[3]`左侧没有bit，因此我们不需要`out_both[3]`。
> - out_any：输出向量的每个bit应当表明与之相对应的输入bit和它右边的bit是不是至少有一个`1`。例如，`out_any[2]`应该表明`in[2]`或`in[1]`是不是为`1`。因为`in[0]`右侧没有bit，因此我们不需要`out_any[0]`。
> - out_different：输出向量的每个bit应当表面与之相对应的输入bit和它左边的bit是不是不同。例如，`out_different[2]`应当表明`in[2]`是否与`in[3]`不同。在这一部分中，我们认为向量是环状的，因此`in[3]`的左侧是`in[0]`。

```verilog
module top_module( 
    input [3:0] in,
    output [2:0] out_both,
    output [3:1] out_any,
    output [3:0] out_different 
);
    
    assign out_both = in[2:0] & in[3:1];
    assign out_any = in[3:1] | in[2:0];
    assign out_different = in ^ {in[0], in[3:1]};

endmodule
```

###### Even longer vectors
> 习题：You are given a 100-bit input vector in[99:0]. We want to know some relationships between each bit and its neighbour:
> - out_both: Each bit of this output vector should indicate whether both the corresponding input bit and its neighbour to the left are '1'. For example, `out_both[98]` should indicate if `in[98]` and `in[99]` are both 1. Since `in[99]` has no neighbour to the left, the answer is obvious so we don't need to know `out_both[99]`.
> - out_any: Each bit of this output vector should indicate whether any of the corresponding input bit and its neighbour to the right are '1'. For example, `out_any[2]` should indicate if either `in[2]` or `in[1]` are 1. Since `in[0]` has no neighbour to the right, the answer is obvious so we don't need to know `out_any[0]`.
> - out_different: Each bit of this output vector should indicate whether the corresponding input bit is different from its neighbour to the left. For example, `out_different[98]` should indicate if `in[98]` is different from `in[99]`. For this part, treat the vector as wrapping around, so `in[99]`'s neighbour to the left is `in[0]`.
>
> 给定100位的输入向量。我们想知道每个bit和它邻近的bit之间的关系。
> - out_both：输出向量的每个bit应当表明与之相对应的输入bit和它左边的bit是不是都为`1`。例如，`out_both[98]`应该表明`in[98]`和`in[99]`是不是同为`1`。因为`in[99]`左侧没有bit，因此我们不需要`out_both[3]`。
> - out_any：输出向量的每个bit应当表明与之相对应的输入bit和它右边的bit是不是至少有一个`1`。例如，`out_any[2]`应该表明`in[2]`或`in[1]`是不是为`1`。因为`in[0]`右侧没有bit，因此我们不需要`out_any[0]`。
> - out_different：输出向量的每个bit应当表面与之相对应的输入bit和它左边的bit是不是不同。例如，`out_different[98]`应当表明`in[98]`是否与`in[99]`不同。在这一部分中，我们认为向量是环状的，因此`in[99]`的左侧是`in[0]`。

```verilog
module top_module( 
    input [99:0] in,
    output [98:0] out_both,
    output [99:1] out_any,
    output [99:0] out_different 
);
    
    assign out_both = in[98:0] & in[99:1];
    assign out_any = in[99:1] | in[98:0];
    assign out_different = in ^ {in[0], in[99:1]};

endmodule
```

##### Multiplexers

###### 2-to-1 multiplexer
> 习题：Create a one-bit wide, 2-to-1 multiplexer. When sel=0, choose a. When sel=1, choose b.
>
> 搭建一个1位的二选一多路选择器。当`sel=0`时选`a`，当`sel=1`时选`b`。

```verilog
module top_module( 
    input a, b, sel,
    output out 
);
    
    assign out = sel ? b : a;

endmodule
```

###### 2-to-1 bus multiplexer
> 习题：Create a 100-bit wide, 2-to-1 multiplexer. When sel=0, choose a. When sel=1, choose b.
>
> 搭建一个100位的二选一多路选择器。当`sel=0`时选`a`，当`sel=1`时选`b`。

```verilog
module top_module( 
    input [99:0] a, b,
    input sel,
    output [99:0] out 
);
    
    assign out = sel ? b : a;
	
endmodule
```

###### 9-to-1 multiplexer
> 习题：Create a 16-bit wide, 9-to-1 multiplexer. sel=0 chooses a, sel=1 chooses b, etc. For the unused cases (sel=9 to 15), set all output bits to '1'.
>
> 搭建一个16位的9选1多路选择器。当`sel=0`时选`a`，当`sel=1`时选`b`，以此类推。对于没有用的情况，将所有输出置`1`。

```verilog
module top_module( 
    input [15:0] a, b, c, d, e, f, g, h, i,
    input [3:0] sel,
    output [15:0] out 
);
    
    always @(*) begin
        case (sel)
            4'd0: out = a;
            4'd1: out = b;
            4'd2: out = c;
            4'd3: out = d;
            4'd4: out = e;
            4'd5: out = f;
            4'd6: out = g;
            4'd7: out = h;
            4'd8: out = i;
            default: out = {16{1'b1}};
        endcase
    end

endmodule
```

###### 256-to-1 multiplexer
> 习题：Create a 1-bit wide, 256-to-1 multiplexer. The 256 inputs are all packed into a single 256-bit input vector. `sel=0` should select `in[0]`, `sel=1` selects bits `in[1]`, `sel=2` selects bits `in[2]`, etc.
>
> 搭建一个1位的256选1多路选择器。256个输入被打包进1个256位输入向量。当`sel=0`时选`in[0]`，当`sel=1`时选`in[1]`，当`sel=2`时选`in[2]`，以此类推。

```verilog
module top_module( 
    input [255:0] in,
    input [7:0] sel,
    output out 
);
	
    assign out = in[sel];
    
endmodule
```

###### 256-to-1 4-bit multiplexer
> 习题：Create a 4-bit wide, 256-to-1 multiplexer. The 256 4-bit inputs are all packed into a single 1024-bit input vector. `sel=0` should select bits `in[3:0]`, `sel=1` selects bits `in[7:4]`, `sel=2` selects bits `in[11:8]`, etc.
>
> 搭建一个4位的256选1多路选择器。这256个4位的输入被打包进1个1024位的输入向量。当`sel=0`时选`in[3:0]`，当`sel=1`时选`in[7:4]`，当`sel=2`时选`in[11:8]`，以此类推。

```verilog
module top_module( 
    input [1023:0] in,
    input [7:0] sel,
    output [3:0] out 
);
	
    assign out[0] = in[sel * 4];
    assign out[1] = in[sel * 4 + 1];
    assign out[2] = in[sel * 4 + 2];
    assign out[3] = in[sel * 4 + 3];
        
endmodule
```

这个题需要注意的是，位选的索引可以是一个变量，但是部分选取时端点必须是一个常数。

##### Arithmetic Circuits

###### Half adder
> 习题：Create a half adder. A half adder adds two bits (with no carry-in) and produces a sum and carry-out.
>
> 搭建一个半加器。半加器将两个bit相加（没有进位输入），产生一个求和值和一个进位输出。

```verilog
module top_module( 
    input a, b,
    output cout, sum 
);

    assign cout = a & b;
    assign sum = a ^ b;
    
endmodule
```

###### Full adder
> 习题：Create a full adder. A full adder adds three bits (including carry-in) and produces a sum and carry-out.
>
> 搭建一个全加器。一个全加器将3个bit（包括进位输入）相加，产生一个求和值和一个进位输出。

```verilog
module top_module( 
    input a, b, cin,
    output cout, sum 
);
    
	assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (b & cin) | (a & cin);
    
endmodule
```

###### 3-bit binary adder
> 习题：Now that you know how to build a full adder, make 3 instances of it to create a 3-bit binary ripple-carry adder. 
>
> 现在你知道如何搭建一个全加器了，实例化3个全加器搭建一个3位的行波进位加法器。

```verilog
module top_module( 
    input [2:0] a, b,
    input cin,
    output [2:0] cout,
    output [2:0] sum 
);
	
    full_adder adder1 (a[0], b[0], cin, cout[0], sum[0]);
    full_adder adder2 (a[1], b[1], cout[0], cout[1], sum[1]);
    full_adder adder3 (a[2], b[2], cout[1], cout[2], sum[2]);
    
endmodule

module full_adder(
    input a, b,
    input cin,
    output cout,
    output sum
);
    
    assign sum = a ^ b ^ cin;
    assign cout = (a & b) | (b & cin) | (a & cin);
    
endmodule
```

###### Adder
> 习题：Implement the following circuit:
> 
> ![习题](/post-images/ysyx/verilog/Adder.png)
>
> 实现下面的电路。

```verilog
module top_module (
    input [3:0] x,
    input [3:0] y, 
    output [4:0] sum
);

    assign sum = x + y;
    
endmodule
```

###### Signed addition overflow
> 习题：Assume that you have two 8-bit 2's complement numbers, a[7:0] and b[7:0]. These numbers are added to produce s[7:0]. Also compute whether a (signed) overflow has occurred.
>
> 假设你有两个8位补码。这些数字相加得到结果。同时需要计算是否发生了符号溢出。

```verilog
module top_module (
    input [7:0] a,
    input [7:0] b,
    output [7:0] s,
    output overflow
); 
 
    assign s = a + b;
    assign overflow = (~a[7] & ~b[7] & s[7]) | (a[7] & b[7] & ~s[7]);

endmodule
```

###### 100-bit binary adder
> 习题：Create a 100-bit binary adder. The adder adds two 100-bit numbers and a carry-in to produce a 100-bit sum and carry out.
>
> 搭建一个100位二进制加法器。加法器将两个100位二进制数和进位输入相加产生一个100位的求和值和进位输出。

```verilog
module top_module( 
    input [99:0] a, b,
    input cin,
    output cout,
    output [99:0] sum 
);
    
    assign {cout, sum} = a + b + cin;
    
endmodule
```

#### Sequential Logic

##### Latches and Flip-Flops

###### D flip-flop
> 习题：Create a single D flip-flop.
>
> 搭建一个D触发器。

```verilog
module top_module (
    input clk,    
    input d,
    output reg q 
);

    always @(posedge clk) begin
        q <= d;
    end

endmodule
```

###### DFF with reset value
> 习题：Create 8 D flip-flops with active high synchronous reset. The flip-flops must be reset to 0x34 rather than zero. All DFFs should be triggered by the negative edge of clk.
>
> 搭建8个带有主动高电平同步复位的D触发器。触发器必须复位到0x34而不是0。所有的触发器都是时钟下降沿触发。

```verilog
module top_module (
    input clk,
    input reset,
    input [7:0] d,
    output [7:0] q
);
	
    always @(negedge clk) begin
        if(reset)q <= 7'h34;
        else q <= d;
    end
    
endmodule
```

###### DFF with asynchronous reset 
> 习题：Create 8 D flip-flops with active high asynchronous reset. All DFFs should be triggered by the positive edge of `clk`.
>
> 搭建8个具有主动高电平异步复位的D触发器。所有的触发器都在时钟信号的高电平触发。

```verilog
module top_module (
    input clk,
    input areset,
    input [7:0] d,
    output [7:0] q
);
	
    always @(posedge clk or posedge areset) begin
        if(areset)q <= 8'b0;
        else q <= d;
    end
    
endmodule
```

###### DFF with byte enable
> 习题：Create 16 D flip-flops. It's sometimes useful to only modify parts of a group of flip-flops. The byte-enable inputs control whether each byte of the 16 registers should be written to on that cycle. `byteena[1]` controls the upper byte `d[15:8]`, while `byteena[0]` controls the lower byte `d[7:0]`.
> 
> `resetn` is a synchronous, active-low reset.
> 
> All DFFs should be triggered by the positive edge of `clk`.
>
> 搭建16个D触发器。有的时候修改一群触发器的一部分是有用的，字节使能输入控制16个寄存器中每个字节在当前周期是否应该写入。`byteena[1]`控制高字节，`byteena[0]`控制低字节。
>
> `resetn`是主动低电平同步复位信号。
>
> 所有的触发器都在时钟的上升沿触发。

```verilog
module top_module (
    input clk,
    input resetn,
    input [1:0] byteena,
    input [15:0] d,
    output [15:0] q
);
	
    always @(posedge clk) begin
        if(!resetn)q <= 0;
        else begin
            if(byteena[1])q[15:8] <= d[15:8];
            if(byteena[0])q[7:0] <= d[7:0];
        end
    end
    
endmodule
```

###### Mux and DFF
> 习题：Consider the sequential circuit below:
>
> ![习题](/post-images/ysyx/verilog/Mux_and_DFF.png)
>
> Assume that you want to implement hierarchical Verilog code for this circuit, using three instantiations of a submodule that has a flip-flop and multiplexer in it. Write a Verilog module (containing one flip-flop and multiplexer) named top_module for this submodule.
>
> 考虑下面这个时序逻辑电路：
>
> 假设你想要分层实现这个电路，通过实例化3个子模块，每个子模块包括一个触发器和一个多路选择器。请为这个子模块写一个Verilog模块。

```verilog
module top_module (
	input clk,
	input L,
	input r_in,
	input q_in,
	output reg Q
);
    wire d;
    
    assign d = L ? r_in : q_in;
    
    always @(posedge clk) begin
        Q <= d;
    end

endmodule
```

###### Create circiut from truth table
> 习题：A JK flip-flop has the below truth table.Implement a JK flip-flop with only a D-type flip-flop and gates. Note: Qold is the output of the D flip-flop before the positive clock edge.
>
> | J | K | Q |
> | :---: | :---: | :---: |
> | 0 | 0 | Qold |
> | 0 | 1 | 0 |
> | 1 | 0 | 1 |
> | 1 | 1 | ~Qold |
>
> JK触发器有以下的真值表。实现JK触发器只需要D触发器和逻辑门。注意：Qold是D触发器在时钟上升沿之前的输出。

```verilog
module top_module (
    input clk,
    input j,
    input k,
    output Q
); 
    
    always @(posedge clk) begin
        case({j,k})
            2'b00: Q <= Q;
            2'b01: Q <= 0;
            2'b10: Q <= 1;
            2'b11: Q <= ~Q;
        endcase
    end
        
endmodule
```

###### Detect an edge
> 习题：For each bit in an 8-bit vector, detect when the input signal changes from 0 in one clock cycle to 1 the next (similar to positive edge detection). The output bit should be set the cycle after a 0 to 1 transition occurs.
>
> 对于一个8位向量的每个bit，检查输入信号是否从某一个时钟周期的0，变成下一个时钟周期的1（类似于上升沿检测）。在0到1的跳变发生之后的那个时钟周期，对应的输出位应当被置位。

```verilog
module top_module (
    input clk,
    input [7:0] in,
    output [7:0] pedge
);
	
    reg [7:0] temp;
    
    always @(posedge clk) begin
        temp <= in;
        pedge = in & ~temp;
    end
    
endmodule
```

###### Detect both edges
> 习题：For each bit in an 8-bit vector, detect when the input signal changes from one clock cycle to the next (detect any edge). The output bit should be set the cycle after a 0 to 1 transition occurs.
> 
> 对于一个8位向量的每个bit，检查输入信号是否从某一个时钟周期的 到下一个时钟周期发生变化（任意边沿检测）。在0到1的跳变发生之后的那个时钟周期，对应的输出位应当被置位。

```verilog
module top_module (
    input clk,
    input [7:0] in,
    output [7:0] anyedge
);
	reg [7:0] temp;
    
    always @(posedge clk) begin
        temp <= in;
        anyedge = in ^ temp;
    end

endmodule
```

###### Edge capture register
> 习题：For each bit in a 32-bit vector, capture when the input signal changes from 1 in one clock cycle to 0 the next. "Capture" means that the output will remain 1 until the register is reset (synchronous reset).
> 
> Each output bit behaves like a SR flip-flop: The output bit should be set (to 1) the cycle after a 1 to 0 transition occurs. The output bit should be reset (to 0) at the positive clock edge when reset is high. If both of the above events occur at the same time, reset has precedence.
>
> 对于32位向量的每个bit，当输入信号在当前时钟周期为1，下一时钟周期为0时捕获它。捕获的意思是输出将会一直保持1，直到寄存器被复位。
>
> 每个输出bit的行为都像一个SR触发器：在从1到0跳变之后的周期输出bit应该被置1。当复位信号为高时，在时钟上升沿输出bit应该被复位到0。如果两件事情同时发生，则复位的优先级更高。

```verilog
module top_module (
    input clk,
    input reset,
    input [31:0] in,
    output [31:0] out
);
    
    reg [31:0] temp;
    
    always @(posedge clk) begin
        temp <= in;
        if(reset)out <= 0;
        else out = (temp & ~in) | out;
    end
    
endmodule
```

###### Dual-edge triggered flip-flop
> 习题：Build a circuit that functionally behaves like a dual-edge triggered flip-flop.
>
> 搭建一个双边沿触发的触发器。

这个题比较麻烦，首先先给出一种能跑过仿真的答案，但是实际上在之前F阶段学习数字电路的时候就提到过时钟信号不能作为组合电路的输入或输出。

```verilog
module top_module (
    input clk,
    input d,
    output q
);

    reg q1,q2;
    always @(posedge clk) begin
        q1 <= d;
    end
    always @(negedge clk) begin
        q2 <= d;
    end
    
    assign q = clk ? q1 : q2;
    
endmodule
```

当然，HDLbits也给出了答案。比较巧妙的利用了异或门。

```verilog
module top_module(
	input clk,
	input d,
	output q);
	
	reg p, n;
	
    always @(posedge clk)
        p <= d ^ n;
        
    always @(negedge clk)
        n <= d ^ p;

    assign q = p ^ n;
      
endmodule
```

##### Counters

###### Decade counter again
> 习题：Make a decade counter that counts 1 through 10, inclusive. The reset input is synchronous, and should reset the counter to 1.
>
> 做一个十进制计数器，从1数到10。复位信号是同步的，将计数器复位到1。

```verilog
module top_module (
    input clk,
    input reset,
    output [3:0] q
);
    
    always @(posedge clk)begin
        if(reset | (q == 10))q <= 1;
        else q <= q + 1;
    end

endmodule
```

###### Slow decade counter
> 习题：Build a decade counter that counts from 0 through 9, inclusive, with a period of 10. The reset input is synchronous, and should reset the counter to 0. We want to be able to pause the counter rather than always incrementing every clock cycle, so the `slowena` input indicates when the counter should increment.
>
> 搭建一个十进制计数器，从0数到9，周期是10。复位输入是同步的，并且将计数器复位到0。我们想要能够暂停计数而不是每个时钟周期都增加，所以`slowena`输入表明了什么时候计数器应该增加。

```verilog
module top_module (
    input clk,
    input slowena,
    input reset,
    output [3:0] q
);
    
    always @(posedge clk) begin
        if(reset)q <= 0;
        else if((q == 9) & slowena)q <= 0;
        else if(slowena) q <= q + 1;
    end
    
endmodule
```

###### Counter 1000
> 习题：From a 1000 Hz clock, derive a 1 Hz signal, called OneHertz, that could be used to drive an Enable signal for a set of hour/minute/second counters to create a digital wall clock. Since we want the clock to count once per second, the OneHertz signal must be asserted for exactly one cycle each second. Build the frequency divider using modulo-10 (BCD) counters and as few other gates as possible. Also output the enable signals from each of the BCD counters you use (c_enable[0] for the fastest counter, c_enable[2] for the slowest).
> 
> The following BCD counter is provided for you. Enable must be high for the counter to run. Reset is synchronous and set high to force the counter to zero. All counters in your circuit must directly use the same 1000 Hz signal.
>
> 从一个 1000 Hz 的时钟出发，派生出一个 1 Hz 的信号，命名为 OneHertz，它可以用来驱动一组时/分/秒计数器的使能信号，从而构成一个数字挂钟。由于我们希望时钟每秒计数一次，OneHertz 信号必须在每一秒中恰好被置位一个时钟周期。请使用模 10（BCD）计数器来构建这个分频器，并尽可能少地使用其它门电路。此外，还要输出你所使用的每一个 BCD 计数器的使能信号（c_enable[0] 对应最快的那个计数器，c_enable[2] 对应最慢的）。
> 
> 下面这个 BCD 计数器已经为你提供。Enable 必须为高，计数器才会运行。Reset 是同步复位，置高会强制计数器清零。你电路中的所有计数器都必须直接使用同一个 1000 Hz 信号。

```verilog
module top_module (
    input clk,
    input reset,
    output OneHertz,
    output [2:0] c_enable
); 

    wire [3:0] q0,q1,q2;
    
    bcdcount counter0 (clk, reset, c_enable[0], q0);
    bcdcount counter1 (clk, reset, c_enable[1], q1);
    bcdcount counter2 (clk, reset, c_enable[2], q2);
    
    assign c_enable[1] = (q0 == 9);
    assign c_enable[2] = (q0 == 9 & q1 == 9);
    assign OneHertz = (q0 == 9 & q1 == 9 & q2 == 9);
    
    always @(posedge clk) begin
        c_enable[0] <= 1;
    end

endmodule
```

###### 12-hour clock
> 习题：Create a set of counters suitable for use as a 12-hour clock (with am/pm indicator). Your counters are clocked by a fast-running `clk`, with a pulse on `ena` whenever your clock should increment (i.e., once per second).
> 
> `reset` resets the clock to 12:00 AM. `pm` is 0 for AM and 1 for PM. `hh`, `mm`, and `ss` are two BCD (Binary-Coded Decimal) digits each for hours (01-12), minutes (00-59), and seconds (00-59). Reset has higher priority than enable, and can occur even when not enabled.
>
> 搭建一系列计数器用于12小时时钟。你的计数器由快速运行的`clk`计时，当你的时钟需要增加的时候有一个`ena`的脉冲。
>
> `reset`在中午12点时复位。上午`pm`为0，下午为1。`hh`，`mm`和`ss`是两个BCD数字分别表示时，分，秒。复位信号比使能信号有更高的优先级，而且即使没有使能也可以复位。

```verilog
module top_module(
    input clk,
    input reset,
    input ena,
    output pm,
    output [7:0] hh,
    output [7:0] mm,
    output [7:0] ss
); 
    
    always @(posedge clk) begin
        if(reset)begin
            hh <= 8'h12;
            mm <= 0;
            ss <= 0;
            pm <= 0;
        end
        else begin
            if(ena) begin
                ss <= ss + 1;
                if(ss[3:0] == 9) begin
                    ss[3:0] <= 0;
                    ss[7:4] <= ss[7:4] + 1;
                end
                if(ss == 8'h59) begin
                    mm <= mm + 1;
                    if(mm[3:0] == 9) begin
                    	mm[3:0] <= 0;
                        mm[7:4] <= mm[7:4] + 1;
                	end
                    ss <= 0;
                end
                if(ss == 8'h59 & mm == 8'h59) begin
                    hh <= hh + 1;
                    if(hh[3:0] == 9) begin
                    	hh[3:0] <= 0;
                        hh[7:4] <= hh[7:4] + 1;
                	end
                    mm <= 0;
                end
                if(hh == 8'h11 & ss == 8'h59 & mm == 8'h59) begin
                    pm <= ~pm;
                end
                if(hh == 8'h12 & ss == 8'h59 & mm == 8'h59) begin
            		hh <= 8'h01;
                end
            end
        end
    end
                      
endmodule
```

##### Shift Registers

###### Left/right rotator
> 习题：Build a 100-bit left/right rotator, with synchronous load and left/right enable. A rotator shifts-in the shifted-out bit from the other end of the register, unlike a shifter that discards the shifted-out bit and shifts in a zero. If enabled, a rotator rotates the bits around and does not modify/discard them.
> 
> - `load`: Loads shift register with data[99:0] instead of rotating.
> - `ena[1:0]`: Chooses whether and which direction to rotate.
>   - 2'b01 rotates right by one bit
>   - 2'b10 rotates left by one bit
>   - 2'b00 and 2'b11 do not rotate.
> - `q`: The contents of the rotator.
>
> 搭建一个100位左右旋转器，具有同步装载和左右使能。旋转器从寄存器的另一端将移出bit移入寄存器，不像移位寄存器之间丢弃移出bit并且移入0。如果使能，旋转器旋转bit而不是修改或丢弃。

```verilog
module top_module(
    input clk,
    input load,
    input [1:0] ena,
    input [99:0] data,
    output reg [99:0] q
); 
    
    always @(posedge clk) begin
        if(load)q <= data;
        else if(ena == 2'b01)q <= {q[0], q[99:1]};
        else if(ena == 2'b10)q <= {q[98:0], q[99]};
    end
    
endmodule
```

###### Left/right arithmetic shift by 1 or 8
> 习题：Build a 64-bit arithmetic shift register, with synchronous load. The shifter can shift both left and right, and by 1 or 8 bit positions, selected by `amount`.
> 
> An arithmetic right shift shifts in the sign bit of the number in the shift register (q[63] in this case) instead of zero as done by a logical right shift. Another way of thinking about an arithmetic right shift is that it assumes the number being shifted is signed and preserves the sign, so that arithmetic right shift divides a signed number by a power of two.
> 
> There is no difference between logical and arithmetic left shifts.
> 
> - `load`: Loads shift register with data[63:0] instead of shifting.
> - `ena`: Chooses whether to shift.
> - `amount`: Chooses which direction and how much to shift.
>   - 2'b00: shift left by 1 bit.
>   - 2'b01: shift left by 8 bits.
>   - 2'b10: shift right by 1 bit.
>   - 2'b11: shift right by 8 bits.
> - `q`: The contents of the shifter.
>
> 搭建一个有同步加载的64位算术移位寄存器。这个移位器可以左移或者右移，移位可以移1位或8位，通过`amount`选择。
>
> 算术移位寄存器右移时移动的是符号位而不是像逻辑移位寄存器移0。另一种理解算术移位的方式是假设被移动的数据是有符号数，保留符号位，因此算术右移相当于有符号数除以2的幂。
>
> 逻辑左移和算术左移没有区别。

```verilog
module top_module(
    input clk,
    input load,
    input ena,
    input [1:0] amount,
    input [63:0] data,
    output reg [63:0] q
); 

    always @(posedge clk) begin
        if(load)q <= data;
        else if(ena)begin
            case(amount)
                2'b00: q <= {q[62:0], 1'b0};
                2'b01: q <= {q[55:0], 8'b0};
                2'b10: q <= {q[63], q[63:1]};
                2'b11: q <= {{8{q[63]}}, q[63:8]};
            endcase
        end
    end
    
endmodule
```

###### 5-bits LFSR
> 习题：A linear feedback shift register is a shift register usually with a few XOR gates to produce the next state of the shift register. A Galois LFSR is one particular arrangement where bit positions with a "tap" are XORed with the output bit to produce its next value, while bit positions without a tap shift. If the taps positions are carefully chosen, the LFSR can be made to be "maximum-length". A maximum-length LFSR of n bits cycles through $2^n-1$ states before repeating (the all-zero state is never reached).
> 
> The following diagram shows a 5-bit maximal-length Galois LFSR with taps at bit positions 5 and 3. (Tap positions are usually numbered starting from 1). Note that I drew the XOR gate at position 5 for consistency, but one of the XOR gate inputs is 0.
> 
> ![习题](/post-images/ysyx/verilog/LFSR.png)
> 
> Build this LFSR. The `reset` should reset the LFSR to 1.
>
> 线性反馈移位寄存器是一种移位寄存器，通常带有若干异或门，用来产生移位寄存器的下一个状态。Galois LFSR是其中一种特定的连接方式：带抽头的bit位与输出bit异或产生下一个值。不带抽头的bit位直接移位。如果抽头位置仔细选择，LSFR可以做成最大长度的。一个n位的最大长度的LFSR在重复之前会经历 $2^n-1$ 个状态（全部为0的状态不会出现）
>
> 下面的图展示了5位最大长度Galois LFSR，抽头位于第5位和第3位（抽头位置通常从1开始）。注意我在第5位也画了异或门，但一个输入为0。
>
> 搭建这个LFSR。`reset`应该把LFSR复位为1。

```verilog
module top_module(
    input clk,
    input reset,
    output [4:0] q
); 
	
    always @(posedge clk) begin
        if(reset)q <= 5'h1;
            else q <= {(q[0] ^ 0), q[4], (q[3] ^ q[0]), q[2], q[1]};
    end
    
endmodule
```

###### Shift register
> 习题：Implement the following circuit:
>
> ![习题](/post-images/ysyx/verilog/Shift_register.png)
>
> 搭建下面的电路。

```verilog
module top_module (
    input clk,
    input resetn,
    input in,
    output out
);

    wire [3:0] q;
    
    always @(posedge clk) begin
        if(!resetn)q = 0;
        else q <= {in, q[3:1]};
    end
    
    assign out = q[0];
    
endmodule
```

###### 3-input LUT
> 习题：In this question, you will design a circuit for an 8x1 memory, where writing to the memory is accomplished by shifting-in bits, and reading is "random access", as in a typical RAM. You will then use the circuit to realize a 3-input logic function.
> 
> First, create an 8-bit shift register with 8 D-type flip-flops. Label the flip-flop outputs from Q[0]...Q[7]. The shift register input should be called S, which feeds the input of Q[0] (MSB is shifted in first). The enable input controls whether to shift. Then, extend the circuit to have 3 additional inputs A,B,C and an output Z. The circuit's behaviour should be as follows: when ABC is 000, Z=Q[0], when ABC is 001, Z=Q[1], and so on. Your circuit should contain ONLY the 8-bit shift register, and multiplexers. (Aside: this circuit is called a 3-input look-up-table (LUT)).
>
> 在这个习题中，你将会设计一个 $8 \times 1$ 存储器的电路，通过移位写u存储，读取则是随机访问，与典型RAM一样。你将会使用这个电路去实现一个3输入逻辑电路。
>
> 首先，用8个D触发器搭建一个8位的移位寄存器。将触发器的输出命名为Q[0]...Q[7]。移位寄存器的输入命名为S，馈入Q[0]的输入端（最高有效位先移入）。使能端控制是否移位。然后扩展电路增加3个输入端A，B，C和1个输出Z.电路的行为应该如下：当ABC=000时，Z=Q[0]；当ABC=001时，Z=Q[1]，以此类推。你的电路应该只包括8位移位寄存器和多路复用器。（这个电路称为3输入LUT）。

```verilog
module top_module (
    input clk,
    input enable,
    input S,
    input A, B, C,
    output Z 
); 
    
    wire [7:0] Q;
    
    always @(posedge clk) begin
        if(enable)Q <= {Q[6:0], S};
    end
    
    assign Z = Q[{A, B, C}];
    
endmodule
```

##### More Circuits

###### Rule 90
> 习题：Rule 90 is a one-dimensional cellular automaton with interesting properties.
> 
> The rules are simple. There is a one-dimensional array of cells (on or off). At each time step, the next state of each cell is the XOR of the cell's two current neighbours. A more verbose way of expressing this rule is the following table, where a cell's next state is a function of itself and its two neighbours:
>
> | Left | Center | Right | Center's next state |
> | :---: | :---: | :---: | :---: |
> | 1 | 1 | 1 | 0 |
> | 1 | 1 | 0 | 1 |
> | 1 | 0 | 1 | 0 |
> | 1 | 0 | 0 | 1 |
> | 0 | 1 | 1 | 1 |
> | 0 | 1 | 0 | 0 |
> | 0 | 0 | 1 | 1 |
> | 0 | 0 | 0 | 0 |
>
> In this circuit, create a 512-cell system (`q[511:0]`), and advance by one time step each clock cycle. The `load` input indicates the state of the system should be loaded with `data[511:0]`. Assume the boundaries (`q[-1]` and `q[512]`) are both zero (off).
>
> Rule 90是一个具有有趣性质的一维元胞自动机。
>
> 规则很简单。有一个一维的细胞数组，在每一个时间步，每个细胞的下一个状态是它两个邻居的异或。下面这张表用更啰嗦的方式描述了这条规则。
>
> 在这个电路中，搭建一个512个细胞的系统，并且每个时钟周期前进一个时间步。`load`输入指定将`data[511:0]`加载入系统。假设边界（`q[-1]`和`q[512]`）都是0。

```verilog
module top_module(
    input clk,
    input load,
    input [511:0] data,
    output [511:0] q 
); 
	
    always @(posedge clk) begin
        if(load)q <= data;
        else begin
            q <= {1'b0, q[511:1]} ^ {q[510:0], 1'b0};
        end
    end
    
endmodule
```

###### Rule 110
> 习题：Rule 110 is a one-dimensional cellular automaton with interesting properties.
>
> There is a one-dimensional array of cells (on or off). At each time step, the state of each cell changes. In Rule 110, the next state of each cell depends only on itself and its two neighbours, according to the following table:
>
> | Left | Center | Right | Center's next state |
> | :---: | :---: | :---: | :---: |
> | 1 | 1 | 1 | 0 |
> | 1 | 1 | 0 | 1 |
> | 1 | 0 | 1 | 1 |
> | 1 | 0 | 0 | 0 |
> | 0 | 1 | 1 | 1 |
> | 0 | 1 | 0 | 1 |
> | 0 | 0 | 1 | 1 |
> | 0 | 0 | 0 | 0 |
>
> In this circuit, create a 512-cell system (`q[511:0]`), and advance by one time step each clock cycle. The `load` input indicates the state of the system should be loaded with `data[511:0]`. Assume the boundaries (`q[-1]` and `q[512]`) are both zero (off).
>
> Rule 110是一个具有有趣性质的一维元胞自动机。
>
> 有一个一维的细胞数组。在每一个时间步，每个细胞的状态都发生变化。在Rule 110中，每个细胞的下一个状态只依赖于它自身和它的两个相邻的细胞，依据下表。
>
> 在这个电路中，搭建一个512个细胞的系统，并且每个时钟周期前进一个时间步。`load`输入指定将`data[511:0]`加载入系统。假设边界（`q[-1]`和`q[512]`）都是0。

```verilog
module top_module(
    input clk,
    input load,
    input [511:0] data,
    output [511:0] q
); 
	
    always @(posedge clk) begin
        if(load)q <= data;
        else q <= (q & ~{1'b0, q[511:1]}) | (q ^ {q[510:0], 1'b0});
    end
    
endmodule
```

###### Conway's Game of Life 16 $\times$ 16
> 习题：Conway's Game of Life is a two-dimensional cellular automaton.
> 
> The "game" is played on a two-dimensional grid of cells, where each cell is either 1 (alive) or 0 (dead). At each time step, each cell changes state depending on how many neighbours it has:
> - 0-1 neighbour: Cell becomes 0.
> - 2 neighbours: Cell state does not change.
> - 3 neighbours: Cell becomes 1.
> - 4+ neighbours: Cell becomes 0.
> 
> The game is formulated for an infinite grid. In this circuit, we will use a 16x16 grid. To make things more interesting, we will use a 16x16 toroid, where the sides wrap around to the other side of the grid. For example, the corner cell (0,0) has 8 neighbours: (15,1), (15,0), (15,15), (0,1), (0,15), (1,1), (1,0), and (1,15). The $16 \times 16$ grid is represented by a length 256 vector, where each row of 16 cells is represented by a sub-vector: q[15:0] is row 0, q[31:16] is row 1, etc. (This tool accepts SystemVerilog, so you may use 2D vectors if you wish.)
> - `load`: Loads `data` into `q` at the next clock edge, for loading initial state.
> - `q`: The $16 \times 16$ current state of the game, updated every clock cycle.
> 
> The game state should advance by one timestep every clock cycle.
>
> Conway's Game of Life是一个二维的元胞自动机。
>
> 这个游戏在一个二维网格上进行，每个元胞要么是1要么是0。每一个时间步，每个元胞根据周围元胞的数量改变状态。
> - 0-1个邻居：元胞变为0。
> - 2个邻居：元胞保持不变。
> - 3个邻居：元胞变为1。
> - 4+个邻居：元胞变为0。
>
> 该游戏原本制定在无限网格上。在这个电路中，我们使用 $16 \times 16$ 的网格。为了让问题更有意思，我们将采用 $16 \times 16$ 的环状网格，即各边会绕回到网格的另一侧，例如，角落处的元胞 (0,0) 有8个邻居：(15,1)、(15,0)、(15,15)、(0,1)、(0,15)、(1,1)、(1,0) 和 (1,15)。这个 $16 \times 16$ 的网格用一个长度为256的向量表示。每一行的16个元胞由一个子向量表示，`q[15:0]`为第0行，`q[31:16]`为第1行，依此类推。
> - `load`：在下一个时钟沿将`data`加载到`q`，进行初始化。
> - `q`：这个游戏当前的$16 \times 16$状态，每个时钟周期更新。
>
> 每个周期游戏状态前进一个时间步。

```verilog
module top_module(
    input clk,
    input load,
    input [255:0] data,
    output [255:0] q 
);
    
    reg [255:0] q_up;
    reg [255:0] q_down;
    reg [255:0] q_left;
    reg [255:0] q_right;
    reg [255:0] q_leftup;
    reg [255:0] q_rightup;
    reg [255:0] q_leftdown;
    reg [255:0] q_rightdown;
    
    int up,down;
    
    always @(*) begin
        int i;
        for(i = 0; i < 256; i = i + 1) begin
            up = (i-16+256)%256;
            down = (i+16)%256;
            
            q_up[i] = q[up];
            q_down[i] = q[down];
            q_left[i] = q[(i%16 == 0) ? i+15 : i-1];
            q_right[i] = q[(i%16 == 15) ? i-15 : i+1];
            q_leftup[i] = q[(up%16 == 0) ? up+15 : up-1];
            q_leftdown[i] = q[(down%16 == 0) ? down+15 : down-1];
            q_rightup[i] = q[(up%16 == 15) ? up-15 : up+1];
            q_rightdown[i] = q[(down%16 == 15) ? down-15 : down+1];
        end
    end
       
    always @(posedge clk) begin
        if(load)q <= data;
        else begin
            int i;
            for(i = 0; i < 256; i = i + 1) begin
                case(q_up[i] + q_down[i] + q_left[i] + q_right[i]
                     + q_leftup[i] + q_rightup[i] + q_leftdown[i] + q_rightdown[i])
                    3'd2: q[i] <= q[i];
                    3'd3: q[i] <= 1;
                    default: q[i] <= 0;
                endcase
            end
        end
    end
                
endmodule
```

##### Finite State Machines

###### Simple FSM 1 (asynchronous reset)
> 习题：This is a Moore state machine with two states, one input, and one output. Implement this state machine. Notice that the reset state is B.
>
> ![习题](/post-images/ysyx/verilog/Simple_FSM_1_1.png)
> 
> 这是一个有两个状态的Moore型状态机，有一个输入和一个输出。实现这个状态机，注意复位状态是B。这个是异步复位。

```verilog
module top_module(
    input clk,
    input areset,
    input in,
    output out
);  

    parameter A=0, B=1; 
    reg state, next_state;

    always @(*) begin
        case(state)
            A: next_state = in ? A : B;
            B: next_state = in ? B : A;
        endcase 
    end

    always @(posedge clk, posedge areset) begin
        if(areset)state <= B;
        else state <= next_state;
    end

    assign out = state;

endmodule
```

###### Simple FSM 1 (synchronous reset)
> 习题：This is a Moore state machine with two states, one input, and one output. Implement this state machine. Notice that the reset state is B.
>
> ![习题](/post-images/ysyx/verilog/Simple_FSM_1_2.png)
> 
> 这是一个有两个状态的Moore型状态机，有一个输入和一个输出。实现这个状态机，注意复位状态是B。这个是同步复位。

```verilog
module top_module(clk, reset, in, out);
    input clk;
    input reset;
    input in;
    output out; 
    reg out;

    parameter A=0, B=1;

    reg present_state, next_state;

    always @(posedge clk) begin
        if (reset) begin  
            present_state = B;
            out = B;
        end else begin
            case (present_state)
                A: next_state = in ? A : B;
                B: next_state = in ? B : A;
            endcase

            present_state = next_state;   

            case (present_state)
                A: out = 0;
                B: out = 1;
            endcase
        end
    end

endmodule
```

###### Simple FSM 2 (asynchronous reset)
> 习题：This is a Moore state machine with two states, two inputs, and one output. Implement this state machine.
>
> ![习题](/post-images/ysyx/verilog/Simple_FSM_2_1.png)
> 
> 这是一个Moore型状态机，有两个状态，两个输入和一个输出。实现这个状态机。这个是异步复位。

```verilog
module top_module(
    input clk,
    input areset,
    input j,
    input k,
    output out
);

    parameter OFF=0, ON=1; 
    reg state, next_state;

    always @(*) begin
        case(state)
            ON: next_state = k ? OFF : ON;
            OFF: next_state = j ? ON : OFF;
        endcase
    end

    always @(posedge clk, posedge areset) begin
        if(areset)state <= OFF;
        else state <= next_state;
    end

    assign out = (state == ON);

endmodule
```

###### Simple FSM 2 (synchronous reset)
> 习题：This is a Moore state machine with two states, two inputs, and one output. Implement this state machine.
>
> ![习题](/post-images/ysyx/verilog/Simple_FSM_2_2.png)
>
> 这是一个Moore型状态机，有两个状态，两个输入和一个输出。实现这个状态机。这个是同步复位。

```verilog
module top_module(
    input clk,
    input reset,
    input j,
    input k,
    output out
);

    parameter OFF=0, ON=1; 
    reg state, next_state;

    always @(*) begin
        case(state)
            ON: next_state = k ? OFF : ON;
            OFF: next_state = j ? ON : OFF;
        endcase
    end

    always @(posedge clk) begin
        if(reset)state <= OFF;
        else state <= next_state;
    end

    assign out = (state == ON);

endmodule
```

###### Simple state transitions 3
> 习题：The following is the state transition table for a Moore state machine with one input, one output, and four states. Use the following state encoding: A=2'b00, B=2'b01, C=2'b10, D=2'b11.
> 
> Implement only the state transition logic and output logic (the combinational logic portion) for this state machine. Given the current state (state), compute the next_state and output (out) based on the state transition table.
>
> | State | Next state (in=0) | Next state (in=1) | Output |
> | :---: | :---: | :---: | :---: |
> | A | A | B | 0 |
> | B | C | B | 0 |
> | C | A | D | 0 |
> | D | C | B | 1 |
>
> 下面是一个单输入单输出的Moore型状态机的状态转移表。
>
> 只实现这个状态机的状态跳转逻辑和输出逻辑。指定当前状态，基于状态转移表计算下一状态和输出。

```verilog
module top_module(
    input in,
    input [1:0] state,
    output [1:0] next_state,
    output out); //

    parameter A=0, B=1, C=2, D=3;

    always @(*)begin
        case(state)
            A: next_state = in ? B : A;
            B: next_state = in ? B : C;
            C: next_state = in ? D : A;
            D: next_state = in ? B : C;
        endcase
    end
    
    assign out = (state == D) ? 1 : 0;   

endmodule
```

###### Simple one-hot state transitions 3
> 习题：The following is the state transition table for a Moore state machine with one input, one output, and four states. Use the following one-hot state encoding: A=4'b0001, B=4'b0010, C=4'b0100, D=4'b1000.
> 
> Derive state transition and output logic equations by inspection assuming a one-hot encoding. Implement only the state transition logic and output logic (the combinational logic portion) for this state machine. (The testbench will test with non-one hot inputs to make sure you're not trying to do something more complicated).
>
> | State | Next state (in=0) | Next state (in=1) | Output |
> | :---: | :---: | :---: | :---: |
> | A | A | B | 0 |
> | B | C | B | 0 |
> | C | A | D | 0 |
> | D | C | B | 1 |
>
> 下面是一个单输入单输出，4状态的Moore型状态机的状态转移表。四种状态使用独热码编码。
>
> 假定采用独热码通过直接观察出状态转移方程和输出逻辑方程。只需要实现这个状态机的状态转移逻辑和输出逻辑。

```verilog
module top_module(
    input in,
    input [3:0] state,
    output [3:0] next_state,
    output out
);

    parameter A=0, B=1, C=2, D=3;

    assign next_state[A] = (state[A] & ~in) | (state[C] & ~in);
    assign next_state[B] = (state[A] & in) | (state[B] & in) | (state[D] & in);
    assign next_state[C] = (state[B] & ~in) | (state[D] & ~in);
    assign next_state[D] = state[C] & in;

    assign out = state[D];

endmodule
```

###### Simple FSM 3 (asynchronous reset)
> 习题：The following is the state transition table for a Moore state machine with one input, one output, and four states. Implement this state machine. Include an asynchronous reset that resets the FSM to state A.
> 
> | State | Next state (in=0) | Next state (in=1) | Output |
> | :---: | :---: | :---: | :---: |
> | A | A | B | 0 |
> | B | C | B | 0 |
> | C | A | D | 0 |
> | D | C | B | 1 |
> 
> 下面是一个单输入单输出，4状态的Moore型状态机的状态转移表。。实现这个状态机。包括一个异步复位将FSM复位到状态A。

```verilog
module top_module(
    input clk,
    input in,
    input areset,
    output out
);
	
    parameter A=0, B=1, C=2, D=3;
    reg [1:0] state;
    reg [1:0] next_state;

    always @(*) begin
        case(state)
            A: next_state = in ? B : A;
            B: next_state = in ? B : C;
            C: next_state = in ? D : A;
            D: next_state = in ? B : C;
        endcase
    end

    always @(posedge clk or posedge areset) begin
        if(areset)state <= A;
        else state <= next_state;
    end

    assign out = (state == D);
    
endmodule
```

###### Simple FSM 3 (synchronous reset)
> 习题：The following is the state transition table for a Moore state machine with one input, one output, and four states. Implement this state machine. Include a synchronous reset that resets the FSM to state A. 
>
> | State | Next state (in=0) | Next state (in=1) | Output |
> | :---: | :---: | :---: | :---: |
> | A | A | B | 0 |
> | B | C | B | 0 |
> | C | A | D | 0 |
> | D | C | B | 1 |
>
> 下面是一个单输入单输出，4状态的Moore型状态机的状态转移表。。实现这个状态机。包括一个同步复位将FSM复位到状态A。

```verilog
module top_module(
    input clk,
    input in,
    input reset,
    output out
);
	
    parameter A=0, B=1, C=2, D=3;
    reg [1:0] state;
    reg [1:0] next_state;

    always @(*) begin
        case(state)
            A: next_state = in ? B : A;
            B: next_state = in ? B : C;
            C: next_state = in ? D : A;
            D: next_state = in ? B : C;
        endcase
    end

    always @(posedge clk) begin
        if(reset)state <= A;
        else state <= next_state;
    end

    assign out = (state == D);
    
endmodule
```

###### Design a Moore FSM
> 习题：A large reservoir of water serves several users. In order to keep the level of water sufficiently high, three sensors are placed vertically at 5-inch intervals. When the water level is above the highest sensor (S<sub>3</sub>), the input flow rate should be zero. When the level is below the lowest sensor (S<sub>1</sub>), the flow rate should be at maximum (both Nominal flow valve and Supplemental flow valve opened). The flow rate when the level is between the upper and lower sensors is determined by two factors: the water level and the level previous to the last sensor change. Each water level has a nominal flow rate associated with it, as shown in the table below. If the sensor change indicates that the previous level was lower than the current level, the nominal flow rate should take place. If the previous level was higher than the current level, the flow rate should be increased by opening the Supplemental flow valve (controlled by ΔFR). Draw the Moore model state diagram for the water reservoir controller. Clearly indicate all state transitions and outputs for each state. The inputs to your FSM are S<sub>1</sub>, S<sub>2</sub> and S<sub>3</sub>; the outputs are FR<sub>1</sub>, FR<sub>2</sub>, FR<sub>3</sub> and ΔFR.
> 
> Also include an active-high synchronous reset that resets the state machine to a state equivalent to if the water level had been low for a long time (no sensors asserted, and all four outputs asserted).
> 
> 一座大型水库为多个用户供水。为使水位保持足够高，在垂直方向上每间隔5英寸放置3个传感器。当水位达到最高时，输入流量应该为0。当水位最低时，流量应为最大（标称流量阀与补充流量阀同时打开）。当水位在最高和最低两个传感器之间时，流量取决于两个因素：当前水位以及上一次传感器状态变化之前的水位。每个水位都对应一个标称流量，如下表所示。若传感器状态变化表明先前水位低于当前水位，则应采用标称流量；若先前水位高于当前水位，则应通过打开补充流量阀（由ΔFR控制）来增大流量。请画出该水库控制器的Moore型状态图，需清楚标明所有状态转移及各状态的输出。该有限状态机的输入为S<sub>1</sub>、S<sub>2</sub>和S<sub>3</sub>，输出为FR<sub>1</sub>、FR<sub>2</sub>、FR<sub>3</sub>和ΔFR。
>
> 也包括一个高电平同步复位信号复位状态机，该复位将状态机置为这样一种状态：等同于水位长期偏低的情形（所有传感器均未置位，且四个输出全部置位）。

```verilog
module top_module (
    input clk,
    input reset,
    input [3:1] s,
    output fr3,
    output fr2,
    output fr1,
    output dfr
); 

    parameter IDLE=0, A=1, B=2, C=3, D=4;
    reg [2:0] state;
    reg [2:0] next_state;
    reg [2:0] last_state;
    reg flag;
    
    always @(*) begin
        case(s)
            3'd0: next_state = A;
            3'd1: next_state = B;
            3'd3: next_state = C;
            3'd7: next_state = D;
            default: next_state = 'x;
        endcase
    end
    
    always @(posedge clk) begin
        if(reset)begin
            state <= IDLE;
            flag <= 1;
        end
        else begin
            state <= next_state;
            if(state > next_state)flag <= 1;
            else if(state < next_state)flag <= 0;
        end
    end
    
    always @(*) begin
        fr1 = 0;
        fr2 = 0;
        fr3 = 0;
        dfr = ((state == IDLE) | flag) ? 1'b1 : 1'b0;
        case(state)
            IDLE: begin
                fr1 = 1;
                fr2 = 1;
                fr3 = 1;
            end
            A: begin
                fr1 = 1;
                fr2 = 1;
                fr3 = 1;
            end
            B: begin
              	fr1 = 1;
                fr2 = 1;
            end
            C: begin
               	fr1 = 1;
           	end
            D: begin
            	fr1 = 0;
				fr2 = 0;
              	fr3 = 0;
            end
        endcase
    end
            
endmodule
```

###### Lemmings 1
> 习题：The game Lemmings involves critters with fairly simple brains. So simple that we are going to model it using a finite state machine.
> 
> In the Lemmings' 2D world, Lemmings can be in one of two states: walking left or walking right. It will switch directions if it hits an obstacle. In particular, if a Lemming is bumped on the left, it will walk right. If it's bumped on the right, it will walk left. If it's bumped on both sides at the same time, it will still switch directions.
> 
> Implement a Moore state machine with two states, two inputs, and one output that models this behaviour.
>
> 游戏Lemmings中的生物的脑子非常简单，简单到我们打算用一个有限状态机来建模。
>
> 在Lemmings的2D世界中，Lemmings只有两种状态，向左走或者向右走。如果它碰到了障碍物，它就会转变方向。具体来说，如果它碰到左边，它就会向右转；如果它碰到右边，它就会向左转。如果两边都碰到，它仍然会切换方向。
>
> 实现这个两个状态，两个输入和一个输出的Moore型状态机，来模拟这种行为。

```verilog
module top_module(
    input clk,
    input areset,
    input bump_left,
    input bump_right,
    output walk_left,
    output walk_right
);  

    parameter LEFT=0, RIGHT=1;
    reg state, next_state;

    always @(*) begin
        case(state)
            LEFT: next_state <= bump_left ? RIGHT : LEFT;
            RIGHT: next_state <= bump_right ? LEFT : RIGHT;
        endcase
    end

    always @(posedge clk, posedge areset) begin
        if(areset)state <= LEFT;
        else state <= next_state;
    end

    assign walk_left = (state == LEFT);
    assign walk_right = (state == RIGHT);
    
endmodule
```

###### Lemmings 2
> 习题：In addition to walking left and right, Lemmings will fall (and presumably go "aaah!") if the ground disappears underneath them.
> 
> In addition to walking left and right and changing direction when bumped, when ground=0, the Lemming will fall and say "aaah!". When the ground reappears (ground=1), the Lemming will resume walking in the same direction as before the fall. Being bumped while falling does not affect the walking direction, and being bumped in the same cycle as ground disappears (but not yet falling), or when the ground reappears while still falling, also does not affect the walking direction.
> 
> Build a finite state machine that models this behaviour.
>
> 除了向左走或者向右走，如果脚下的地面消失了，Lemmings就会掉下去。
>
> 除了左右行走以及被撞改变方向之外：当`ground=0`时，Lemming将会掉落并喊“啊~”。当地面重新出现时，Lemming将会保持掉落之前的方向继续行走。掉落的时候发生碰撞将不会影响行走方向，并且在地面消失的同一时刻发生碰撞或者当掉落的时候地面出现也不会影响行走方向。
>
> 请构建一个有限状态机来模拟这种行为。

```verilog
module top_module(
    input clk,
    input areset,
    input bump_left,
    input bump_right,
    input ground,
    output walk_left,
    output walk_right,
    output aaah 
); 
    
    parameter left=0, right=1, fall_l=2, fall_r=3;
    reg [1:0] state, next_state;
    
    always @(*) begin
        case(state)
            left: next_state = (!ground) ? fall_l : (bump_left ? right : left);
            right: next_state = (!ground) ? fall_r : (bump_right ? left : right);
            fall_l: next_state = ground ? left : fall_l;
            fall_r: next_state = ground ? right : fall_r;
        endcase
    end
    
    always @(posedge clk or posedge areset) begin
        if(areset)state <= left;
        else state <= next_state;
    end
    
    assign aaah = ((state == fall_l) | (state == fall_r));
    assign walk_left = (state == left);
    assign walk_right = (state == right);
    
endmodule
```

###### Lemmings 3
> 习题：In addition to walking and falling, Lemmings can sometimes be told to do useful things, like dig (it starts digging when dig=1). A Lemming can dig if it is currently walking on ground (ground=1 and not falling), and will continue digging until it reaches the other side (ground=0). At that point, since there is no ground, it will fall (aaah!), then continue walking in its original direction once it hits ground again. As with falling, being bumped while digging has no effect, and being told to dig when falling or when there is no ground is ignored.
> 
> (In other words, a walking Lemming can fall, dig, or switch directions. If more than one of these conditions are satisfied, fall has higher precedence than dig, which has higher precedence than switching directions.)
> 
> Extend your finite state machine to model this behaviour.
>
> 除了行走和掉落以外，Lemmings有的时候被要求去做一些有用的事情，比如挖坑。如果它走在地面上，将会一直挖坑直到另一边。这时候由于没有地面了，它就会掉下去，然后当地面重新出现的时候就会接着之前的方向继续行走。像掉落一样，在挖坑的时候发生碰撞将没有影响，在掉落中或者没有地面的时候挖坑的指令会被忽视。
>
> （换句话说，正在行走的Lemming可以掉落，挖坑或者切换方向，如果多种情况同时满足，掉落的优先级比挖坑更高，挖坑的优先级比切换方向更高。）
>
> 请扩展你的状态机来建模这种行为。

```verilog
module top_module(
    input clk,
    input areset,
    input bump_left,
    input bump_right,
    input ground,
    input dig,
    output walk_left,
    output walk_right,
    output aaah,
    output digging 
); 

    parameter left=0, right=1, fall_l=2, fall_r=3, dig_l=4, dig_r=5;
    reg [2:0] state, next_state;
    
    always @(*) begin
        case(state)
            left: begin
                if(!ground)next_state = fall_l;
                else begin
                    if(dig)next_state = dig_l;
                    else begin
                        if(bump_left) next_state = right;
                    	else next_state = left;
                    end
                end
            end
            right: begin
                if(!ground)next_state = fall_r;
                else begin
                    if(dig)next_state = dig_r;
                    else begin 
                        if(bump_right) next_state = left;
                    	else next_state = right;
                    end
                end
            end
            fall_l: next_state = ground ? left : fall_l;
            fall_r: next_state = ground ? right : fall_r;
            dig_l: next_state = ground ? dig_l : fall_l;
            dig_r: next_state = ground ? dig_r : fall_r;
            default: next_state = 'x;
        endcase
    end
    
    always @(posedge clk or posedge areset) begin
        if(areset)state <= left;
        else state <= next_state;
    end
    
    assign walk_left = (state == left);
    assign walk_right = (state == right);
    assign aaah = ((state == fall_l) | (state == fall_r));
    assign digging = ((state == dig_l) | (state == dig_r));
    
endmodule
```

###### Lemmings 4
> 习题：Although Lemmings can walk, fall, and dig, Lemmings aren't invulnerable. If a Lemming falls for too long then hits the ground, it can splatter. In particular, if a Lemming falls for more than 20 clock cycles then hits the ground, it will splatter and cease walking, falling, or digging (all 4 outputs become 0), forever (Or until the FSM gets reset). There is no upper limit on how far a Lemming can fall before hitting the ground. Lemmings only splatter when hitting the ground; they do not splatter in mid-air.
> 
> Extend your finite state machine to model this behaviour.
>
> 尽管Lemmings可以行走，掉落和挖坑，Lemmings会受到伤害。如果Lemmings掉落太久然后撞击地面，它就会摔烂。具体来说，如果Lemming掉落超过20个周期然后撞击地面，它就会摔烂并且永久停止行走，掉落，挖坑。Lemming掉落多远才落地并没有上限。Lemmings只有在撞到地面才会摔烂，在半空不会。

```verilog
module top_module(
    input clk,
    input areset,
    input bump_left,
    input bump_right,
    input ground,
    input dig,
    output walk_left,
    output walk_right,
    output aaah,
    output digging 
); 

    parameter left=0, right=1, fall_l=2, fall_r=3, dig_l=4, dig_r=5, splat=6;
    reg [2:0] state, next_state;
    int count;
    
    always @(*) begin
        case(state)
            left: begin
                if(!ground)next_state = fall_l;
                else begin
                    if(dig)next_state = dig_l;
                    else begin
                        if(bump_left) next_state = right;
                    	else next_state = left;
                    end
                end
            end
            right: begin
                if(!ground)next_state = fall_r;
                else begin
                    if(dig)next_state = dig_r;
                    else begin 
                        if(bump_right) next_state = left;
                    	else next_state = right;
                    end
                end
            end
            fall_l: begin
                if(!ground)next_state = fall_l;
                else begin
                    if(count > 20)next_state = splat;
                    else next_state = left;
                end
            end
            fall_r: begin
                if(!ground)next_state = fall_r;
                else begin
                    if(count > 20)next_state = splat;
                    else next_state = right;
                end
            end
            dig_l: next_state = ground ? dig_l : fall_l;
            dig_r: next_state = ground ? dig_r : fall_r;
            splat: next_state = splat;
            default: next_state = 'x;
        endcase
    end
    
    always @(posedge clk or posedge areset) begin
        if(areset) begin
            state <= left;
            count <= 1;
        end
        else begin
            state <= next_state;
            if((state == fall_l) | (state == fall_r))count <= count + 1;
            else count <= 1;
        end
    end
    
    assign walk_left = (state == left);
    assign walk_right = (state == right);
    assign aaah = ((state == fall_l) | (state == fall_r));
    assign digging = ((state == dig_l) | (state == dig_r));
    
endmodule
```

###### One-hot FSM
> 习题：Given the following state machine with 1 input and 2 outputs:
>
> ![习题](/post-images/ysyx/verilog/One-hot_FSM.png)
>
> Suppose this state machine uses one-hot encoding, where `state[0]` through `state[9]` correspond to the states S0 though S9, respectively. The outputs are zero unless otherwise specified.
> 
> Implement the state transition logic and output logic portions of the state machine (but not the state flip-flops). You are given the current state in `state[9:0]` and must produce `next_state[9:0]` and the two outputs. Derive the logic equations by inspection assuming a one-hot encoding. (The testbench will test with non-one hot inputs to make sure you're not trying to do something more complicated).
>
> 给定下面这个有单输入和双输出的状态机。
>
> 假定这个状态机使用独热码，`state[0]`到`state[9]`对应状态S0到S9。除了指定的输出外，其他的输出均为0。
>
> 实现这个状态机的状态转移逻辑和输出逻辑部分。给定了当前状态`state[9:0]`，必须产生`next_state[9:0]`和两个输出。假定独热码并且观察出逻辑方程。

```verilog
module top_module(
    input in,
    input [9:0] state,
    output [9:0] next_state,
    output out1,
    output out2
);

    assign next_state[0] = ~in & (state[0] | state[1] | state[2] | state[3] | state[4] | state[7] | state[8] | state[9]);
    assign next_state[1] = in & (state[0] | state[8] | state[9]);
    assign next_state[2] = in & state[1];
    assign next_state[3] = in & state[2];
    assign next_state[4] = in & state[3];
    assign next_state[5] = in & state[4];
    assign next_state[6] = in & state[5];
    assign next_state[7] = in & (state[6] | state[7]);
    assign next_state[8] = ~in & state[5];
    assign next_state[9] = ~in & state[6];
     
    assign out1 = (state[8] | state[9]);
    assign out2 = (state[7] | state[9]);
    
endmodule 
```

###### PS/2 packet parser
> 习题：The PS/2 mouse protocol sends messages that are three bytes long. However, within a continuous byte stream, it's not obvious where messages start and end. The only indication is that the first byte of each three byte message always has `bit[3]=1` (but bit[3] of the other two bytes may be 1 or 0 depending on data).
> 
> We want a finite state machine that will search for message boundaries when given an input byte stream. The algorithm we'll use is to discard bytes until we see one with `bit[3]=1`. We then assume that this is byte 1 of a message, and signal the receipt of a message once all 3 bytes have been received (`done`).
> 
> The FSM should signal `done` in the cycle immediately after the third byte of each message was successfully received.
>
> PS/2鼠标协议发送3字节信息。然而，在持续的字节流中，开始和结束的位置并不明显。唯一的指示是每三个字节的第一个字节的总是有`bit[3]=1`。
>
> 我们想要一个有限状态机去找到给定的输入字节流的消息边界。我们使用的算法将丢掉所有的字节，直到看到`bit[3]=1`。我们假定这个字节是一条信息的第一个字节，然后当收到3个字节后产生收到信号。
>
> FSM应该在收到每条消息的第三个字节后的下一个周期立即产生`done`。

```verilog
module top_module(
    input clk,
    input [7:0] in,
    input reset,
    output done
);
    reg [1:0] state, next_state;
    parameter IDLE=0, byte1=1, byte2=2, byte3=3;

    always @(*) begin
        case(state)
            IDLE: next_state = in[3] ? byte1 : IDLE;
            byte1: next_state = byte2;
            byte2: next_state = byte3;
            byte3: next_state = in[3] ? byte1 : IDLE;
        endcase
    end

    always @(posedge clk) begin
        if(reset)state <= IDLE;
        else state <= next_state;
    end

    assign done = (state == byte3);
    
endmodule
```

###### PS/2 packet parser and datapath
> 习题：Now that you have a state machine that will identify three-byte messages in a PS/2 byte stream, add a datapath that will also output the 24-bit (3 byte) message whenever a packet is received (`out_bytes[23:16]` is the first byte, `out_bytes[15:8]` is the second byte, etc.).
> 
> `out_bytes` needs to be valid whenever the `done` signal is asserted. You may output anything at other times (i.e., don't-care).
>
> 现在你有一个可以识别三个字节消息的状态机用于PS/2字节流，增加一条数据通路，当收到一个数据包时可以输出24bit消息。
>
> `out_bytes`在`done`信号有效时必须给出有效信息。其他时刻可以输出任何东西。

```verilog
module top_module(
    input clk,
    input [7:0] in,
    input reset,
    output [23:0] out_bytes,
    output done);
    reg [1:0] state, next_state;
    reg [23:0] out_data;
    parameter IDLE=0, byte1=1, byte2=2, byte3=3;

    always @(*) begin
        case(state)
            IDLE: next_state = in[3] ? byte1 : IDLE;
            byte1: next_state = byte2;
            byte2: next_state = byte3;
            byte3: next_state = in[3] ? byte1 : IDLE;
        endcase
    end

    always @(posedge clk) begin
        if(reset)state <= IDLE;
        else state <= next_state;
    end
	
    assign done = (state == byte3);
    
    always @(posedge clk) begin
        if(reset) out_data <= '0;
        else out_data <= {out_data[15:0], in};
    end
    
    assign out_bytes = done ? out_data : 24'b0;

endmodule
```

###### Serial receiver
> 习题：In many (older) serial communications protocols, each data byte is sent along with a start bit and a stop bit, to help the receiver delimit bytes from the stream of bits. One common scheme is to use one start bit (0), 8 data bits, and 1 stop bit (1). The line is also at logic 1 when nothing is being transmitted (idle).
> 
> Design a finite state machine that will identify when bytes have been correctly received when given a stream of bits. It needs to identify the start bit, wait for all 8 data bits, then verify that the stop bit was correct. If the stop bit does not appear when expected, the FSM must wait until it finds a stop bit before attempting to receive the next byte.
>
> 在许多古老的串行通信协议中，每个数据字节都带有一个起始位和结束位，用来帮助接收者从比特流中划分字节的边界。一种常见的方案时使用1个起始位，8个数据位和一个结束位。当没有数据传输时，数据线置于逻辑1。
>
> 设计一个有限状态机：给定一串比特流，能够判断出字节何时被正确的接收。这需要识别起始位，等待8个数据位后识别结束位是正确的。如果结束位没有出现，状态机必须等待，直到找到一个结束位，然后才能尝试接受下一个字节。

```verilog
module top_module(
    input clk,
    input in,
    input reset,
    output done
); 

    reg [1:0] state, next_state;
    int count;
    parameter IDLE=0, START=1, WAIT=2, END=3;
    
    always @(*) begin
        case(state)
            IDLE: next_state = in ? IDLE : START;
            START: next_state = (count == 8) ? (in ? END : WAIT) : START;
            WAIT: next_state = in ? IDLE : WAIT;
            END: next_state = in ? IDLE : START;
        endcase
    end
    
    always @(posedge clk) begin
        if(reset)state <= IDLE;
        else state <= next_state;
    end
    
    always @(posedge clk)begin
        if(reset)count <= 0;
        else if(state == START)count <= count + 1;
        else count <= 0;
    end
    
    assign done = (state == END);
                   
endmodule
```

###### Serial receiver and datapath
> 习题：Now that you have a finite state machine that can identify when bytes are correctly received in a serial bitstream, add a datapath that will output the correctly-received data byte. `out_byte` needs to be valid when `done` is 1, and is don't-care otherwise.
> 
> Note that the serial protocol sends the least significant bit first.
>
> 现在你有了一个状态机，可以识别一个串行比特流的字节什么时候被正确的接收，增加一条数据通路可以正确输出接收到的数据字节。当`done`置1的时候，`out_byte`需要给出正确的数据，其他时候输出什么并不关心。
>
> 注意串行协议要首先发送最低有效位。

```verilog
module top_module(
    input clk,
    input in,
    input reset,
    output [7:0] out_byte,
    output done
);

    reg [2:0] state, next_state;
    reg [7:0] out_data;
    int count;
    parameter IDLE=0, START=1, DATA=2, WAIT=3, END=4;
    
    always @(*) begin
        case(state)
            IDLE: next_state = in ? IDLE : START;
            START: next_state = DATA;
            DATA: next_state = (count == 7) ? (in ? END : WAIT) : DATA;
            WAIT: next_state = in ? IDLE : WAIT;
            END: next_state = in ? IDLE : START;
        endcase
    end
    
    always @(posedge clk) begin
        if(reset)state <= IDLE;
        else state <= next_state;
    end
    
    always @(posedge clk)begin
        if(reset)count <= 0;
        else if(state == DATA)count <= count + 1;
        else count <= 0;
    end
    
    always @(posedge clk)begin
        if(reset)out_data <= '0;
        else if(count < 7)out_data <= {in, out_data[7:1]};
    end
    
    assign done = (state == END);
    assign out_byte = done ? out_data : 8'b0;

endmodule
```

###### Serial receiver with parity checking
> 习题：We want to add parity checking to the serial receiver. Parity checking adds one extra bit after each data byte. We will use odd parity, where the number of 1s in the 9 bits received must be odd. For example, 101001011 satisfies odd parity (there are 5 1s), but 001001011 does not.
> 
> Change your FSM and datapath to perform odd parity checking. Assert the `done` signal only if a byte is correctly received and its parity check passes. Like the serial receiver FSM, this FSM needs to identify the start bit, wait for all 9 (data and parity) bits, then verify that the stop bit was correct. If the stop bit does not appear when expected, the FSM must wait until it finds a stop bit before attempting to receive the next byte.
> 
> You are provided with the following module that can be used to calculate the parity of the input stream (It's a TFF with reset). The intended use is that it should be given the input bit stream, and reset at appropriate times so it counts the number of 1 bits in each byte.
> ```verilog
> module parity (
>     input clk,
>     input reset,
>     input in,
>     output reg odd);
> 
>     always @(posedge clk)
>         if (reset) odd <= 0;
>         else if (in) odd <= ~odd;
> 
> endmodule
> ```
>
> 我们想要在串行接收器加上奇偶校验。奇偶校验在数据字节之后额外增加一个bit。我们将会使用奇校验，即接收到的9个bit中1的个数是奇数。例如101001011满足奇校验而001001011不满足。
>
> 改变你的FSM和数据通路，让它执行奇校验。只有当接收字节正确并且通过校验才拉高`done`。和串行接收状态机一样，这个状态机需要识别起始位、等待全部9位（数据位+校验位），然后验证停止位是否正确。如果停止位没有在预期时刻出现，该状态机必须一直等待，直到它找到一个停止位，然后才能尝试接收下一个字节。
>
> 题目为你提供了下面这个模块，可用来计算输入比特流的奇偶性（它是一个带复位的 T 触发器）。预期用法是：把输入比特流喂给它，并在合适的时刻复位它，这样它就能统计出每个字节中 1 的个数。

```verilog
module top_module(
    input clk,
    input in,
    input reset,
    output [7:0] out_byte,
    output done
);

    reg [2:0] state, next_state;
    reg [7:0] out_data;
    wire odd;
    wire check;
    int count;
    parameter IDLE=0, START=1, DATA=2, WAIT=3, CHECK=4, END=5;
    
    always @(*) begin
        case(state)
            IDLE: next_state = in ? IDLE : START;
            START: next_state = DATA;
            DATA: next_state = (count == 7) ? CHECK : DATA;
            CHECK: next_state = in ? END : WAIT;
            WAIT: next_state = in ? IDLE : WAIT;
            END: next_state = in ? IDLE : START;
        endcase
    end
    
    always @(posedge clk) begin
        if(reset)state <= IDLE;
        else state <= next_state;
    end
    
    always @(posedge clk)begin
        if(reset)count <= 0;
        else if(state == DATA)count <= count + 1;
        else count <= 0;
    end
    
    always @(posedge clk)begin
        if(reset)out_data <= '0;
        else if(next_state == DATA)out_data <= {in, out_data[7:1]};
        else if(next_state == START)out_data <= '0;
    end
    
    parity p1 (clk, (reset | (state == END) | (state == IDLE)), in, odd);
    
    always @(posedge clk)begin
        if(reset)check <= 0;
        else check <= odd;
    end
    
    assign done = ((state == END) && check);
    assign out_byte = done ? out_data : 8'b0;

endmodule
```

###### Sequence recognition
> 习题：Synchronous HDLC framing involves decoding a continuous bit stream of data to look for bit patterns that indicate the beginning and end of frames (packets). Seeing exactly 6 consecutive 1s (i.e., 01111110) is a "flag" that indicate frame boundaries. To avoid the data stream from accidentally containing "flags", the sender inserts a zero after every 5 consecutive 1s which the receiver must detect and discard. We also need to signal an error if there are 7 or more consecutive 1s.
> 
> Create a finite state machine to recognize these three sequences:
> - 0111110: Signal a bit needs to be discarded (`disc`).
> - 01111110: Flag the beginning/end of a frame (`flag`).
> - 01111111...: Error (7 or more 1s) (`err`).
> 
> When the FSM is reset, it should be in a state that behaves as though the previous input were 0.
>
> 同步HDLC成帧涉及对一串连续的数据比特流进行寻找帧的开头与结尾的位模式。如果见到连续6个1就是帧的边界的标志。为了防止数据流意外包括标志，发送者将会在每连续的5个1后面插入0，接收者需要识别到这个0删除并丢弃。如果出现连续7个或更多的1，我们还发出需要错误信号。
>
> 搭建一个有限状态机区分下面三种序列：
> - 0111110：表示有一位需要被丢弃
> - 01111110：帧的开头或结尾
> - 01111111...：错误

```verilog
module top_module(
    input clk,
    input reset,
    input in,
    output disc,
    output flag,
    output err
);
	
    reg [9:0] state;
    reg [9:0] next_state;
    
    assign next_state[0] = ~in & (state[0] | state[1] | state[2] | state[3] | state[4] | state[7] | state[8] | state[9]);
    assign next_state[1] = in & (state[0] | state[8] | state[9]);
    assign next_state[2] = in & state[1];
    assign next_state[3] = in & state[2];
    assign next_state[4] = in & state[3];
    assign next_state[5] = in & state[4];
    assign next_state[6] = in & state[5];
    assign next_state[7] = in & (state[6] | state[7]);
    assign next_state[8] = ~in & state[5];
    assign next_state[9] = ~in & state[6];
    
    always @(posedge clk)begin
        if(reset)state <= 10'b1;
        else state <= next_state;
    end
    
    assign err = state[7];
    assign disc = state[8];
    assign flag = state[9];
             
endmodule
```

###### Q8: Design a Mealy FSM
> 习题：Implement a Mealy-type finite state machine that recognizes the sequence "101" on an input signal named x. Your FSM should have an output signal, z, that is asserted to logic-1 when the "101" sequence is detected. Your FSM should also have an active-low asynchronous reset. You may only have 3 states in your state machine. Your FSM should recognize overlapping sequences.
>
> 实现一个Mealy型有限状态机来识别输入信号`x`的序列“101”，你的FSM应当有一个输出信号`z`，当发现序列“101”时将输出信号置1。你的FSM也应该有一个低有效异步复位信号。你的FSM应该只有三个状态。你的FSM应该能识别重叠的序列。

```verilog
module top_module (
    input clk,
    input aresetn,
    input x,
    output z 
); 

    reg [1:0] state, next_state;
    parameter IDLE=0, ONE=1, ZERO=2;
    
    always @(*)begin
        case(state)
            IDLE: next_state = x ? ONE : IDLE;
            ONE: next_state = ~x ? ZERO : ONE;
            ZERO: next_state = x ? ONE : IDLE;
        endcase
    end
    
    always @(posedge clk or negedge aresetn)begin
        if(!aresetn)state <= IDLE;
        else state <= next_state;
    end
    
    assign z = x & (state == ZERO);
    
endmodule
```

###### Q5a: Serial two's complementer (Moore FSM)
> 习题：You are to design a one-input one-output serial 2's complementer Moore state machine. The input (x) is a series of bits (one per clock cycle) beginning with the least-significant bit of the number, and the output (Z) is the 2's complement of the input. The machine will accept input numbers of arbitrary length. The circuit requires an asynchronous reset. The conversion begins when `Reset` is released and stops when `Reset` is asserted.
>
> 你要设计一个单输入，单输出的二进制补码器，采用Moore型状态机。输入是一串比特，从最低有效位的数字开始，输出是输入的二进制补码。状态机支持任意长度的输入。该电路需要异步复位。转换在`Reset`释放时开始，在置位时停止。

```verilog
module top_module (
    input clk,
    input areset,
    input x,
    output z
); 

    reg state, next_state;
    wire z_r;
    parameter KEEP=0, CONVERSION=1;
    
    always @(*)begin
        case(state)
            KEEP: next_state = x ? CONVERSION : KEEP;
            CONVERSION: next_state = CONVERSION;
        endcase
    end
    
    always @(posedge clk or posedge areset)begin
        if(areset)state <= KEEP;
        else state <= next_state;
    end
    
    always @(posedge clk or posedge areset)begin
        if(areset)z_r <= 0;
        else z_r <= state ? ~x : x;
    end
    
    assign z = z_r; 
              
endmodule
```

###### Q5b: Serial two's complementer (Mealy FSM)
> 习题：The following diagram is a Mealy machine implementation of the 2's complementer. Implement using one-hot encoding.
>
> ![习题](/post-images/ysyx/verilog/Q5b.png)
>
> 下面这个图是一个补码器的Mealy型状态机的实现。用独热码实现这个状态机。

```verilog
module top_module (
    input clk,
    input areset,
    input x,
    output z
); 

    reg state, next_state;
    wire z_r;
    parameter KEEP=0, CONVERSION=1;
    
    always @(*)begin
        case(state)
            KEEP: next_state = x ? CONVERSION : KEEP;
            CONVERSION: next_state = CONVERSION;
        endcase
    end
    
    always @(posedge clk or posedge areset)begin
        if(areset)state <= KEEP;
        else state <= next_state;
    end
       
    assign z = state ? ~x : x;
              
endmodule
```

###### Q3a: FSM
> 习题：Consider a finite state machine with inputs `s` and `w`. Assume that the FSM begins in a reset state called `A`, as depicted below. The FSM remains in state `A` as long as `s = 0`, and it moves to state `B` when `s = 1`. Once in state `B` the FSM examines the value of the input `w` in the next three clock cycles. If `w = 1` in exactly two of these clock cycles, then the FSM has to set an output `z` to `1` in the following clock cycle. Otherwise `z` has to be `0`. The FSM continues checking `w` for the next three clock cycles, and so on. The timing diagram below illustrates the required values of `z` for different values of `w`.
> 
> Use as few states as possible. Note that the `s` input is used only in state `A`, so you need to consider just the `w` input.
>
> 考虑一个有限状态机，有输入`s`和`w`。假定这个状态机从复位状态`A`开始，就像下面描述的行为一样。只要`s = 0`，FSM则会一直保持状态`A`；当`s = 1`，FSM则会变为状态`B`。一旦进入状态`B`，FSM将会在接下来的三个时钟周期检查输入`w`，如果两个周期的`w = 1`，FSM将会驱动输出`z`为1，否则为0。FSM将会在接下来三个时钟周期继续检查`w`，如此循环。下面的时序图描述了不同`W`的值对应`z`的值。
>
> 使用尽可能少的状态。注意输入`s`仅在状态`A`使用，所以只需要考虑状态`w`。

```verilog
module top_module (
    input clk,
    input reset,
    input s,
    input w,
    output z
);

    reg [1:0] state, next_state;
    reg [1:0] cnt_t, cnt_1;
    wire z_r;
    parameter A=0, B=1;
    
    always @(*)begin
        case(state)
            A: next_state = s ? B : A;
            B: next_state = B;
        endcase
    end
    
    always @(posedge clk)begin
        if(reset)state <= A;
        else state <= next_state;
    end
    
    always @(posedge clk)begin
        if(reset)begin
            cnt_1 <= 0;
            cnt_t <= 0;
        end
        else if(state == B)begin
            if(cnt_t == 2)cnt_t <= 0;
            else cnt_t <= cnt_t + 2'b1;
            if(cnt_t == 0)cnt_1 <= w;
            else cnt_1 <= (cnt_1 + w);
        end
    end
    
    always @(posedge clk)begin
        if(reset)z_r <= 0;
        else if(cnt_t == 2'd2)
            z_r <= ((cnt_1 == 2'd2) && !w) || ((cnt_1 == 2'd1) && w);
        else z_r <= 0;
    end
    
    assign z = z_r;
    
endmodule
```

###### Q3b: FSM
> 习题：Given the state-assigned table shown below, implement the finite-state machine. Reset should reset the FSM to state 000.
> 
> | Present state y[2:0] | Next state Y[2:0] (X=0) | Next state Y[2:0] (X=1) | Output |
> | :---: | :---: | :---: | :---: |
> | 000 | 000 | 001 | 0 |
> | 001 | 001 | 100 | 0 |
> | 010 | 010 | 001 | 0 |
> | 011 | 001 | 010 | 1 |
> | 100 | 011 | 100 | 1 |
>
> 给定如下表所示的状态分配表，实现有限状态机。复位信号应该复位FSM为状态000。

```verilog
module top_module (
    input clk,
    input reset,
    input x,
    output z
);

    reg [2:0] state, next_state;
    
    always @(*)begin
        case(state)
            3'b000: next_state = x ? 3'b001 : 3'b000;
            3'b001: next_state = x ? 3'b100 : 3'b001;
            3'b010: next_state = x ? 3'b001 : 3'b010;
            3'b011: next_state = x ? 3'b010 : 3'b001;
            3'b100: next_state = x ? 3'b100 : 3'b011;
        endcase
    end
    
    always @(posedge clk)begin
        if(reset)state <= 3'b000;
        else state <= next_state;
    end
    
    assign z = ((state == 3'b011) | (state == 3'b100));
    
endmodule
```

###### Q3c: FSM logic
>习题：Given the state-assigned table shown below, implement the logic functions Y[0] and z.
>
> | Present state y[2:0] | Next state Y[2:0] (X=0) | Next state Y[2:0] (X=1) | Output |
> | :---: | :---: | :---: | :---: |
> | 000 | 000 | 001 | 0 |
> | 001 | 001 | 100 | 0 |
> | 010 | 010 | 001 | 0 |
> | 011 | 001 | 010 | 1 |
> | 100 | 011 | 100 | 1 |
>
> 给定如下的状态分配表，实现`Y[0]`和`z`的逻辑函数。

```verilog
module top_module (
    input clk,
    input [2:0] y,
    input x,
    output Y0,
    output z
);
	
    reg [2:0] Y;
    
    always @(*)begin
        case(y)
            3'b000: Y = x ? 3'b001 : 3'b000;
            3'b001: Y = x ? 3'b100 : 3'b001;
            3'b010: Y = x ? 3'b001 : 3'b010;
            3'b011: Y = x ? 3'b010 : 3'b001;
            3'b100: Y = x ? 3'b100 : 3'b011;
        endcase
    end
    
    assign z = ((y == 3'b011) | (y == 3'b100));
    assign Y0 = Y[0];
    
endmodule
```

###### Q6b: FSM next-state logic
> 习题：Consider the state machine shown below, which has one input `w` and one output `z`.
>
> ![习题](/post-images/ysyx/verilog/Q6b.png)
>
> Assume that you wish to implement the FSM using three flip-flops and state codes `y[3:1]` = 000, 001, ... , 101 for states A, B, ... , F, respectively. Show a state-assigned table for this FSM. Derive a next-state expression for the flip-flop `y[2]`.
> 
> Implement just the next-state logic for `y[2]`. (This is much more a FSM question than a Verilog coding question. Oh well.)
>
> 考虑下面所示的状态机，有一个输入`w`和一个输出`z`。
>
> 假设你想要用三个触发器实现这个FSM，状态编码`y[3:1]` = 000, 001, ... , 101分别对应状态A, B, ... , F。列出这个FSM的状态分配表。推导出触发器`y[2]`的次态表达式。
>
> 你只需要实现`y[2]`的次态逻辑。（这道题与其说是Verilog编程题，不如说是一道状态机题。）

首先给出状态分配表
| Present state y[3:1] | Next state Y[3:1] (X=0) | Next state Y[3:1] (X=1) | Output |
| :---: | :---: | :---: | :---: |
| 000 | 001 | 000 | 0 |
| 001 | 010 | 011 | 0 |
| 010 | 100 | 011 | 0 |
| 011 | 101 | 000 | 0 |
| 100 | 100 | 011 | 1 |
| 101 | 010 | 011 | 1 |

```verilog
module top_module (
    input [3:1] y,
    input w,
    output Y2
);

    reg [3:1] Y;
    
    always @(*)begin
        case(y)
            3'b000: Y = w ? 3'b000 : 3'b001;
            3'b001: Y = w ? 3'b011 : 3'b010;
            3'b010: Y = w ? 3'b011 : 3'b100;
            3'b011: Y = w ? 3'b000 : 3'b101;
            3'b100: Y = w ? 3'b011 : 3'b100;
            3'b101: Y = w ? 3'b011 : 3'b010;
        endcase
    end
    
    assign Y2 = Y[2];
    
endmodule
```

###### Q6c: FSM one-hot next-state logic
> 习题：Consider the state machine shown below, which has one input `w` and one output `z`.
>
> ![习题](/post-images/ysyx/verilog/Q6b.png)
>
> For this part, assume that a one-hot code is used with the state assignment `y[6:1]` = 000001, 000010, 000100, 001000, 010000, 100000 for states A, B,..., F, respectively.
> 
> Write a logic expression for the next-state signals `Y2` and `Y4`. (Derive the logic equations by inspection assuming a one-hot encoding. The testbench will test with non-one hot inputs to make sure you're not trying to do something more complicated).
>
> 考虑下面的状态机，有一个输入`w`和一个输出`z`。
>
> 在这个部分，假设状态分配用的是独热码，`y[6:1]`=000001, 000010, 000100, 001000, 010000, 100000分别对应状态A, B,..., F。
>
> 写出次态信号`Y2`和`Y4`的逻辑表达式。（通过观察独热码推导出逻辑方程。测试平台将会测试非独热码输入确保你没有尝试复杂化这个问题）

```verilog
module top_module (
    input [6:1] y,
    input w,
    output Y2,
    output Y4
);

    assign Y2 = ~w & y[1];
    assign Y4 = w & (y[2] | y[3] | y[5] | y[6]);
    
endmodule
```

###### Q6: FSM
> 习题：Consider the state machine shown below, which has one input `w` and one output `z`.
>
> ![习题](/post-images/ysyx/verilog/Q6b.png)
>
> Implement the state machine. (This part wasn't on the midterm, but coding up FSMs is good practice).
>
> 考虑下面的状态机，有一个输入`w`和一个输出`z`。
>
> 实现这个状态机。（这部分虽然期中考试没有，但是编写状态机是一个很好的练习）

```verilog
module top_module (
    input clk,
    input reset,
    input w,
    output z
);

    reg [2:0] state, next_state;
    
    always @(*)begin
        case(state)
            3'b000: next_state = w ? 3'b000 : 3'b001;
            3'b001: next_state = w ? 3'b011 : 3'b010;
            3'b010: next_state = w ? 3'b011 : 3'b100;
            3'b011: next_state = w ? 3'b000 : 3'b101;
            3'b100: next_state = w ? 3'b011 : 3'b100;
            3'b101: next_state = w ? 3'b011 : 3'b010;
        endcase
    end
    
    always @(posedge clk)begin
        if(reset)state <= 3'b000;
        else state <= next_state;
    end
    
    assign z = ((state == 3'b100) | (state == 3'b101));
        
endmodule
```

###### Q2a: FSM

###### Q2b: FSM one-hot FSM equations

这两个题实际上和Q6的几个题是相同的，只是`w`有所区别，所以这里之间跳过了。

###### Q2a: FSM
> 习题：Consider the FSM described by the state diagram shown below:
>
> ![习题](/post-images/ysyx/verilog/Q2a.png)
> 
> This FSM acts as an arbiter circuit, which controls access to some type of resource by three requesting devices. Each device makes its request for the resource by setting a signal `r[i]` = 1, where `r[i]` is either `r[1]`, `r[2]`, or `r[3]`. Each `r[i]` is an input signal to the FSM, and represents one of the three devices. The FSM stays in state A as long as there are no requests. When one or more request occurs, then the FSM decides which device receives a grant to use the resource and changes to a state that sets that device’s `g[i]` signal to 1. Each `g[i]` is an output from the FSM. There is a priority system, in that device 1 has a higher priority than device 2, and device 3 has the lowest priority. Hence, for example, device 3 will only receive a grant if it is the only device making a request when the FSM is in state `A`. Once a device, `i`, is given a grant by the FSM, that device continues to receive the grant as long as its request, `r[i] = 1`.
> 
> Write complete Verilog code that represents this FSM. Use separate always blocks for the state table and the state flip-flops, as done in lectures. Describe the FSM outputs, `g[i]`, using either continuous assignment statement(s) or an always block (at your discretion). Assign any state codes that you wish to use.
>
> 考虑下面这个状态转移图所描述的状态机。
>
> 这个状态机充当一个仲裁器电路，负责控制三个请求设备对某种类型资源的访问。每个设备通过将对应的信号`r[i]`置1来发出对该资源的请求。每个`r[i]`都是FSM的输入信号，代表三个设备中的一个。只要没有任何请求，FSM就会保持在状态A。当有一个或者更多的请求，FSM则决定哪个设备获得该资源的授权，并切换到一个会把该设备的`g[i]`信号置为 1 的状态。每个`g[i]`都是FSM的一个输出。这里有一个优先级系统，设备1的优先级高于设备2，设备3有最低的优先级。因此，只有当状态机处于状态A时设备3是唯一发出请求的设备，设备3才会获得授权。.一旦有一个设备获得授权，只要它的请求保持`r[i] = 1`，就会持续获得授权。
>
> 请编写完整的Verilog代码实现这个状态机。用两个独立的always块分别描述状态转移表和状态触发器。描述FSM的输出可以使用连续赋值语句或者always块。状态编码由你指定。

```verilog
module top_module (
    input clk,
    input resetn,
    input [3:1] r,
    output [3:1] g
); 

    reg [1:0] state, next_state;
    parameter A=0, B=1, C=2, D=3;
    
    always @(*)begin
        case(state)
            A: begin
                if(r == 3'b000)next_state = A;
                else if(r[1])next_state = B;
                else if(~r[1] & r[2])next_state = C;
                else if(r == 3'b100)next_state = D;
            end
            B: next_state = r[1] ? B : A;
            C: next_state = r[2] ? C : A;
            D: next_state = r[3] ? D : A;
        endcase
    end
    
    always @(posedge clk)begin
        if(!resetn)state <= A;
        else state <= next_state;
    end
    
    assign g[1] = (state == B);
    assign g[2] = (state == C);
    assign g[3] = (state == D);
    
endmodule
```

###### Q2b: Another FSM
> 习题：Consider a finite state machine that is used to control some type of motor. The FSM has inputs `x` and `y`, which come from the motor, and produces outputs `f` and `g`, which control the motor. There is also a clock input called `clk` and a reset input called `resetn`.
> 
> The FSM has to work as follows. As long as the reset input is asserted, the FSM stays in a beginning state, called state `A`. When the reset signal is de-asserted, then after the next clock edge the FSM has to set the output `f` to 1 for one clock cycle. Then, the FSM has to monitor the `x` input. When `x` has produced the values 1, 0, 1 in three successive clock cycles, then `g` should be set to 1 on the following clock cycle. While maintaining `g = 1` the FSM has to monitor the `y` input. If `y` has the value 1 within at most two clock cycles, then the FSM should maintain `g = 1` permanently (that is, until reset). But if `y` does not become 1 within two clock cycles, then the FSM should set `g = 0` permanently (until reset).
>
> 考虑一个用来控制某种类型电机的有限状态机。FSM有来自电机的输入`x`和`y`，并且产生输出`f`和`g`，用来控制电机。还有时钟信号输入`clk`和复位输入`resetn`。
>
> FSM的行为如下。一旦复位信号置位，FSM就会保持在起始状态，称为状态`A`。当复位信号取消置位，在下一个时钟沿将输出`f`置1持续一个时钟周期。然后，FSM监视输入`x`。当`x`在连续的三个时钟周期产生1，0，1时，`g`就会在下一个时钟周期置1。当保持`g = 1`时，FSM监视输入`y`。如果`y`在最多在两个时钟周期内为1，FSM就会永久保持`g = 1`（直到复位）。否则如果`y`在两个时钟周期内没有变为`1`，则，FSM就会永久保持`g = 0`（直到复位）。

```verilog
module top_module (
    input clk,
    input resetn,
    input x,
    input y,
    output f,
    output g
); 

    reg [3:0] state, next_state;
    
    parameter A=0, B=1, C=2, C1=3, C2=4, D1=5, D2=6, G1=7, G0=8;
    
    always @(*)begin
        case(state)
            A: next_state = B;
            B: next_state = C;
            C: next_state = x ? C1 : C;
            C1: next_state = x ? C1 : C2;
            C2: next_state = x ? D1 : C;
            D1: next_state = y ? G1 : D2;
            D2: next_state = y ? G1 : G0;
        endcase
    end
    
    always @(posedge clk)begin
        if(!resetn)state <= A;
        else state <= next_state;
    end
    
    assign f = (state == B);
    assign g = ((state == D1) | (state == D2) | (state == G1));
              
endmodule
```
