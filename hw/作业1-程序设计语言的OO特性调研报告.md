# 作业1: 程序设计语言的OO特性调研报告

姓名：温九	学号：1601214487

分别对Go语言和Rust语言进行了调研。

### Go

Go语言是谷歌于2009年推出的一种语言，其最为著名的应用当属Docker了。简单了解了Go的语法之后，我觉得Go是一种结合了Java与C++优点的语言，比如说纯编译型语言、仅仅依赖于glibc运行、部署简单，这是C++的优点；模块引用具有层级结构，完全的垃圾回收机制，这是Java的优点。并且，Go和C语言交互良好，有丰富的内置类型，支持大规模的并发编程，并且支持函数多返回值。当然Go也不是没有缺陷，不支持泛型、对语法要求过于严格，垃圾回收机制有重大缺陷，不支持动态加载类库，身为运行在系统级上的编译型语言却和在JVM上运行的半编译半解释型Java语言速度相当等等。

关于Go语言面向对象的方面，前面已经提到了，Go语言是不支持泛型的。实际上，Go语言在面向对象方面是较弱的，它没有很复杂的面向对象的概念，比如继承和重载，类型更像是C中的struct。要实现继承和重载的功能，主要依赖于接口，虽然Go语言为了代码的可维护性，实现了非入侵型接口，但是代码中出现太多的接口显然会对阅读造成较大的影响，所以我认为这种设计并不合理。

总结来说，Go具有以下特性：

* 自动垃圾回收，虽然略有缺陷
* 更丰富的内置类型
* 支持函数多返回值
* 简单明了的错误处理机制
* 较为简单的面向对象编程
* 很好地支持大规模并发编程
* 支持反射
* 与C交互方便

以下是Java和Go实现计算几何图形面积的对比：

```java
// java: calucate geometry area size
interface geometry {
  public float area();
}

class rect implements geometry {
  private float width, height;
  public rect(float width, float height) {
    this.width = width;
    this.height = height;
  }
  @override
  public float area() {
    return width * height;
  }
}

class circle implements geometry {
  private float radius;
  public circle(float radius) {
    this.radius = radius;
  }
  @override
  public float area() {
    return 3.14 * radius * radius;
  }
}

class application {
  public static void main(String[] args) {
    System.out.println(new rect(3, 4).area());
    System.out.println(new circle(5).area());
  }
}
```

```go
// go: calucate geometry area size
type geometry interface {
  area() float64
}

type rect struct {
  width, height float64
}
type circle struct {
  radius float64
}

func (r rect) area() float64 {
  return r.width * r.height
}
func (c circle) area() float64 {
  return math.Pi * c.radius * c.radius
}

func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
}

func main() {
  r := rect{width: 3, height: 4}
  c := circle{radius: 5}
  measure(r)
  measure(c)
}
```

可以看到，相较于Java，Go的代码结构并不清晰，这也是非侵入式接口的问题。



### Rust

和Go类似，Rust也是近几年新发展起来的一门语言，最早是2010年7月，在Mozilla的社区峰会上发布。一开始，Rust的目的是为了服务于浏览器开发，当前浏览器基本都是采用C++开发，而C++的最大问题一个事安全性方面、另外一个是存在内存泄漏的问题，而Rust就很好的解决了这些问题。Rust的设计思路，就是通过定义一个特别的类型系统，把某些类别的内存错误的检查放到编译阶段。这个检查非常激进，只要有可能出内存错误编译器（或者说类型系统）就不让你过。换个说法，其实Rust就是把确保代码正确性的负担的一部分从静态分析工具直接转嫁给了程序员，逼着你写绝对内存安全的程序。

具体来说，Rust其实是一门非常接近C++的语言，当然自从它发布以来，变动一直非常巨大，直到1.0版本的出现才算是较为稳定。Rust相对于C++的新特性主要有以下几点：

* 无data-race的并发，类似于Go
* 灵活的module系统
* 强大依赖的管理系统
* lifetime的设定让指针的管理变得不再混乱
* 语言自带的简单测试系统
* ...

由于Rust的背景，所以在设计中Rust始终是以安全至上的，当然不是说Rust不能写不安全的程序，但是安全和不安全的界限是非常清晰的。虽然C++新的标准里也在不断地引入新特性，但是由于需要向前兼容，所以还是背负着一个很大的包袱，而Rust作为一个新兴的语言，则要灵活很多，实际上Rust的开发者为了引入新特性已经多次发布了不具备向前兼容性的版本，而且Rust也是非常注重工程性的，虽然从学术角度来说Rust并不完美，但是从工程性讲Rust已经做得很好了。当然Rust也存在缺点，比如说语言本身的内存管理较弱，主要是在语法层面上限制开发者，所以语法上和开发的时候会比较“蛋疼”，但是用在浏览器等安全等级较高的开发和维护上确实非常合适，个人看好Rust在将来占据一席之地。

以下是Rust实现和C++实现的对比：

```rust
// rust
struct Person {
    name: String,
}

impl Person {
    fn new(name: &str) -> Person {
        Person {
            name: name.to_string(),
        }
    }

    fn eat(&self) {
        println!("{} is eating.", self.name);
    }
}

fn main() {
    let people = vec![
        Person::new("Xiao Wang"),
        Person::new("Xiao Ming"),
        Person::new("Xiao Hong"),
    ];

    for p in &people {
        p.eat();
    }
}
```

```c++
// C++
class Person {
private:
  string name;
public:
  Person(_name) {
    this.name = _name;
  }
  void eat() {
    cout << this.name << " is eating" << endl;
  }
}

int main() {
  Person[3] people;
  people[0] = new Person("Xiao Wang");
  people[1] = new Person("Xiao Ming");
  people[2] = new Person("Xiao Hong");
  for (int i = 0; i < sizeof(people); i++) {
    people[i].eat();
  }
  return 0;
}
```

