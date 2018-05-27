---
title: interface-abstract-class
date: 2018-05-27 22:39:11
tags: java
categories: study
description: Java中接口、抽象类、类区别
---

## 接口、抽象类、类的区别

### 写在前面

昨天被问到Java中接口、抽象类、类的区别/差异。突然懵逼了，只是简单回答了成员属性以及方法声明的简单差异（太尴尬了，其实这个问题很简单~~）
> 反思下: 因为确实很久没有写`Java`代码了(大学又非CS专业，第一份工作中基本没有用到过`Java`)，Java知识还是来到现东家后靠自己业余时间现学现用。

Notes For 2018-05-26(PM) and for study !


### 三者区别

先上代码（show me the code, no bb😁）

e.g.

```java
<!-- 接口 actionList -->
package javaClassExercise.javaInterface;
/**
 * Created by lomo.
 */
public interface actionList {

    //默认访问级别为public，变量默认为static/final类型常量！
    String author = "Lomo";

    void eat();

    void listen(String s);

    void walk(Double x);

    Integer studyScore(int num);
    // static {
    // }
}
```

```java
<!-- 抽象类 -->
package javaClassExercise.javaInterface;

/**
 * Created by lomo.
 */

public abstract class peopleAction implements actionList{
    // 构造器/构造函数
    peopleAction() {
        System.out.println("Author: " + author);
    }

    //重写的方法必须加修饰符，因为这在类中！
    public void eat() {

    }
    // 重载eat方法
    void eat(String s) {
        System.out.println("i ate" + s);
    }

    public void listen(String s) {
        System.out.println("i listened" + s);
    }

    public void walk(Double s) {

    }

    public Integer studyScore(int num) {
        return num;
        //System.out.println("i get score: " + num);
    }
    // 抽象方法
    protected abstract String abstractTestMethod(String s);

}
```

```java
<!-- 普通类 -->
package javaClassExercise.javaInterface;

/**
 * Created by lomo.
 */
public class peopleActionTest extends peopleAction {

    //在对子类进行初始化的时候，会先调用父类的构造器
    peopleActionTest() {
        super();  // 手动显式调用上面👆抽象类的peopleAction构造函数
        System.out.println("子类");
    }

    @Override
    protected String abstractTestMethod(String s) {
        return s;
    }


    @Override
    public void walk(Double s) {
        System.out.println("Lomo has been walked " + s + "km");
    }

    //重载walk方法
    public void walk(String Name, Double s) {
        System.out.println(Name + "had been walked " + s + "km ...");
    }

    public static void main(String[] args) {
        peopleAction p = new peopleActionTest();
//        peopleAction pp = new peopleAction();
        p.eat("米饭");
        p.walk(2.5);

        peopleActionTest ps = new peopleActionTest();
        ps.walk(4.2);
        ps.walk("chenqiao", 7.8);

    }

}
```

① 关于成员属性(变量)方面:
> 接口中的成员属性一般为`static final`修饰，即：默认访问权限为public且接口中声明的成员属性一般为写死的(final)不能为修改.


② 关于static关键字方面:
> 接口中不能包含static修饰的方法或static静态代码块. 可以手动尝试，在接口中声明一个static 代码块或方法，IDE就会直接报错！😁



③ 关于方法的声明方面:
> 接口中的所有方法均无方法体(即无具体的方法实现逻辑、运算过程...)，抽象类中一般都包含抽象方法(即无具体方法体的方法，只声明了函数名以及返回值、参数相关)，但是抽象类中可以包含有具体实现的方法也可以包含静态代码块(接口则不行)。抽象类的抽象方法修饰符一般为`public`或`protected`(无private, 如果是private则无法被继承的类去继承重写该方法啊。)

④ 关于继承方面:
> 一个普通类一次只能继承`extends`一个类(该类可以是普通类、抽象类)，但是可以同时实现`implements`多个接口，继承抽象类时，需要在该类中实现抽象类中的所有抽象方法，实现几个接口就要重写实现接口中的所有(抽象)方法.

⑤ 关于构造器方面：
> 接口无构造器; 抽象类、类可以有(手动显式/默认隐式)

⑥ main方法方面:
> 接口中不能有`main`主函数方法，而抽象类、普通类可以有.

⑦ 添加新方法方面:
> 接口中添加新方法，需要考虑那些实现了该接口的类(必须要改变、操作实现了该接口的类)，而添加在抽象类中，则可以给出默认具体实现而不必去修改该类的子类.

另，Java是单继承!!!